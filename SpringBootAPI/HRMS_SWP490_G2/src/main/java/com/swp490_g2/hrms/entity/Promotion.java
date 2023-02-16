package com.swp490_g2.hrms.entity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "promotion")
@AttributeOverride(name = "id", column = @Column(name = "promotion_id"))
public class Promotion extends BaseEntity{

    @Column(name = "promotion_name")
    private String promotionName;
}
