package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.ProductCategory;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.service.ProductCategoryService;
import com.swp490_g2.hrms.service.RestaurantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product-category")
public class ProductCategoryController {
    private final ProductCategoryService productCategoryService;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<ProductCategory> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productCategoryService.getById(id));
    }
}
