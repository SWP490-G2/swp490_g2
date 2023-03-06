package com.swp490_g2.hrms.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "buyer")
@Inheritance(strategy = InheritanceType.JOINED)
@AttributeOverride(name = "id", column = @Column(name = "userId"))
@PrimaryKeyJoinColumn(name = "userId")
public class Buyer extends User{
    @OneToOne
    @JoinColumn(name = "requestingRestaurantId", referencedColumnName = "restaurantId")
    private Restaurant requestingRestaurant;
}
