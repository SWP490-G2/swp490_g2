package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.ChangePasswordRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.requests.UserInformationRequest;
import com.swp490_g2.hrms.security.AuthenticationRequest;
import com.swp490_g2.hrms.security.AuthenticationResponse;
import com.swp490_g2.hrms.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    
}

