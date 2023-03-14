package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "city")
@AttributeOverride(name = "id", column = @Column(name = "cityId"))
public class City extends BaseEntity{

    @Column(nullable = false)
    private String cityName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    @JsonIgnore
    private Set<District> districts;

}
