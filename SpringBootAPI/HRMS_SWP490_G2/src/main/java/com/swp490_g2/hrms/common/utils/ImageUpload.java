package com.swp490_g2.hrms.common.utils;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class ImageUpload {
    public static final String FOLDER_RESTAURANT_AVATAR = "F:\\MyName\\SWP490\\workspace\\image-source\\restaurant\\avatar";
    public static final String FOLDER_RESTAURANT_COVER = "F:\\MyName\\SWP490\\workspace\\image-source\\restaurant\\cover";

    public boolean uploadImage(MultipartFile imageProduct, String location){
        boolean isUpload = false;
        try {
            Files.copy(imageProduct.getInputStream(),
                    Paths.get(location + File.separator, imageProduct.getOriginalFilename()),
                    StandardCopyOption.REPLACE_EXISTING);
            isUpload = true;

        }catch (Exception e){
            e.printStackTrace();
        }
        return isUpload;
    }

    public boolean checkExisted(MultipartFile imageProduct, String location){
        boolean isExisted = false;
        try {
            File file = new File(location + "\\" + imageProduct.getOriginalFilename());
            isExisted = file.exists();
        }catch (Exception e){
            e.printStackTrace();
        }
        return isExisted;
    }
}
