package com.swp490_g2.hrms.controller;
import com.swp490_g2.hrms.entity.District;
import com.swp490_g2.hrms.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.*;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/address")
public class AddressController {

    private final AddressService addressService;

//    @GetMapping("/get-all-districts/{cityId}")
    @RequestMapping(
            value = "/get-all-districts/{cityId}",
            method = RequestMethod.GET,
            produces = { MimeTypeUtils.APPLICATION_JSON_VALUE },
            headers = "Accept=application/json"
    )
    public ResponseEntity<Set<District>> getAllDistricts(@PathVariable Long cityId){
        return ResponseEntity.ok(addressService.getDistrictsByCityId(cityId));
    }


}
