package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    @PostMapping(value = "/search")
    public ResponseEntity<Page<Product>> search(@RequestBody SearchRequest request) {
        return ResponseEntity.ok(productService.search(request));
    }


    @GetMapping("/get-product-price-ranges-by-restaurant-id/{restaurantId}")
    public ResponseEntity<Double[]> getProductPriceRanges(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(productService.getProductPriceRanges(restaurantId));
    }

    @GetMapping("/fulltext-search")
    public ResponseEntity<Set<Product>> fulltextSearch(@RequestParam String text, @RequestParam Long restaurantId) {
        return ResponseEntity.ok(productService.fulltextSearch(restaurantId, text));
    }
}
