package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.codehaus.jackson.annotate.JsonIgnore;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "productCategory")
@AttributeOverride(name = "id", column = @Column(name = "productCategoryId"))
public class ProductCategory extends BaseEntity {
    @Column(nullable = false)
    private String productCategoryName;

    @ManyToOne
    @JoinColumn(name="restaurantId", nullable=false)
    @JsonBackReference
    private Restaurant restaurant;
}
