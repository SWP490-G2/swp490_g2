package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.RegisterRequest;


public interface  UserService {
    void registerNewUserAccount(RegisterRequest user);
    User getById(Long id);
}
