package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.AddUserRequest;


public interface  UserService {

    User addNewUser(AddUserRequest user);
}
