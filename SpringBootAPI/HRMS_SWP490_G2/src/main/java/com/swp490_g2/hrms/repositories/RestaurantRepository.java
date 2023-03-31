package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Restaurant;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM seller__restaurant WHERE restaurantId = :restaurantId and userId = :userId", nativeQuery = true)
    int deleteSellerRestaurant(@Param("restaurantId") Long restaurantId, @Param("userId") Long userId);
}
