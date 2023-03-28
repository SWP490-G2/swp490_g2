package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.utils.CommonUtils;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import com.swp490_g2.hrms.requests.SearchRestaurantsRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Comparator;
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

    public Page<Restaurant> search(Double distance, Long userId, String fullText, SearchRestaurantsRequest searchRestaurantsRequest) {
        List<Restaurant> restaurants;
        if (fullText == null || fullText.isEmpty())
            restaurants = restaurantRepository.findAll();
        else restaurants = restaurantRepository.fulltextSearch(fullText);

        User user = userId != null ? userService.getById(userId) : null;

        List<Restaurant> filteredRestaurants = restaurants.stream()
                .filter(Restaurant::isActive)
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
}
