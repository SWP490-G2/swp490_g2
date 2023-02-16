package com.swp490_g2.hrms.entity;

import com.swp490_g2.hrms.entity.id.RestaurantCertificateId;
import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurant_certificate")
public class RestaurantCertificate implements Serializable {

    @EmbeddedId
    private RestaurantCertificateId restaurantCertificateId;


}
