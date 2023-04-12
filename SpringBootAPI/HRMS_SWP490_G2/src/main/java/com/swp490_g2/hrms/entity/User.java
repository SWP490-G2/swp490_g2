package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import com.swp490_g2.hrms.entity.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "user")
@AttributeOverride(name = "id", column = @Column(name = "userId"))
public class User extends BaseEntity implements UserDetails {
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @Column(columnDefinition = "VARCHAR(6)")
    private String verificationCode;

    @Column(length = 50)
    @Length(max = 50)
    private String firstName;

    @Column(length = 50)
    @Length(max = 50)
    private String middleName;

    @Column(length = 50)
    @Length(max = 50)
    private String lastName;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Instant dateOfBirth;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Instant requestingOpeningRestaurantDate;


    @Column(columnDefinition = "nvarchar(16) default 'PENDING'")
    @Enumerated(EnumType.STRING)
    private RequestingRestaurantStatus requestingRestaurantStatus = RequestingRestaurantStatus.PENDING;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    private File avatarFile;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Address address;

    @ElementCollection(targetClass = Role.class)
    @JoinTable(name = "user__role", joinColumns = @JoinColumn(name = "userId"))
    @Column(name = "roleName", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.name())).toList();
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestingRestaurantId")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Restaurant requestingRestaurant;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "user__restaurant",
            joinColumns = @JoinColumn(name = "userId"), inverseJoinColumns = @JoinColumn(name = "restaurantId"))
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @Transient
    private List<Restaurant> restaurants = new ArrayList<>();

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<Notification> notifications = new ArrayList<>();

    public boolean isAdmin() {
        return roles != null && roles.stream().anyMatch(role -> role == Role.ADMIN);
    }

    public boolean isBuyer() {
        return roles != null && roles.stream().anyMatch(role -> role == Role.BUYER);
    }

    public boolean isSeller() {
        return roles != null && roles.stream().anyMatch(role -> role == Role.SELLER);
    }

    public void addRole(Role role) {
        if (roles == null)
            roles = new HashSet<>();

        roles.add(role);
    }
}
