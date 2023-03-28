package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.shallowEntities.Operator;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.UserRepository;
import com.swp490_g2.hrms.requests.FilterRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
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

    public void requestOpeningNewRestaurant(Restaurant restaurant) {
        User buyer = userService.getCurrentUser();
        if (buyer == null || !buyer.isBuyer()) {
            return;
        }

        Restaurant createdRestaurant = restaurantService.insert(restaurant);
        buyer.setRequestingRestaurant(createdRestaurant);
        buyer.setRequestingOpeningRestaurantDate(Instant.now());
        createdRestaurant.setCreatedBy(buyer.getId());
        userService.update(buyer);
        restaurantService.update(createdRestaurant);
    }

    public List<User> getAllOpeningRestaurantRequests() {
        User currentAdmin = this.userService.getCurrentUser();
        if (currentAdmin == null || !currentAdmin.isAdmin())
            return null;

        FilterRequest filterRequest = FilterRequest.builder()
                .key1("requestingRestaurant")
                .key2("id")
                .operator(Operator.IS_NOT_NULL)
                .build();

        List<FilterRequest> filters = new ArrayList<>(Collections.singletonList(filterRequest));
        SearchRequest request = SearchRequest.builder()
                .filters(filters)
                .build();

        SearchSpecification<User> specification = new SearchSpecification<>(request);
        return userRepository.findAll(specification);
    }
}
