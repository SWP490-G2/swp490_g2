package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.codehaus.jackson.annotate.JsonManagedReference;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "district")
@AttributeOverride(name = "id", column = @Column(name = "districtId"))
public class District extends BaseEntity{

    @Column(nullable = false)
    private String districtName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "district")
    @JsonIgnore
    private Set<Ward> wards;

    @ManyToOne
    @JoinColumn(name = "cityId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonManagedReference
    private City city;

}
