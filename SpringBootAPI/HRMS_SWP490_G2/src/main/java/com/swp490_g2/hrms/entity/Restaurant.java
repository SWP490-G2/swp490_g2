package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant")
@AttributeOverride(name = "id", column = @Column(name = "restaurantId"))
public class Restaurant extends BaseEntity {

    @Column(nullable = false)
    private String restaurantName;

    @Column(nullable = true, columnDefinition = "VARCHAR(450)")
    private String description;

    @Column(nullable = true, unique = true)
    private String phoneNumber;

    @Column(nullable = false, columnDefinition = "tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @OneToOne(cascade = CascadeType.ALL)
    private File avatarFile;

    @ManyToMany(mappedBy = "restaurants")
    @JsonIgnore
    private Set<Seller> sellers;

    @OneToMany(mappedBy = "restaurant")
    @JsonManagedReference
    @Transient
    private Set<Product> products;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    private Address address;
}
