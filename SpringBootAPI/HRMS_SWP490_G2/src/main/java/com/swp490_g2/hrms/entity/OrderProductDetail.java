package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_product_detail")
@AttributeOverride(name = "id", column = @Column(name = "orderProductDetailId"))
public class OrderProductDetail extends BaseEntity {
    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;

    @Column(columnDefinition = "LONGTEXT")
    private String note;

    @ManyToOne(optional = false)
    private Product product;



}
