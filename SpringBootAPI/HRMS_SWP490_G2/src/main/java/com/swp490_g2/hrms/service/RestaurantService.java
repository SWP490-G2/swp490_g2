package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final FileService fileService;

    public Restaurant insert(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public void updateAvatar(Long id, MultipartFile imageFile) {
        Restaurant restaurant = this.getById(id);
        if (restaurant == null)
            return;

        String path = fileService.save(imageFile, "restaurant", "avatar");
        restaurant.setAvatarPath(path);
        restaurantRepository.save(restaurant);
    }
}
