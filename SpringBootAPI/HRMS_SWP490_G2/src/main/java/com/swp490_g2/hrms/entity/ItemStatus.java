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
@Table(name = "item_status")
@AttributeOverride(name = "id", column = @Column(name = "item_status_id"))
public class ItemStatus extends BaseEntity{

    @Column(name = "item_status_name", nullable = false)
    private String itemStatusName;
}
