package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
}
