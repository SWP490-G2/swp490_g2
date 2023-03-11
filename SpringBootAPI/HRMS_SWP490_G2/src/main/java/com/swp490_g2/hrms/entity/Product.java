package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@AttributeOverride(name = "id", column = @Column(name = "productId"))
public class Product extends BaseEntity {
    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private Double price;

    @ManyToOne
    @JoinColumn(name="restaurantId", nullable=false)
    @JsonBackReference
    private Restaurant restaurant;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "product__product_category",
            joinColumns = @JoinColumn(name = "productId"), inverseJoinColumns = @JoinColumn(name = "productCategoryId"))
    private Set<ProductCategory> categories;
}
