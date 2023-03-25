package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "address")
@AttributeOverride(name = "id", column = @Column(name = "addressId"))
public class Address extends BaseEntity{

    @Column(nullable = false)
    private String specificAddress;

    @ManyToOne(optional = false)
    @JoinColumn(name = "wardId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Ward ward;

    @Column(nullable = true)
    private Double lat;

    @Column(nullable = true)
    private Double lng;
}
