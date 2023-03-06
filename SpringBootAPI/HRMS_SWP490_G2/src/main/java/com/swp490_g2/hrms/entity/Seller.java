package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "seller")
@Inheritance(strategy = InheritanceType.JOINED)
@AttributeOverride(name = "id", column = @Column(name = "userId"))
public class Seller extends User{

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "seller_restaurant",
            joinColumns = @JoinColumn(name = "userId"),inverseJoinColumns = @JoinColumn(name = "restaurantId"))
    private Set<Restaurant> restaurants;


}
