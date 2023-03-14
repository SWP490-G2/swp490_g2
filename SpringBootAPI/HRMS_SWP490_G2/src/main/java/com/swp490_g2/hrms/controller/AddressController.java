package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {
    private final AddressService addressService;

    @GetMapping("/get-vietnam-provinces")
    public ResponseEntity<List<Object>> getVietnamProvinces(){
        return ResponseEntity.ok(addressService.getVietnamProvinces());
    }
}
