package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.config.JwtService;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.enums.Role;
import com.swp490_g2.hrms.entity.shallowEntities.TokenType;
import com.swp490_g2.hrms.repositories.TokenRepository;
import com.swp490_g2.hrms.repositories.UserRepository;
import com.swp490_g2.hrms.requests.ChangePasswordRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.requests.UserInformationRequest;
import com.swp490_g2.hrms.security.AuthenticationRequest;
import com.swp490_g2.hrms.security.AuthenticationResponse;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.swp490_g2.hrms.requests.FilterRequest;
import com.swp490_g2.hrms.requests.SearchRequest;

import java.util.ArrayList;
import java.util.Random;


@Service
@Getter
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private TokenRepository tokenRepository;

    @Autowired
    public void setTokenRepository(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    private FileService fileService;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    private JwtService jwtService;

    @Autowired
    public void setJwtService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    private AuthenticationManager authenticationManager;

    @Autowired
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    private BuyerService buyerService;

    @Autowired
    public void setBuyerService(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    private SellerService sellerService;


    @Autowired
    public void setSellerService(SellerService sellerService) {
        this.sellerService = sellerService;
    }

    private AdminService adminService;

    @Autowired
    public void setSellerService(AdminService adminService) {
        this.adminService = adminService;
    }


    private AuthenticationFacade authenticationFacade;

    private AddressService addressService;

    @Autowired
    public void setAuthenticationFacade(AuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    private static String generateVerificationCode() {
        // It will generate 6 digit random Number.
        // from 0 to 999999
        Random rnd = new Random();
        int number = rnd.nextInt(999999);

        // this will convert any number sequence into 6 character.
        return String.format("%06d", number);
    }

    private boolean isPhoneNumberExisted(String phoneNumber) {
        User user = userRepository.findByPhoneNumber(phoneNumber).orElse(null);
        return user != null && user.isActive();
    }

    public AuthenticationResponse registerNewUserAccount(RegisterRequest registerRequest) {
        User user = userRepository.findByEmail(registerRequest.getEmail()).orElse(null);
        if (user != null && user.isActive()) {
            return AuthenticationResponse.builder()
                    .errorMessage("User existed")
                    .build();
        }

        if (isPhoneNumberExisted(registerRequest.getPhoneNumber()))
            return AuthenticationResponse.builder()
                    .errorMessage("Phone number existed")
                    .build();

        if (user == null) {
            user = new User();
        }

        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.addRole(Role.USER);
        user.setVerificationCode(generateVerificationCode());
        user.setPhoneNumber(registerRequest.getPhoneNumber());

        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();

        tokenRepository.save(token);
    }

    public User getById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Transactional
    public String verifyCode(String email, String code, boolean verifyCodeOnly) {
        if (!code.matches("[0-9]{6}"))
            return "\"Invalid code\"";

        User user = getByEmail(email);
        if (user == null)
            return "\"User not existed\"";

        if (!user.getVerificationCode().equals(code))
            return "\"Invalid code\"";

        if (!verifyCodeOnly) {
            user.setActive(true);
            user.addRole(Role.BUYER);
        }

        user.setVerificationCode(generateVerificationCode());
        userRepository.save(user);
        return null;
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );


        var user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null || !user.isActive())
            return AuthenticationResponse.builder()
                    .errorMessage("User has not been activated!")
                    .build();

        var jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;

        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });

        tokenRepository.saveAll(validUserTokens);
    }

    public User getCurrentUser() {
        Authentication authentication = authenticationFacade.getAuthentication();
        if (authentication == null)
            return null;

        String email = authentication.getName();
        if (!authentication.isAuthenticated() || email == null)
            return null;

        return getByEmail(email);
    }

    public AuthenticationResponse changePassword(ChangePasswordRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user == null) {
            return AuthenticationResponse.builder()
                    .errorMessage("\"User not existed\"")
                    .build();
        }

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        var savedUser = userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public void update(UserInformationRequest userInformationRequest) {
        User user = getCurrentUser();
        if (user == null) {
            return;
        }

        user.setFirstName(userInformationRequest.getFirstName());
        user.setMiddleName(userInformationRequest.getMiddleName());
        user.setLastName(userInformationRequest.getLastName());
        user.setDateOfBirth(userInformationRequest.getDateOfBirth());

        Ward ward = new Ward();
        ward.setId(userInformationRequest.getWardId());
        Address address = Address.builder()
                .specificAddress(userInformationRequest.getSpecificAddress())
                .ward(ward)
                .lat(userInformationRequest.getAddressLat())
                .lng(userInformationRequest.getAddressLng())
                .build();

        address.setId(userInformationRequest.getAddressId());
        user.setAddress(address);

        userRepository.save(user);
    }

    public void update(User user) {
        userRepository.save(user);
    }
}
