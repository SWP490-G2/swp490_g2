package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.response.AdminPagesSummary;
import com.swp490_g2.hrms.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public void rejectBecomeSeller(@PathVariable Long buyerId, @RequestBody String reasons) {
        adminService.rejectBecomeSeller(buyerId, reasons);
    }

    @GetMapping("/get-all-restaurant")
    public ResponseEntity<List<Restaurant>> getAllRestaurant() {
        return ResponseEntity.ok(adminService.getAllRestaurant());
    }

    @GetMapping("/get-restaurant-by-id/{id}")
    public ResponseEntity<Restaurant> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getRestaurantById(id));
    }

    @PostMapping("/insert-restaurant")
    public ResponseEntity<String> insertRestaurant(@RequestBody Restaurant restaurant) {
        return ResponseEntity.ok(adminService.insertNewRestaurant(restaurant));
    }

    @PutMapping("/update-restaurant")
    public void update(@RequestBody Restaurant restaurant) {
        adminService.updateRestaurant(restaurant);
    }

    @PostMapping("/get-all-users")
    public ResponseEntity<Page<User>> getAllUsers(@RequestBody SearchRequest request) {
        return ResponseEntity.ok(adminService.getAllUsers(request));
    }

    @GetMapping("/get-all-user-except-admin")
    public ResponseEntity<List<User>> getAllUserExceptAdmin() {
        return ResponseEntity.ok(adminService.getAllUserExceptAdmin());
    }

    @GetMapping("/admin-pages_get-summary")
    public ResponseEntity<AdminPagesSummary> adminPages_getSummary() {
        return ResponseEntity.ok(adminService.adminPages_getSummary());
    }
}
