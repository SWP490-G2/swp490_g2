package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.requests.OpeningRestaurantRequest;
import com.swp490_g2.hrms.service.AddressService;
import com.swp490_g2.hrms.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/buyer")
public class BuyerController {

    private final BuyerService buyerService;

    @PostMapping("/request-opening-new-restaurant")
    public void requestOpeningNewRestaurant(@RequestBody Restaurant restaurant){
//        buyerService.requestOpeningNewRestaurant(restaurant);
    }

}
