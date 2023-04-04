package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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

    @ManyToOne
    @JoinColumn(name = "restaurantId", nullable = false)
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Restaurant restaurant;

    @ManyToMany(cascade={CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "product__product_category",
            joinColumns = @JoinColumn(name = "productId"), inverseJoinColumns = @JoinColumn(name = "productCategoryId"))
    private Set<ProductCategory> categories;

    @OneToMany(mappedBy="product", cascade={CascadeType.PERSIST, CascadeType.MERGE})
    @JsonManagedReference
    @Transient
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Set<File> files;

    @ManyToOne
    @JoinColumn(name = "productStatusId", nullable = false)
    @JsonBackReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private ProductStatus productStatus;
}
