package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "order")
@AttributeOverride(name = "id", column = @Column(name = "orderId"))
public class Order extends BaseEntity {
    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private List<OrderProductDetail> orderProductDetails = new ArrayList<>();
}
