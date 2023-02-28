package com.swp490_g2.hrms.entity;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Set;

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
//
//    @Column(name = "first_name", nullable = false)
//    private String firstName;
//
//    @Column(name = "middle_name", nullable = true)
//    private String middleName;
//
//    @Column(name = "last_name", nullable = false)
//    private String lastName;

//    @Column(name = "date_of_birth", nullable = false)
//    private Date dateOfBirth;

//    @Column(name = "gender", nullable = false)
//    private Boolean gender;

//    @Column(name = "phone_number", nullable = false)
//    private String phoneNumber;

    @Column(nullable = false, columnDefinition="tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @Column(columnDefinition = "VARCHAR(6)")
    private String verificationCode;

//    @Column(name = "is_banned")
//    private Boolean isBanned;

//    @Column(name = "avatar")
//    private String avatar; implement later

//    @Column(name = "citizen_identification")
//    private String citizenIdentification;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "address_id", nullable = false)
//    private Address address;

    @Enumerated(EnumType.STRING)
    private Role role;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
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
}
