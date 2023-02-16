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
@Table(name = "certificate")
@AttributeOverride(name = "id", column = @Column(name = "certificate_id"))
public class Certificate extends BaseEntity{

    @Column(name = "certificate_name", nullable = false)
    private String certificateName;

}
