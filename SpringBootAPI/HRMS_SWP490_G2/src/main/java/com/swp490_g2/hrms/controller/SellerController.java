package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.ProductCategory;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.Seller;
import com.swp490_g2.hrms.service.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/seller")
public class SellerController {

    private final SellerService sellerService;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Seller> getById(@PathVariable Long id) {
        return ResponseEntity.ok(sellerService.getById(id));
    }
}
