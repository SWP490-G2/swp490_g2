package com.swp490_g2.hrms.service;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swp490_g2.hrms.common.utils.CommonUtils;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import com.swp490_g2.hrms.requests.SearchRestaurantsRequest;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

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

    private AddressService addressService;

    @Autowired
    public void setAddressService(AddressService addressService) {
        this.addressService = addressService;
    }

    public Restaurant insert(Restaurant restaurant) {
        if(restaurant == null)
            return null;
        restaurant.setId(null);

        User currentUser = userService.getCurrentUser();
        if (currentUser != null)
            restaurant.setCreatedBy(currentUser.getId());
        restaurant.setAddress(addressService.populateLatLng(restaurant.getAddress()));
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

    public String update(Restaurant restaurant) {
        if (restaurant == null)
            return "\"Invalid restaurant!\"";

        User currentUser = userService.getCurrentUser();
        if(!currentUser.isAdmin()
            && !restaurant.isActive()
        ) {
            return "\"Ask admin to activate restaurant before making changes!\"";
        }

        restaurant.setAddress(addressService.populateLatLng(restaurant.getAddress()));
        restaurantRepository.save(restaurant);
        return null;
    }


    /**
     * @param distance
     * @param userId
     * @param fullText
     * @param includeInactive
     * @param isOwner                  indicate whether the function loads restaurants that belong to the user with [userId]. Therefore,
     *                                 userId != null when isOwner = true
     * @param searchRestaurantsRequest
     * @return
     */
    public Page<Restaurant> search(Double distance,
                                   Long userId,
                                   String fullText,
                                   boolean includeInactive,
                                   Boolean isOwner,
                                   SearchRestaurantsRequest searchRestaurantsRequest) {
        List<Restaurant> ownedRestaurants;
        if (isOwner) {
            ownedRestaurants = getAll();
        } else {
            ownedRestaurants = new ArrayList<>();
        }

        List<Restaurant> restaurants;
        if (fullText == null || fullText.isEmpty())
            restaurants = restaurantRepository.findAll();
        else restaurants = restaurantRepository.fulltextSearch(fullText);

        User user = userId != null ? userService.getById(userId) : null;

        List<Restaurant> filteredRestaurants = restaurants.stream()
                .filter(restaurant -> includeInactive || restaurant.isActive())
                .filter(restaurant -> {
                    if (distance == null || user == null)
                        return true;

                    if (restaurant.getAddress() == null)
                        return false;

                    return CommonUtils.haversine_distance(restaurant.getAddress().getLat(), restaurant.getAddress().getLng(),
                            user.getAddress().getLat(), user.getAddress().getLng()) < distance;
                })
                .filter(restaurant -> {
                    if (searchRestaurantsRequest == null
                            || searchRestaurantsRequest.getRestaurantCategories() == null
                            || searchRestaurantsRequest.getRestaurantCategories().size() == 0
                    ) {
                        return true;
                    }

                    return restaurant.getRestaurantCategories().stream()
                            .anyMatch(restaurantCategory -> searchRestaurantsRequest.getRestaurantCategories().stream()
                                    .anyMatch(comparedCategory -> Objects.equals(comparedCategory.getId(), restaurantCategory.getId())));
                })
                .filter(restaurant -> {
                    if (isOwner) {
                        return ownedRestaurants.stream().anyMatch(or -> or.getId().equals(restaurant.getId()));
                    }

                    return true;
                })
                .sorted(user == null ? Comparator.comparing(Restaurant::getRestaurantName) : Comparator.comparingDouble(restaurant ->
                        CommonUtils.haversine_distance(restaurant.getAddress().getLat(), restaurant.getAddress().getLng(),
                                user.getAddress().getLat(), user.getAddress().getLng())
                ))
                .toList();

        if (searchRestaurantsRequest == null || searchRestaurantsRequest.getSearchRequest() == null)
            return new PageImpl<>(filteredRestaurants);

        return new PageImpl<>(filteredRestaurants.subList(
                searchRestaurantsRequest.getSearchRequest().getSize() * searchRestaurantsRequest.getSearchRequest().getPage(),
                Integer.min(searchRestaurantsRequest.getSearchRequest().getSize() * searchRestaurantsRequest.getSearchRequest().getPage()
                        + searchRestaurantsRequest.getSearchRequest().getSize(), filteredRestaurants.size())
        ),
                PageRequest.of(searchRestaurantsRequest.getSearchRequest().getPage(),
                        searchRestaurantsRequest.getSearchRequest().getSize()),
                filteredRestaurants.size());
    }

    public List<Restaurant> getAll() {
        User user = userService.getCurrentUser();
        if (user.isAdmin())
            return restaurantRepository.findAll();

        if (user.isSeller())
            return getAllBySellerId(user.getId());

        return null;
    }

    public RestaurantInformationRequest getRestaurantById(Long id) {
        Restaurant restaurant = restaurantRepository.getById(id);
        User user = userService.getByRestaurantId(id);
        RestaurantInformationRequest request = RestaurantInformationRequest.set(user, restaurant);
        return request;
    }

    public Restaurant getByProductId(Long productId) {
        return restaurantRepository.findByProductsIn(List.of(productId));
    }

    public List<Restaurant> getAllBySellerId(Long sellerId) {
        return restaurantRepository.findBySellerId(sellerId);
    }
}