package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.ProductInformationRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/add-new-product")
    public void addNewProduct(@RequestPart("file") MultipartFile[] productImages, @Valid ProductInformationRequest productInformationRequest) {
        productService.addNewProduct(productInformationRequest, productImages);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<Product> getById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getById(id));
    }

    @PostMapping(value = "/add-image/{productId}")
    public void addImage(@PathVariable Long productId,
                         @RequestParam("file") MultipartFile imageFile
    ) {
        productService.addImage(productId, imageFile);
    }

    @PutMapping("/update")
    public void update(@RequestBody Product product) {
        productService.update(product);
    }

    @DeleteMapping("/delete-product-by-id/{productId}")
    public void deleteProductById(@PathVariable Long productId){
        productService.deleteProductById(productId);
    }
}
