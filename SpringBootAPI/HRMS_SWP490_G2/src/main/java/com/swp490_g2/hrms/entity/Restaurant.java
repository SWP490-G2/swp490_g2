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

    @Column(nullable = false, columnDefinition="tinyint(1) default 0", insertable = false)
    private boolean isActive;

    @OneToOne(mappedBy = "requestingRestaurant")
    @JsonIgnore
    private Buyer requestingRestaurantBuyer;

    @OneToMany(mappedBy="restaurant")
    @JsonManagedReference
    private Set<ProductCategory> productCategories;

    @OneToOne(cascade=CascadeType.ALL)
    private File avatarFile;
}
