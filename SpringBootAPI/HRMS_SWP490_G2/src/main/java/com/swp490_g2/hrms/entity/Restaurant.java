package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant")
@AttributeOverride(name = "id", column = @Column(name = "restaurantId"))
public class Restaurant extends BaseEntity{

    @Column(nullable = false)
    private String restaurantName;

    @Column(nullable = false, columnDefinition = "VARCHAR(450)")
    private String description;

    @Column(nullable = false, unique = true)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition="tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @OneToOne(cascade=CascadeType.ALL)
    private File avatarFile;

    @ManyToMany(mappedBy = "restaurants")
    @JsonIgnore
    private Set<Seller> sellers;

    @OneToMany(mappedBy="restaurant")
    @JsonManagedReference
    @Transient
    private Set<Product> products;

    @OneToOne(fetch = FetchType.EAGER)
    private Address address;
}
