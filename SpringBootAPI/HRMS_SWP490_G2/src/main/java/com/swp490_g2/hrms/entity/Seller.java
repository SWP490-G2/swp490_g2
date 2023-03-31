package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "seller")
@Inheritance(strategy = InheritanceType.JOINED)
@AttributeOverride(name = "id", column = @Column(name = "userId"))
@PrimaryKeyJoinColumn(name = "userId")
public class Seller extends User {

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "seller__restaurant",
            joinColumns = @JoinColumn(name = "userId"), inverseJoinColumns = @JoinColumn(name = "restaurantId"))
    private Set<Restaurant> restaurants;


}
