package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "ward")
@AttributeOverride(name = "id", column = @Column(name = "wardId"))
public class Ward extends BaseEntity{

    @Column(nullable = false)
    private String wardName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "districtId", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private District district;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "ward")
    @JsonManagedReference
    @JsonIgnore
    private Set<Address> addresses;

}
