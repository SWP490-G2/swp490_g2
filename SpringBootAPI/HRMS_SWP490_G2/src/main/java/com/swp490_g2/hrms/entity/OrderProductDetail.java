package com.swp490_g2.hrms.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order_product_detail")
@AttributeOverride(name = "id", column = @Column(name = "orderProductDetail"))
public class OrderProductDetail extends BaseEntity {
    @Column(nullable = false)
    private Long productId;

    @Column(nullable = false)
    private Long quantity;

    @Column(nullable = false)
    private Double price;
}
