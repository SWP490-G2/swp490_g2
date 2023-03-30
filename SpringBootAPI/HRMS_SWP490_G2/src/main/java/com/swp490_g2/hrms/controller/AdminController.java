package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.service.AdminService;
import lombok.RequiredArgsConstructor;
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
    public void rejectBecomeSeller(@PathVariable Long buyerId) {
        adminService.rejectBecomeSeller(buyerId);
    }

    @GetMapping("/get-all-users/")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
}
