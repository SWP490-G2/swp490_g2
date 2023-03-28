package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
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

    @OneToOne(mappedBy = "requestingRestaurant")
    @JsonIgnore
    private Buyer requestingRestaurantBuyer;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private File avatarFile;

    @OneToMany(mappedBy="restaurant")
    @JsonManagedReference
    @Transient
    private Set<Product> products;

    @OneToOne(cascade = CascadeType.ALL, optional = false, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Address address;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "restaurant__restaurant_category",
            joinColumns = @JoinColumn(name = "restaurantId"), inverseJoinColumns = @JoinColumn(name = "restaurantCategoryId"))
    private List<RestaurantCategory> restaurantCategories;
}
