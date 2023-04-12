package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.config.JwtService;
import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.enums.Role;
import com.swp490_g2.hrms.entity.Notification;
import com.swp490_g2.hrms.entity.shallowEntities.TokenType;
import com.swp490_g2.hrms.repositories.RestaurantRepository;
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

import java.util.List;
import java.util.Random;


@Service
@Getter
public class UserService {

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

    private SMSService smsService;

    @Autowired
    public void setSmsService(SMSService smsService) {
        this.smsService = smsService;
    }

    private RestaurantRepository restaurantRepository;

    @Autowired
    public void setRestaurantRepository(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    private WebSocketService webSocketService;

    @Autowired
    public void setWebSocketService(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
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

        String verificationCode = generateVerificationCode();
        smsService.sendMessage(registerRequest.getPhoneNumber(),
                "Verification code for register a new account is " + verificationCode);

        user.setVerificationCode(verificationCode);
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
    public String verifyCode(String emailOrPhoneNumber, String code, boolean verifyCodeOnly) {
        if (!code.matches("[0-9]{6}"))
            return "\"Invalid code\"";

        User user = getByEmailOrPhoneNumber(emailOrPhoneNumber);
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

    public User getByEmailOrPhoneNumber(String emailOrPhoneNumber) {
        var user = userRepository.findByEmail(emailOrPhoneNumber).orElse(null);
        if (user == null) {
            user = userRepository.findByPhoneNumber(emailOrPhoneNumber).orElse(null);
        }

        return user;
    }

    public AuthenticationResponse login(AuthenticationRequest request) {
        var user = getByEmailOrPhoneNumber(request.getEmailOrPhoneNumber());
        if (user == null) {
            return AuthenticationResponse.builder()
                    .errorMessage("User is not existed!")
                    .build();
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        request.getPassword()
                )
        );


        if (!user.isActive()) {
            return AuthenticationResponse.builder()
                    .errorMessage("User has not been activated!")
                    .build();
        }

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
        User user = getByEmailOrPhoneNumber(request.getEmailOrPhoneNumber());
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
        if (user == null)
            return;

        userRepository.save(user);
    }

    public User getByRestaurantId(Long restaurantId) {
        return this.userRepository.findByRestaurantId(restaurantId).orElse(null);
    }

    public List<User> getAllOwnersByRestaurantIds(List<Long> restaurantIds) {
        return userRepository.findByRestaurantsIn(restaurantIds);
    }

    public void sendVerificationCode(String emailOrPhoneNumber) {
        User user = getByEmailOrPhoneNumber(emailOrPhoneNumber);
        if (user == null)
            return;

        smsService.sendMessage(user.getPhoneNumber(),
                "Verification code is " + user.getVerificationCode());
    }


    public List<User> getAllByRoles(List<Role> roles) {
        if (roles == null || roles.isEmpty())
            return null;

        return userRepository.findByRolesIn(roles);
    }

    public boolean hasControlsOfRestaurant(Long restaurantId) {
        User currentUser = getCurrentUser();
        if (currentUser.isAdmin())
            return true;

        if (currentUser.isSeller()) {
            List<User> owners = getAllOwnersByRestaurantIds(List.of(restaurantId));
            return owners != null && owners.stream().anyMatch(owner -> owner.getId().equals(currentUser.getId()));
        }

        return false;
    }
}
