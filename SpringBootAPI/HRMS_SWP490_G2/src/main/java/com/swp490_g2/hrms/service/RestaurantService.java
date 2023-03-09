package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.Role;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final UserService userService;

    public Restaurant insert(Restaurant restaurant)
    {
        User currentUser = this.userService.getCurrentUser();
        if(currentUser != null) {;
            restaurant.setCreatedBy(currentUser.getId());
            restaurant.setModifiedBy(currentUser.getId());
        }
        return restaurantRepository.save(restaurant);
    }

}
