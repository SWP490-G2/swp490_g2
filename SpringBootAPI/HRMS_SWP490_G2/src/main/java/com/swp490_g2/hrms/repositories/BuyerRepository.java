package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BuyerRepository extends  JpaRepository<Buyer, Long>  {
    @Modifying
    @Query(value = "insert into buyer (userId) values (:userId)", nativeQuery = true)
    void addFromUser(Long userId);

    @Query(
            value = "select r.restaurantName " +
                    "from buyer as b " +
                    "inner join restaurant as r " +
                    "on b.requestingRestaurantId = r.restaurantId " +
                    "where b.userId = :userId",
            nativeQuery = true
    )
    String getRestaurantNameRequestByBuyerId(Long userId);


}
