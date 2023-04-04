package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import com.swp490_g2.hrms.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("/get-all-opening-restaurant-requests")
    public ResponseEntity<List<User>> getAllOpeningRestaurantRequests() {
        return ResponseEntity.ok(adminService.getAllOpeningRestaurantRequests());
    }

    @PutMapping("/approve-become-seller/{buyerId}")
    public void approveBecomeSeller(@PathVariable Long buyerId) {
        adminService.approveBecomeSeller(buyerId);
    }

    @PutMapping("/reject-become-seller/{buyerId}")
    public void rejectBecomeSeller(@PathVariable Long buyerId) {
        adminService.rejectBecomeSeller(buyerId);
    }

    @GetMapping("/get-all-restaurant")
    public ResponseEntity<List<RestaurantInformationRequest>> getAllRestaurant() {
        return ResponseEntity.ok(adminService.getAllRestaurant());
    }

    @GetMapping("/get-restaurant-by-id/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getRestaurantById(id));
    }

    @PostMapping("/insert-restaurant")
    public void insert(@RequestBody Restaurant restaurant) {
        adminService.insertNewRestaurant(restaurant);
    }

    @PutMapping("/update-restaurant")
    public void update(@RequestBody Restaurant restaurant) {
        adminService.updateRestaurant(restaurant);
    }

    @DeleteMapping("/delete-restaurant-by-id/{id}")
    public void deleteRestaurantById(@PathVariable Long id) {
        adminService.deleteRestaurantById(id);
    }
}
