package com.swp490_g2.hrms.requests;

import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RestaurantInformationRequest {
//    private Long restaurantId;
    private String restaurantName;

    private String description;

    private String phoneNumber;
}