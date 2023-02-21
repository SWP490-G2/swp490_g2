package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.requests.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.swp490_g2.hrms.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User addNewUser(RegisterRequest user) {
        return userRepository.save(
                User.builder()
                        .email(user.getEmail())
                        .password(user.getPassword())
                        .isActive(true)
                        .build());
    }


}
