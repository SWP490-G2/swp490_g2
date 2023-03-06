package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.common.response.BaseResponse;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import com.swp490_g2.hrms.service.RestaurantService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/restaurant")
@RestController
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping("/get-by-id/{id}")
    @Operation(summary = "View restaurant's information")
    public ResponseEntity<Restaurant> getById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantById(id));
    }

    @PutMapping("/update-information/{id}")
    @Operation(summary = "Update restaurant's information")
    public ResponseEntity<String> updateInformation(@PathVariable Long id,
                                                    @RequestBody RestaurantInformationRequest requests) {
        restaurantService.updateInformation(id, requests);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Updated information for restaurant!");
    }

    @PutMapping("/update-avatar/{id}")
    @Operation(summary = "Update restaurant's avatar")
    public ResponseEntity<String> updateAvatar(@PathVariable Long id,
                                               @RequestParam("avatar") MultipartFile avatar) {
        restaurantService.updateAvatar(id, avatar);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Updated avatar for restaurant!");
    }

    @PutMapping("/update-cover/{id}")
    @Operation(summary = "Update restaurant's cover")
    public ResponseEntity<String> updateCover(@PathVariable Long id,
                                              @RequestParam("cover") MultipartFile cover) {
        restaurantService.updateCover(id, cover);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("Updated cover for restaurant!");
    }
}
