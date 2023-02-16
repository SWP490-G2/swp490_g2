package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "city")
@AttributeOverride(name = "id", column = @Column(name = "city_id"))
public class City extends BaseEntity{

    @Column(name = "city_name")
    private String cityName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private Set<District> districts;


}
