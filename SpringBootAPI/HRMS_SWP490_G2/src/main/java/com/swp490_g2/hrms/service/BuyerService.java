package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.shallowEntities.Operator;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.BuyerRepository;
import com.swp490_g2.hrms.requests.FilterRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

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

    private AdminService adminService;

    @Autowired
    public void setAdminService(AdminService adminService) {
        this.adminService = adminService;
    }

    public void requestOpeningNewRestaurant(Restaurant restaurant) {
        Buyer buyer = getCurrentBuyer();
        if (buyer == null) {
            throw new BusinessException(ErrorStatusConstants.NOT_EXISTED_USER);
        }

        Restaurant createdRestaurant = restaurantService.insert(restaurant);
        buyer.setRequestingRestaurant(createdRestaurant);
        createdRestaurant.setCreatedBy(buyer.getId());
        buyerRepository.save(buyer);
        restaurantService.update(createdRestaurant);
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

    public List<Buyer> getAllOpeningRestaurantRequests() {
        Admin currentAdmin = this.adminService.getCurrentAdmin();
        if (currentAdmin == null)
            throw new AccessDeniedException("This request allows admin only!");

        FilterRequest filterRequest = FilterRequest.builder()
                .key1("requestingRestaurant")
                .key2("id")
                .operator(Operator.IS_NOT_NULL)
                .build();

        List<FilterRequest> filters = new ArrayList<>(Collections.singletonList(filterRequest));
        SearchRequest request = SearchRequest.builder()
                .filters(filters)
                .build();

        SearchSpecification<Buyer> specification = new SearchSpecification<>(request);
        return buyerRepository.findAll(specification);
    }
}
