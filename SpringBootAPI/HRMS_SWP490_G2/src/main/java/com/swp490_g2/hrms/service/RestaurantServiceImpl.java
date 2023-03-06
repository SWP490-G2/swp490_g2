package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.utils.ImageUpload;
import com.swp490_g2.hrms.entity.Restaurant;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
import com.swp490_g2.hrms.requests.RestaurantInformationRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

public class RestaurantServiceImpl implements RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private ImageUpload imageUpload;

    @Override
    public Restaurant getRestaurantById(Long id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    @Override
    public void updateInformation(Long id, RestaurantInformationRequest restaurantInformationRequest) {
        try {
            Restaurant restaurant = restaurantRepository.getById(id);

            restaurant.setRestaurantName(restaurantInformationRequest.getRestaurantName());
            restaurant.setDescription(restaurantInformationRequest.getDescription());
            restaurant.setPhoneNumber(restaurantInformationRequest.getPhoneNumber());

            restaurantRepository.save(restaurant);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void updateAvatar(Long id, MultipartFile avatar) {
        try {
            Restaurant restaurant = restaurantRepository.getById(id);
            if(avatar == null){
                restaurant.setAvatar(restaurant.getAvatar());
            }else{
                if(imageUpload.checkExisted(avatar, ImageUpload.FOLDER_RESTAURANT_AVATAR) == false){
                    imageUpload.uploadImage(avatar, ImageUpload.FOLDER_RESTAURANT_AVATAR);
                }
                restaurant.setAvatar(Base64.getEncoder().encodeToString(avatar.getBytes()));
            }
            restaurantRepository.save(restaurant);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    @Override
    public void updateCover(Long id, MultipartFile cover) {
        try {
            Restaurant restaurant = restaurantRepository.getById(id);
            if(cover == null){
                restaurant.setCover(restaurant.getAvatar());
            }else{

                if(imageUpload.checkExisted(cover, ImageUpload.FOLDER_RESTAURANT_COVER) == false){
                    imageUpload.uploadImage(cover, ImageUpload.FOLDER_RESTAURANT_COVER);
                }
                restaurant.setCover(Base64.getEncoder().encodeToString(cover.getBytes()));
            }
            restaurantRepository.save(restaurant);
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}