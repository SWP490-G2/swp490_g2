package com.swp490_g2.hrms.controller;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.RestaurantCategory;
import com.swp490_g2.hrms.requests.SearchRestaurantsRequest;
import com.swp490_g2.hrms.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/restaurant")
public class RestaurantController {
    private final RestaurantService restaurantService;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Restaurant> getById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getById(id));
    }

    @PutMapping(value = "/update-avatar/{id}")
    public void updateAvatar(@PathVariable Long id,
                             @RequestParam("file") MultipartFile imageFile
    ) {
        restaurantService.updateAvatar(id, imageFile);
    }

    @PutMapping("update")
    public void update(@RequestBody Restaurant restaurant) {
        restaurantService.update(restaurant);
    }

    @PostMapping(value = "/search")
    public ResponseEntity<Page<Restaurant>> search(@RequestParam(value = "distance", required = false) Double distance,
                                                   @RequestParam(value = "user-id", required = false) Long userId,
                                                   @RequestParam(value = "full-text", required = false) String fullText,
                                                   @RequestParam(value = "include-inactive") boolean includeInactive,
                                                   @RequestParam(value = "is-owner", required = false) Boolean isOwner,
                                                   @RequestBody SearchRestaurantsRequest searchRestaurantsRequest
    ) {
        return ResponseEntity.ok(restaurantService.search(distance, userId, fullText, includeInactive, isOwner, searchRestaurantsRequest));
    }
}
