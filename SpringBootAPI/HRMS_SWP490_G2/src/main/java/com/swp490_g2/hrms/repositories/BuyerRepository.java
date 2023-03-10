package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Buyer;
import com.swp490_g2.hrms.requests.BuyerRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

public interface BuyerRepository extends  JpaRepository<Buyer, Long>  {
    @Modifying
    @Query(value = "insert into buyer (userId) values (:userId)", nativeQuery = true)
    void addFromUser(Long userId);

    @Query(value = """
        select *\s
        from buyer b\s
            inner join user u on b.userId = u.userId
        where u.email = (:email)\s
            """, nativeQuery = true)
    Optional<Buyer> findByEmail(String email);

//    Optional<BuyerRequest> addNewBuyerInformation(BuyerRequest buyerRequest);


}
