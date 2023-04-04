package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;
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

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private String description;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "restaurantId", nullable = false)
    @JsonIgnore
    private Restaurant restaurant;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "product__product_category",
            joinColumns = @JoinColumn(name = "productId"), inverseJoinColumns = @JoinColumn(name = "productCategoryId"))
    private Set<ProductCategory> categories;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<File> images = new ArrayList<>();

    // @ManyToOne
    // @JoinColumn(name = "productStatusId", nullable = false)
    // @JsonBackReference
    // @OnDelete(action = OnDeleteAction.CASCADE)
    // private ProductStatus productStatus;
}
