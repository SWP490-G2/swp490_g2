package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    @Query(value = "SELECT min(price) FROM product where restaurantId = :restaurantId", nativeQuery = true)
    public Double getMinPriceByRestaurantId(Long restaurantId);

    @Query(value = "SELECT max(price) FROM product where restaurantId = :restaurantId", nativeQuery = true)
    public Double getMaxPriceByRestaurantId(Long restaurantId);

    @Query(value = """
        select *\s
        from product\s
            where match (productName) against (:text)\s
            or productName like %:text%
            """, nativeQuery = true)
    public Set<Product> fulltextSearch(String text);
}
