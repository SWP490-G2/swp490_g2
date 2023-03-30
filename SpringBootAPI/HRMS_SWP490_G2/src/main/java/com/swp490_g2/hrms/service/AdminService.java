package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Getter
public class AdminService {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private AuthenticationFacade authenticationFacade;

    @Autowired
    public void setAuthenticationFacade(AuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    private BuyerService buyerService;

    @Autowired
    public void setBuyerService(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    private RestaurantService restaurantService;

    @Autowired
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    public List<User> getAllOpeningRestaurantRequests() {
        return this.buyerService.getAllOpeningRestaurantRequests();
    }

    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }

    public void approveBecomeSeller(Long buyerId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || currentUser.isAdmin())
        {
            return;
        }

        User requester = userService.getById(buyerId);
        if (requester == null)
            return;

        requester.setRequestingRestaurantStatus(RequestingRestaurantStatus.APPROVED);
        userService.update(requester);

        if (!requester.getRequestingRestaurant().isActive()) {
            Restaurant restaurant = restaurantService.getById(requester.getRequestingRestaurant().getId());
            if(restaurant != null)
            {
                restaurant.setActive(true);
                restaurantService.update(restaurant);
            }
        }
    }

    public void rejectBecomeSeller(Long buyerId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || currentUser.isAdmin())
        {
            return;
        }

        User requester = userService.getById(buyerId);
        if (requester == null)
            return;

        requester.setRequestingRestaurantStatus(RequestingRestaurantStatus.REJECTED);
        userService.update(requester);
    }
}
