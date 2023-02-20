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
@RequestMapping("/CrudUser")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    @PostMapping("/addNewUser")
    public ResponseEntity<?> addNewUser(@RequestBody AddUserRequest user){
        return ResponseEntity.ok(userServiceImpl.addNewUser(user));
    }

    @RequestMapping(value = "/index")
    public String index() {
        return "index";
    }




}
