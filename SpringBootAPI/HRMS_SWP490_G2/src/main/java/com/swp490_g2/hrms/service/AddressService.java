package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Address;
import com.swp490_g2.hrms.entity.City;
import com.swp490_g2.hrms.entity.District;
import com.swp490_g2.hrms.entity.Ward;
import com.swp490_g2.hrms.repositories.AddressRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@Service
@Getter
public class AddressService {

    private AddressRepository addressRepository;

    @Autowired
    public void setAddressRepository(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public Set<Ward> getWardsByDistrictId(Long districtId){
        return getAddressRepository().getWardsByDistrictId(districtId);
    }

    public Set<District> getDistrictsByCityId(Long cityId){
        return addressRepository.getDistrictsByCityId(cityId);
    }

    public void addAddress(Address address){
        Set<City> cities = addressRepository.getAllCities();
        for(City city: cities){
            Set<District> districts = addressRepository.getDistrictsByCityId(city.getId());
            city.setDistricts(districts);
            for (District district: districts) {
                Set<Ward> wards = addressRepository.getWardsByDistrictId(district.getId());
            }
        }
        address.setDetailsAddress(address.getDetailsAddress());


    }



}
