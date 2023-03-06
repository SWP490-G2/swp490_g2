package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;

    public Restaurant insert(Restaurant restaurant)
    {
        return restaurantRepository.save(restaurant);
    }
}
