package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.ProductCategory;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.entity.enums.ProductStatus;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @InjectMocks
    private UserService userService;

    @InjectMocks
    private ProductService productService;

    @Mock
    private RestaurantService restaurantService;

    @Mock
    private AuthenticationFacade authenticationFacade;

    @Mock
    private RestaurantRepository restaurantRepository;

    @Test
    public void addNewProductTest(){
        Restaurant restaurant = new Restaurant();
        restaurant.setId(1L);
        restaurant.setRestaurantName("Cơm Năm Hoài");

        Set<ProductCategory> categories = new HashSet<>();
        ProductCategory productCategory = new ProductCategory();
        productCategory.setId(1L);
        productCategory.setProductCategoryName("Bún");
        categories.add(productCategory);
//        Restaurant restaurant = restaurantService.getById(restaurantId);
        Product product = Product.builder()
                .productName("Bún đậu mắm tôm")
                .categories(categories)
                .price(35d)
                .productStatus(ProductStatus.ACTIVE)
                .description("Bún đậu thơm ngon")
                .restaurant(restaurant)
                .build();
        doNothing().when(productService).checkValidUserForRestaurant(restaurant.getId());
        when(restaurantService.getById(restaurant.getId())).thenReturn(restaurant);
        productService.addNewProduct(restaurant.getId(), product);


    }
}
