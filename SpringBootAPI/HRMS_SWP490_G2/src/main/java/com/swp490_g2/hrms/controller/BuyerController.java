package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Ward;
import com.swp490_g2.hrms.requests.BuyerRequest;
import com.swp490_g2.hrms.requests.OpeningRestaurantRequest;
import com.swp490_g2.hrms.service.AddressService;
import com.swp490_g2.hrms.service.BuyerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/buyer")
public class BuyerController {

    private BuyerService buyerService;

    private AddressService addressService;


//    @GetMapping("/get-wards-by-district-id/{districtId}")
//    public ResponseEntity<List<Ward>> getWardsByDistrictId(@PathVariable Long districtId){
//        return ResponseEntity.ok(addressService.getWardsByDistrictId(districtId));
//    }

//    @PostMapping("/add-new-user-infor")
//    public ResponseEntity<Optional<BuyerRequest>> addNewUserInfor(@RequestBody BuyerRequest buyerRequest){
//        return ResponseEntity.ok(buyerService.addNewBuyerInformation(buyerRequest));
//    }

    @PostMapping("/request-opening-restaurant")
    public void requestOpeningRestaurant(@RequestBody OpeningRestaurantRequest openingRestaurantRequest){
        buyerService.requestOpeningRestaurant(openingRestaurantRequest);
    }

}
