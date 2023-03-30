package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long>, JpaSpecificationExecutor<Restaurant> {
    @Query(value = """
            select distinct r.*
            from restaurant r
            	inner join product p on p.restaurantId = r.restaurantId
                inner join restaurant__restaurant_category rrc on rrc.restaurantId = r.restaurantId
                inner join restaurant_category rc on rc.restaurantCategoryId = rrc.restaurantCategoryId
            	where (match (r.restaurantName) against (:text IN NATURAL LANGUAGE MODE)
            	or r.restaurantName like %:text%)
                or (match (p.productName) against (:text IN NATURAL LANGUAGE MODE)
            	or p.productName like %:text%)
                or (match (rc.restaurantCategoryName) against (:text IN NATURAL LANGUAGE MODE)
            	or rc.restaurantCategoryName like %:text%)
                ;
            """, nativeQuery = true)
    public List<Restaurant> fulltextSearch(String text);
}
