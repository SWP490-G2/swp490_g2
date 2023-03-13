package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    @Query(value = """
                  select distinct pc.* from product_category pc\s
                      inner join product__product_category ppc on ppc.productCategoryId = pc.productCategoryId\s
                      inner join product p on p.productId = ppc.productId\s
                      inner join restaurant r on r.restaurantId = p.restaurantId\s
                      where r.restaurantId = :restaurantId\s
                      order by pc.productCategoryName
            """, nativeQuery = true)
    Set<ProductCategory> findAllByRestaurantId(Long restaurantId);
}
