package com.swp490_g2.hrms.controller.user;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.AddUserRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.swp490_g2.hrms.service.UserServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    @PostMapping("/register")
    public ResponseEntity<User> registerNewUserAccount(@RequestBody AddUserRequest user){
        return ResponseEntity.ok(userServiceImpl.registerNewUserAccount(user));
    }


}
