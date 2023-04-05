package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import com.swp490_g2.hrms.repositories.UserRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Getter
public class BuyerService {
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

    private AdminService adminService;

    @Autowired
    public void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private WebSocketService webSocketService;

    @Autowired
    public void setWebSocketService(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    public void requestOpeningNewRestaurant(Restaurant restaurant) {
        User buyer = userService.getCurrentUser();
        if (buyer == null || !buyer.isBuyer()) {
            return;
        }

        Restaurant createdRestaurant = restaurantService.insert(restaurant);
        buyer.setRequestingRestaurant(createdRestaurant);
        buyer.setRequestingOpeningRestaurantDate(Instant.now());
        buyer.setRequestingRestaurantStatus(RequestingRestaurantStatus.PENDING);
        createdRestaurant.setCreatedBy(buyer.getId());
        userService.update(buyer);
        restaurantService.update(createdRestaurant);
    }

    public List<User> getAllOpeningRestaurantRequests() {
        User currentAdmin = this.userService.getCurrentUser();
        if (currentAdmin == null || !currentAdmin.isAdmin())
            return null;

        List<User> users = userRepository.findAll();
        return users.stream().filter(user -> user.getRequestingRestaurant() != null).toList();
    }
}
