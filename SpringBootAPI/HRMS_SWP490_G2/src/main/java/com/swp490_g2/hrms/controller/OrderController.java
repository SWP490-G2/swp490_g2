package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Order;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.ChangePasswordRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.requests.UserInformationRequest;
import com.swp490_g2.hrms.security.AuthenticationRequest;
import com.swp490_g2.hrms.security.AuthenticationResponse;
import com.swp490_g2.hrms.service.OrderService;
import com.swp490_g2.hrms.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.insert(order));
    }

    @PutMapping("/accept/{orderId}")
    public ResponseEntity<String> accept(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.accept(orderId));
    }
}
