package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.File;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.common.utils.CommonUtils;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Service
@Getter
public class RestaurantService {
    private RestaurantRepository restaurantRepository;

    @Autowired
    public void setRestaurantRepository(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    private FileService fileService;

    @Autowired
    public void setFileService(FileService fileService) {
        this.fileService = fileService;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private SellerService sellerService;

    @Autowired
    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    public Restaurant insert(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Restaurant getById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public void updateAvatar(Long id, MultipartFile imageFile) {
        Restaurant restaurant = this.getById(id);
        if (restaurant == null)
            return;

        String path = fileService.save(imageFile, "restaurant", "avatar");
        File avatarImage = File.builder()
                .filePath(path)
                .build();

        Long currentUserId = this.userService.getCurrentUser().getId();
        avatarImage.setCreatedBy(currentUserId);
        avatarImage.setModifiedBy(currentUserId);
        restaurant.setAvatarFile(avatarImage);

        restaurantRepository.save(restaurant);
    }

    public void update(Restaurant restaurant) {
        restaurantRepository.save(restaurant);
    }

    public List<Restaurant> search(SearchRequest request, Double distance, Long userId) {
        SearchSpecification<Restaurant> specification = new SearchSpecification<>(request);
        Pageable pageable = SearchSpecification.getPageable(request.getPage(), request.getSize());
        List<Restaurant> restaurants = restaurantRepository.findAll(specification, pageable).getContent();
        User user = userService.getById(userId);
        if (user == null || user.getAddress() == null)
            return List.of();

        return restaurants.stream().filter(restaurant -> {
            if (restaurant.getAddress() == null)
                return false;

            return CommonUtils.haversine_distance(restaurant.getAddress().getLat(), restaurant.getAddress().getLng(),
                    user.getAddress().getLat(), user.getAddress().getLng()) < distance;
        }).toList();
    }

    public List<RestaurantInformationRequest> getAllRestaurant() {
        List<Restaurant> restaurantList = restaurantRepository.findAll();
        List<RestaurantInformationRequest> requestList = new ArrayList<>();
        for (Restaurant restaurant: restaurantList) {
            Seller seller = sellerService.getByRestaurantId(restaurant.getId());
            RestaurantInformationRequest request = RestaurantInformationRequest.set(seller, restaurant);
            requestList.add(request);
        }
        return requestList;
    }

    public void deleteRestaurantById(Long restaurantId) {
        Restaurant restaurant = restaurantRepository.getById(restaurantId);
        Seller seller = sellerService.getByRestaurantId(restaurantId);
        RestaurantInformationRequest request = RestaurantInformationRequest.set(seller, restaurant);
        if(Objects.nonNull(request)) {
            int n = restaurantRepository.deleteSellerRestaurant(restaurantId, request.getSeller().getId());
            restaurantRepository.deleteById(restaurantId);
        }
    }

    public RestaurantInformationRequest getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.getById(id);
        Seller seller = sellerService.getByRestaurantId(id);
        RestaurantInformationRequest request = RestaurantInformationRequest.set(seller, restaurant);
        return request;
    }
}
