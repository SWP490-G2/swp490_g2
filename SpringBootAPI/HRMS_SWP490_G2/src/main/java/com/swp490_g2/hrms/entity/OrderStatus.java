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
@Table(name = "order_status")
@AttributeOverride(name = "id", column = @Column(name = "order_status_id"))
public class OrderStatus extends BaseEntity{

    @Column(name = "status_name", nullable = false)
    private String statusName;
}
