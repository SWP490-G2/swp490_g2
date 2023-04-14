package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.File;
import com.swp490_g2.hrms.entity.Notification;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.enums.RequestingRestaurantStatus;
import com.swp490_g2.hrms.entity.enums.Role;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.UserRepository;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Getter
public class AdminService {
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

    private WebSocketService webSocketService;

    @Autowired
    public void setWebSocketService(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }

    public List<User> getAllOpeningRestaurantRequests() {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || !currentUser.isAdmin()) {
            return List.of();
        }

        List<User> list = this.buyerService.getAllOpeningRestaurantRequests();
        return list;
    }

    public Page<User> getAllUsers(SearchRequest request) {
        SearchSpecification<User> specification = new SearchSpecification<>(request);
        Pageable pageable = SearchSpecification.getPageable(request.getPage(), request.getSize());
        return userRepository.findAll(specification, pageable);
    }

    @Transactional
    public void approveBecomeSeller(Long buyerId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || !currentUser.isAdmin()) {
            return;
        }

        User requester = userService.getById(buyerId);
        if (requester == null)
            return;

        Restaurant restaurant = restaurantService.getById(requester.getRequestingRestaurant().getId());
        if (restaurant != null) {
            addRestaurantForSeller(requester.getId(), restaurant.getId());
            if (!requester.getRequestingRestaurant().isActive()) {
                restaurant.setActive(true);
                restaurantService.update(restaurant);
            }
        }

        requester.setRequestingRestaurantStatus(RequestingRestaurantStatus.APPROVED);
        requester.getRoles().add(Role.SELLER);
        requester.setRequestingRestaurant(null);
        requester.setRequestingOpeningRestaurantDate(null);

        assert restaurant != null;
        webSocketService.push("/notification", Notification.builder()
                .toUsers(List.of(requester))
                .message("Your restaurant [%s] has been approved!".formatted(restaurant.getRestaurantName()))
                .url("/restaurant/%d".formatted(restaurant.getId()))
                .build());

        userService.update(requester);
    }

    public void addRestaurantForSeller(Long sellerId, Long restaurantId) {
        userRepository.addRestaurantForSeller(sellerId, restaurantId);
    }

    @Transactional
    public void rejectBecomeSeller(Long buyerId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null || !currentUser.isAdmin()) {
            return;
        }

        User requester = userService.getById(buyerId);
        if (requester == null)
            return;

        requester.setRequestingRestaurantStatus(RequestingRestaurantStatus.REJECTED);
        requester.setRequestingRestaurant(null);
        requester.setRequestingOpeningRestaurantDate(null);
        userService.update(requester);

        webSocketService.push("/notification", Notification.builder()
                .toUsers(List.of(requester))
                .message("Your opening restaurant request has been rejected!")
                .url("/account-information")
                .build());
    }

    public List<Restaurant> getAllRestaurant() {
        allowAdminExecuteAction();
        return restaurantService.getAllRestaurant();
    }

    public Restaurant getRestaurantById(Long restaurantId) {
        allowAdminExecuteAction();
        return restaurantService.getById(restaurantId);
    }

    public void insertNewRestaurant(Restaurant restaurant) {
        allowAdminExecuteAction();
        restaurantService.insert(restaurant);
    }

    public void updateRestaurant(Restaurant restaurant) {
        allowAdminExecuteAction();
        restaurantService.update(restaurant);
    }

    public List<User> getAllUserExceptAdmin() {
        allowAdminExecuteAction();
        List<User> userList = userService.getAllByRoles(List.of(Role.USER, Role.BUYER, Role.SELLER));
        return userList;
    }

    private void allowAdminExecuteAction() {
        User currentAdmin = userService.getCurrentUser();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");
    }
}
