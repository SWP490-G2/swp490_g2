package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    public Page<Restaurant> search(SearchRequest request) {
        SearchSpecification<Restaurant> specification = new SearchSpecification<>(request);
        Pageable pageable = SearchSpecification.getPageable(request.getPage(), request.getSize());
        return restaurantRepository.findAll(specification, pageable);
    }
}
