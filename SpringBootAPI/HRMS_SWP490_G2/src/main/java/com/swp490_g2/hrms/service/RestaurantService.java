package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import org.springframework.web.multipart.MultipartFile;

public interface RestaurantService {
    Restaurant getRestaurantById(Long id);

    void updateInformation(Long id, RestaurantInformationRequest restaurantInformationRequest);

    void updateAvatar(Long id, MultipartFile avatar);

    void updateCover(Long id, MultipartFile cover);
}
