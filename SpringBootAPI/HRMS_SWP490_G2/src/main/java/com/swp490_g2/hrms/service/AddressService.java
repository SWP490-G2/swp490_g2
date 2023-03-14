package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.constants.ErrorStatusConstants;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.repositories.AddressRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Getter
public class AddressService {

    private final AddressRepository addressRepository;

    private final UserService userService;
    public Set<District> getDistrictsByCityId(Long cityId){
        Set<District> districts = new HashSet<>();
        User user = userService.getCurrentUser();
        if (user == null) {
            throw new BusinessException(ErrorStatusConstants.NOT_EXISTED_USER);
        }
        if(user.getRole() == Role.BUYER){
            districts = addressRepository.getDistrictsByCityId(cityId);
        }
        return districts;
    }
}
