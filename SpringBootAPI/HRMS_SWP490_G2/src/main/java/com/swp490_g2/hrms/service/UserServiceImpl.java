package com.swp490_g2.hrms.service;

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
    public String registerNewUserAccount(RegisterRequest registerRequest) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodePassword = passwordEncoder.encode(registerRequest.getPassword());
        if (userRepository.findUserByEmail(registerRequest.getEmail()).isPresent()) {
            throw new BusinessException(EXISTED_EMAIL);
        }
        User user = new User();
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encodePassword);
        user.setVerificationCode(generateVerificationCode());
        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByRoleName("ROLE_BUYER").get();
        roles.add(userRole);
        user.setRoles(roles);
        userRepository.save(user);
        return "Register new account successfully!";
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

    @Override
    public String login(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtTokenProvider.generateToken(authentication);
        return token;
    }




}
