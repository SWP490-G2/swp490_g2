package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Address;
import com.swp490_g2.hrms.entity.City;
import com.swp490_g2.hrms.entity.District;
import com.swp490_g2.hrms.entity.Ward;
import com.swp490_g2.hrms.entity.shallowEntities.FieldType;
import com.swp490_g2.hrms.entity.shallowEntities.Operator;
import com.swp490_g2.hrms.entity.shallowEntities.SearchSpecification;
import com.swp490_g2.hrms.repositories.AddressRepository;
import com.swp490_g2.hrms.repositories.CityRepository;
import com.swp490_g2.hrms.repositories.DistrictRepository;
import com.swp490_g2.hrms.repositories.WardRepository;
import com.swp490_g2.hrms.requests.FilterRequest;
import com.swp490_g2.hrms.requests.SearchRequest;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Getter
public class AddressService {
    private AddressRepository addressRepository;

    @Autowired
    public void setAddressRepository(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    private CityRepository cityRepository;

    @Autowired
    public void setCityRepository(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    private DistrictRepository districtRepository;

    @Autowired
    public void setDistrictRepository(DistrictRepository districtRepository) {
        this.districtRepository = districtRepository;
    }

    private WardRepository wardRepository;

    @Autowired
    public void setWardRepository(WardRepository wardRepository) {
        this.wardRepository = wardRepository;
    }

    public List<City> getCities() {
        return this.cityRepository.findAll();
    }

    public List<District> getDistrictsByCityId(Long cityId) {
        FilterRequest filterRequest = FilterRequest.builder()
                .key1("city")
                .key2("id")
                .operator(Operator.EQUAL)
                .fieldType(FieldType.LONG)
                .value(cityId)
                .build();

        List<FilterRequest> filters = new ArrayList<>(Collections.singletonList(filterRequest));
        SearchRequest request = SearchRequest.builder()
                .filters(filters)
                .build();

        SearchSpecification<District> specification = new SearchSpecification<>(request);
        return districtRepository.findAll(specification);
    }

    public List<Ward> getWardsByDistrictId(Long districtId) {
        FilterRequest filterRequest = FilterRequest.builder()
                .key1("district")
                .key2("id")
                .operator(Operator.EQUAL)
                .fieldType(FieldType.LONG)
                .value(districtId)
                .build();

        List<FilterRequest> filters = new ArrayList<>(Collections.singletonList(filterRequest));
        SearchRequest request = SearchRequest.builder()
                .filters(filters)
                .build();

        SearchSpecification<Ward> specification = new SearchSpecification<>(request);
        return wardRepository.findAll(specification);
    }

    public Address getById(Long id) {
        return addressRepository.findById(id).orElse(null);
    }
}
