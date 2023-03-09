package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.BuyerRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@Getter
public class BuyerService {
    private BuyerRepository buyerRepository;

    @Autowired
    public void setBuyerRepository(BuyerRepository buyerRepository) {
        this.buyerRepository = buyerRepository;
    }

    private RestaurantService restaurantService;

    @Autowired
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    private AuthenticationFacade authenticationFacade;

    @Autowired
    public void setAuthenticationFacade(AuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    public void requestOpeningNewRestaurant(Restaurant restaurant) {
        Buyer buyer = getCurrentBuyer();
        if (buyer == null) {
            throw new BusinessException(ErrorStatusConstants.NOT_EXISTED_USER);
        }

        Restaurant createdRestaurant = restaurantService.insert(restaurant);
        buyer.setRequestingRestaurant(createdRestaurant);
        buyerRepository.save(buyer);
    }

    public Buyer getById(Long id) {
        return buyerRepository.findById(id).orElse(null);
    }

    public Buyer getByEmail(String email) {
        return buyerRepository.findByEmail(email).orElse(null);
    }

    public Buyer getCurrentBuyer() {
        Authentication authentication = authenticationFacade.getAuthentication();
        if (authentication == null)
            return null;

        String email = authentication.getName();
        return getByEmail(email);
    }
}
