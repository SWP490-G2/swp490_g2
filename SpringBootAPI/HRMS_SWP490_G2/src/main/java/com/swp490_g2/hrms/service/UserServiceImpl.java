package com.swp490_g2.hrms.service;

import com.google.gson.Gson;
import com.swp490_g2.hrms.common.exception.BusinessException;
import com.swp490_g2.hrms.entity.Role;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.repositories.RoleRepository;
import com.swp490_g2.hrms.requests.LoginRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.security.ERole;
import com.swp490_g2.hrms.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.swp490_g2.hrms.repositories.UserRepository;

import java.util.*;

import static com.swp490_g2.hrms.common.constants.ErrorStatusConstants.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private RoleRepository roleRepository;

    private AuthenticationManager authenticationManager;

    private JwtTokenProvider jwtTokenProvider;


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
        User user = userRepository.findUserByEmail(registerRequest.getEmail()).orElse(null);
        if (user != null && user.isActive()) {
            throw new BusinessException(EXISTED_EMAIL, "Account: " + registerRequest.getEmail() + " is already exists.");
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(registerRequest.getPassword());

        if (user == null) {
            userRepository.save(
                    User.builder()
                            .email(registerRequest.getEmail())
                            .password(encodePassword)
                            .verificationCode(generateVerificationCode())
                            .build());
        } else {
            user.setPassword(encodePassword);
            user.setVerificationCode(generateVerificationCode());
            userRepository.save(user);
        }
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void verifyCode(String email, String code) {
        code = code.substring(1, 7);
        if (!code.matches("[0-9]{6}"))
            throw new BusinessException(INVALID_VERIFICATION_CODE);

        User user = getByEmail(email);
        if (user == null)
            throw new BusinessException(NOT_EXISTED_USER_ID);

        if (!user.getVerificationCode().equals(code))
            throw new BusinessException(INVALID_VERIFICATION_CODE);

        user.setActive(true);
        userRepository.save(user);
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.findUserByEmail(email).orElse(null);
    }

    @Override
    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        return token;
    }




}
