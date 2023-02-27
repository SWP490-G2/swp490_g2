package com.swp490_g2.hrms.controller.user;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.LoginRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.response.JWTAuthResponse;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.swp490_g2.hrms.service.UserServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userServiceImpl;

    @PostMapping("/register")
    public void registerNewUserAccount(@Valid @RequestBody RegisterRequest user){
        userServiceImpl.registerNewUserAccount(user);
    }

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<User> getById(@PathVariable Long id) {
        return ResponseEntity.ok(userServiceImpl.getById(id));
    }

    @GetMapping("/get-by-email/{email}")
    public ResponseEntity<User> getByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userServiceImpl.getByEmail(email));
    }

    @PostMapping("/verify-code/{email}")
    public void verifyCode(@PathVariable String email, @RequestBody String code)
    {
        userServiceImpl.verifyCode(email, code);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JWTAuthResponse> login(@RequestBody LoginRequest loginRequest){
        String token = userServiceImpl.login(loginRequest);
        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);
        return ResponseEntity.ok(jwtAuthResponse);
    }


}
