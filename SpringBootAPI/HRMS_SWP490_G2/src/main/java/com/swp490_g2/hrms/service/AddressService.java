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

import java.util.*;

@Service
@Getter
public class AddressService {

    public List<Object> getVietnamProvinces() {
        String url = "https://provinces.open-api.vn/api/?depth=3";
        RestTemplate restTemplate = new RestTemplate();
        Object[] addresses = restTemplate.getForObject(url, Object[].class);
        return Arrays.asList(addresses);
    }

}
