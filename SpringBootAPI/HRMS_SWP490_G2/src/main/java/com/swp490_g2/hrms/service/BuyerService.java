package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.BuyerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BuyerService {
    private final BuyerRepository repository;

    private final UserService userService;
    private final RestaurantService restaurantService;

    public void requestOpeningNewRestaurant(Restaurant restaurant) {
        User user = userService.getCurrentUser();
        if (user == null) {
            throw new BusinessException(ErrorStatusConstants.NOT_EXISTED_USER);
        }

        if (user.getRole() == Role.BUYER) {
            Restaurant createdRestaurant = restaurantService.insert(restaurant);
            Buyer buyer = repository.findById(user.getId()).orElse(null);

            if (buyer == null) {
                throw new BusinessException("Buyer not existed");
            }

            buyer.setRequestingRestaurant(createdRestaurant);
            repository.save(buyer);
        } else {
            throw new BusinessException("The current user must be a buyer");
        }
    }


}
