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

import java.util.Date;
import java.util.Optional;
import java.util.Random;

import static com.swp490_g2.hrms.common.constants.ErrorStatusConstants.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private static String generateVerificationCode() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

    @Override
    public void registerNewUserAccount(RegisterRequest registerRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(registerRequest.getPassword());
        if (userRepository.findUserByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BusinessException(EXISTED_EMAIL, "Account: " + registerRequest.getEmail() + " is already exists.");
        }

        userRepository.save(
                User.builder()
                        .email(registerRequest.getEmail())
                        .password(encodePassword)
                        .verificationCode(generateVerificationCode())
                        .build());
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void verifyCode(String email, String code) {
//        if (code.matches("[0-9]{6}"))
//            throw new BusinessException(INVALID_VERIFICATION_CODE);

        User user = getByEmail(email);
        if (user == null)
            throw new BusinessException(NOT_EXISTED_USER_ID);

        if (!user.getVerificationCode().equals(code))
            throw new BusinessException(INVALID_VERIFICATION_CODE);
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.findUserByEmail(email).orElse(null);
    }


}
