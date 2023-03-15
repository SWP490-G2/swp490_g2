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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "requestingRestaurantId")
    private Restaurant requestingRestaurant;

    @Column(nullable = false, columnDefinition="tinyint(1) default 0", insertable = false)
    private boolean requestingRestaurantRejected;
}
