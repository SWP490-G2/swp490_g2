package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.AddUserRequest;
import com.swp490_g2.hrms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.swp490_g2.hrms.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User addNewUser(AddUserRequest user) {
        return userRepository.save(
                User.builder()
//                .dateOfBirth(user.getDateOfBirth())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .middleName(user.getMiddleName())
                .lastName(user.getLastName())
                .password(user.getPassword())
                .phoneNumber(user.getPhoneNumber())
                .isActive(user.getIsActive())
//                .isBanned(user.getIsBanned())
//                .gender(user.getGender())
//                .avatar(user.getAvatar())
//                .citizenIdentification(user.getCitizenIdentification())

                .build());
    }


}
