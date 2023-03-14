package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public void update(@RequestBody Restaurant restaurant)
    {
        restaurantService.update(restaurant);
    }
}
