package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.Token;
import com.swp490_g2.hrms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> , JpaSpecificationExecutor<User> {
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT u.* FROM user u JOIN user__restaurant ur\n" +
            "ON u.userId = ur.userId\n" +
            "WHERE ur.restaurantId = :restaurantId", nativeQuery = true)
    Optional<User> findByRestaurantId(Long restaurantId);
}
