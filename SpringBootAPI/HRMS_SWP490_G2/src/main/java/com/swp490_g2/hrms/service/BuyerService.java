package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.BuyerRepository;
import com.swp490_g2.hrms.requests.BuyerRequest;
import com.swp490_g2.hrms.requests.OpeningRestaurantRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class BuyerService {
    private final BuyerRepository buyerRepository;

    private final UserService userService;

    public void requestOpeningRestaurant(OpeningRestaurantRequest openingRestaurantRequest){
        User user = userService.getCurrentUser();
        if(user == null){
            throw new BusinessException(ErrorStatusConstants.NOT_EXISTED_USER);
        }

        if(user.getRole() == Role.BUYER){

        }

    }


}
