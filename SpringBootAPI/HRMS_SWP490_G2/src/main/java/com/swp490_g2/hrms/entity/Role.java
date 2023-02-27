package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "role")
@AttributeOverride(name = "id", column = @Column(name = "role_id"))
public class Role extends BaseEntity{

    @Enumerated(EnumType.STRING)
    @Column(name = "role_name", nullable = false)
    private String roleName;
}
