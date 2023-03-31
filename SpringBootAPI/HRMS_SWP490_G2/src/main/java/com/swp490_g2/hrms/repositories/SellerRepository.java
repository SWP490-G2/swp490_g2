package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Buyer;
import com.swp490_g2.hrms.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface SellerRepository extends  JpaRepository<Seller, Long>  {
    Optional<Seller> findByEmail(String email);

    @Query(value = "SELECT u.* FROM user u JOIN seller__restaurant sr\n" +
            "ON u.userId = sr.userId\n" +
            "WHERE sr.restaurantId = :restaurantId", nativeQuery = true)
    Optional<Seller> findByRestaurantId(Long restaurantId);
}
