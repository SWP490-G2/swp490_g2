package com.swp490_g2.hrms.entity;

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

    @ManyToMany(mappedBy = "restaurants")
    private Set<Seller> sellers;


}
