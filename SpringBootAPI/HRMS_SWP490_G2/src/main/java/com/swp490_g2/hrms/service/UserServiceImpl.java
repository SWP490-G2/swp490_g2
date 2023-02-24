package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.AddUserRequest;
//import com.swp490_g2.hrms.security.WebSecurityConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.swp490_g2.hrms.repositories.UserRepository;
import static com.swp490_g2.hrms.common.constants.ErrorStatusConstants.EXISTED_EMAIL;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Override
    public User registerNewUserAccount(AddUserRequest addUserRequester){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(addUserRequester.getPassword());
        if(userRepository.findUserByEmail(addUserRequester.getEmail()).isPresent()){
            throw new BusinessException(EXISTED_EMAIL,"Account: " + addUserRequester.getEmail() + " is already exists.");
        }
        return userRepository.save(
                User.builder()
                .email(addUserRequester.getEmail())
                .firstName(addUserRequester.getFirstName())
                .middleName(addUserRequester.getMiddleName())
                .lastName(addUserRequester.getLastName())
                .password(encodePassword)
                .phoneNumber(addUserRequester.getPhoneNumber())
                .isActive(addUserRequester.getIsActive())
                .build());
    }
}
