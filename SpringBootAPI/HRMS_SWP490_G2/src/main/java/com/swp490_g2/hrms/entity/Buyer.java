package com.swp490_g2.hrms.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
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

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private Instant requestingOpeningRestaurantDate;


    @Column(columnDefinition = "nvarchar(16) default 'PENDING'")
    @Enumerated(EnumType.STRING)
    private RequestingRestaurantStatus requestingRestaurantStatus;
}
