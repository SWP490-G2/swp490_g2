package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Role;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.LoginRequest;
import com.swp490_g2.hrms.requests.RegisterRequest;

import java.util.Set;


public interface  UserService {
    void registerNewUserAccount(RegisterRequest user);
    User getById(Long id);
    void verifyCode(String email, String code);
    User getByEmail(String email);
    String login(LoginRequest loginRequest);

}
