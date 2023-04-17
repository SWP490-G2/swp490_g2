package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.HrmsSwp490G2Application;
import com.swp490_g2.hrms.config.JwtService;
import com.swp490_g2.hrms.entity.Token;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.repositories.TokenRepository;
import com.swp490_g2.hrms.repositories.UserRepository;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.security.AuthenticationResponse;
import org.junit.Before;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private SMSService smsService;

    @Mock
    private JwtService jwtService;

    @Mock
    private TokenRepository tokenRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    void registerNewUserAccount() {
        String email = "mock@gmail.com";
        RegisterRequest registerRequest = RegisterRequest.builder()
                .email(email)
                .build();

        User user = User.builder()
                .email(email)
                .isActive(true)
                .build();

        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        AuthenticationResponse response = userService.registerNewUserAccount(registerRequest);
        assertEquals("User existed", response.getErrorMessage());

        // Inactive user
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        String phoneNumber = "08123123123";
        when(userRepository.findByPhoneNumber(phoneNumber)).thenReturn(Optional.of(user), Optional.empty());
        user.setPhoneNumber(phoneNumber);
        registerRequest.setPhoneNumber(phoneNumber);
        response = userService.registerNewUserAccount(registerRequest);
        assertEquals("Phone number existed", response.getErrorMessage());

        // FindByEmail return null
        String password = "password";
        String encodedPassword = "encodedPassword";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(password)).thenReturn(encodedPassword);
        doNothing().when(smsService).sendMessage(eq(phoneNumber), isA(String.class));

        user.setPassword(password);
        registerRequest.setPassword(password);
        User newUser = user.clone();
        long newUserId = 1000;
        newUser.setId(newUserId);
        when(userRepository.save(isA(User.class))).thenReturn(newUser);

        String jwtToken = "jwtToken";
        when(jwtService.generateToken(isA(User.class))).thenReturn(jwtToken);
        when(tokenRepository.save(isA(Token.class))).thenReturn(isA(Token.class));
        response = userService.registerNewUserAccount(registerRequest);
        assertEquals(jwtToken, response.getToken());
    }

    @Test
    void getById() {
    }

    @Test
    void verifyCode() {
    }

    @Test
    void getByEmail() {
    }

    @Test
    void getByEmailOrPhoneNumber() {
    }

    @Test
    void login() {
    }

    @Test
    void getCurrentUser() {
    }

    @Test
    void changePassword() {
    }

    @Test
    void update() {
    }

    @Test
    void testUpdate() {
    }

    @Test
    void getByRestaurantId() {
    }

    @Test
    void getAllOwnersByRestaurantIds() {
    }

    @Test
    void sendVerificationCode() {
    }

    @Test
    void getAllByRoles() {
    }

    @Test
    void hasControlsOfRestaurant() {
    }
}