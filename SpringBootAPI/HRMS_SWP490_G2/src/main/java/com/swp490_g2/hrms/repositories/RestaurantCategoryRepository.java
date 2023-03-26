package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.RestaurantCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantCategoryRepository extends JpaRepository<RestaurantCategory, Long> {
}
