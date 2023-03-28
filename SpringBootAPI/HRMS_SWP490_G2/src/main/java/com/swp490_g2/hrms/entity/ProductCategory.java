package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product_category")
@AttributeOverride(name = "id", column = @Column(name = "productCategoryId"))
public class ProductCategory extends BaseEntity {
    @Column(nullable = false)
    private String productCategoryName;
}
