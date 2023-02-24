package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.swp490_g2.hrms.repositories.UserRepository;
import org.springframework.transaction.annotation.Transactional;

import static com.swp490_g2.hrms.common.constants.ErrorStatusConstants.EXISTED_EMAIL;

import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    @Transactional
    public User registerNewUserAccount(RegisterRequest registerRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(registerRequest.getPassword());
        if (userRepository.findUserByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BusinessException(EXISTED_EMAIL, "Account: " + registerRequest.getEmail() + " is already exists.");
        }

        User user = userRepository.save(
                User.builder()
                        .email(registerRequest.getEmail())
                        .password(encodePassword)
                        .build());

        return user;
    }
}
