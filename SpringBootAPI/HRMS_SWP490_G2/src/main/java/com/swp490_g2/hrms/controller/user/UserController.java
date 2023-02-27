package com.swp490_g2.hrms.controller.user;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.LoginRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;
import com.swp490_g2.hrms.response.JWTAuthResponse;
import com.swp490_g2.hrms.security.JwtResponse;
import com.swp490_g2.hrms.security.JwtTokenUtil;
import com.swp490_g2.hrms.security.JwtUserDetailsService;
import io.jsonwebtoken.Jwt;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.swp490_g2.hrms.service.UserServiceImpl;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
    private final UserServiceImpl userServiceImpl;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

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
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) throws Exception {
        authenticate(loginRequest.getEmail(), loginRequest.getPassword());
        User user = userServiceImpl.getByEmail(loginRequest.getEmail());


        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        String token = jwtTokenUtil.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

}
