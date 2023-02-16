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
@Table(name = "payment")
@AttributeOverride(name = "id", column = @Column(name = "payment_id"))
public class Payment extends BaseEntity{

    @Column(name = "payment_name", nullable = false)
    private String paymentName;

    @Column(name = "description", nullable = false)
    private String description;
}
