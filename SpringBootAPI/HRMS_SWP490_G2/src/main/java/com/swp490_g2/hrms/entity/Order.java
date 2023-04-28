package com.swp490_g2.hrms.entity;

import com.swp490_g2.hrms.entity.enums.OrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "`order`")
@AttributeOverride(name = "id", column = @Column(name = "orderId"))
public class Order extends BaseEntity {
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    private List<OrderProductDetail> orderProductDetails = new ArrayList<>();

    /**
     * PENDING  -> ACCEPTED -> DELIVERING   -> COMPLETED
     * |                           |
     * -> REJECTED                 -> ABORTED
     */
    @Column(columnDefinition = "nvarchar(16) default 'PENDING'", insertable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne(optional = false)
    private User orderCreator;

    /// Transient fields

    @Transient
    private Restaurant restaurant;
}
