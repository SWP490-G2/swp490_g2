package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swp490_g2.hrms.entity.enums.OrderStatus;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
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
@Table(name = "`order`")
@AttributeOverride(name = "id", column = @Column(name = "orderId"))
public class Order extends BaseEntity {
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<OrderProductDetail> orderProductDetails = new ArrayList<>();

    /**
     *  PENDING  -> ACCEPTED -> DELIVERING   -> COMPLETED
     *           |                           |
     *           -> REJECTED                 -> ABORTED
     */
    @Column(columnDefinition = "nvarchar(16) default 'PENDING'", insertable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

}
