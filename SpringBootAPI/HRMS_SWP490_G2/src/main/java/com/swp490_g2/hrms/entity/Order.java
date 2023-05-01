package com.swp490_g2.hrms.entity;

import com.swp490_g2.hrms.entity.enums.OrderStatus;
import com.swp490_g2.hrms.entity.enums.PaymentStatus;
import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
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

    @ManyToOne(optional = false, cascade = {CascadeType.MERGE})
    private Address destinationAddress;

    @Column(nullable = false)
    @Pattern(regexp = "^(0[3|5|7|8|9])+([0-9]{8})$", flags = Pattern.Flag.UNICODE_CASE)
    private String phoneNumber;

    @Column(columnDefinition = "nvarchar(16) null", insertable = false)
    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    /// Transient fields

    @Transient
    private Restaurant restaurant;
}
