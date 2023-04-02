package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import com.swp490_g2.hrms.entity.User;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
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

    public List<RestaurantInformationRequest> getAllRestaurant() {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
        return restaurantService.getAllRestaurant();
    }

    public Restaurant getRestaurantById(Long restaurantId) {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
        return restaurantService.getById(restaurantId);
    }

    public void insertNewRestaurant(Restaurant restaurant) {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
        restaurantService.insert(restaurant);
    }

    public void updateRestaurant(Restaurant restaurant) {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
        restaurantService.update(restaurant);
    }

    public void deleteRestaurantById(Long id) {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
        restaurantService.deleteRestaurantById(id);
    }
}
