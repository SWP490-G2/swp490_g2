package com.swp490_g2.hrms.entity;

import com.swp490_g2.hrms.entity.id.OwnerRestaurantId;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "owner_restaurant")
public class OwnerRestaurant implements Serializable {

    @EmbeddedId
    private OwnerRestaurantId ownerRestaurantId;

}
