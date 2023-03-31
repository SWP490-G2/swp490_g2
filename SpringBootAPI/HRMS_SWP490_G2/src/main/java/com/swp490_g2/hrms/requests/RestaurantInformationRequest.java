package com.swp490_g2.hrms.requests;

import com.swp490_g2.hrms.entity.Address;
import com.swp490_g2.hrms.entity.File;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantInformationRequest {
    private Long restaurantId;

    private String restaurantName;

    private String description;

    private String phoneNumber;

    private boolean isActive;

    private File avatarFile;

    private User user;

    private Address address;

    private Date createdAt;

    public static RestaurantInformationRequest set(User user, Restaurant restaurant) {
        RestaurantInformationRequest request = RestaurantInformationRequest.builder()
                .restaurantId(restaurant.getId())
                .restaurantName(restaurant.getRestaurantName())
                .description(restaurant.getDescription())
                .phoneNumber(restaurant.getPhoneNumber())
                .isActive(restaurant.isActive())
                .avatarFile(restaurant.getAvatarFile())
                .user(user)
                .address(restaurant.getAddress())
                .createdAt(Date.from(restaurant.getCreatedAt()))
                .build();

        return request;
    }
}
