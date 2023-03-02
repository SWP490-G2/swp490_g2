package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Buyer;
import com.swp490_g2.hrms.entity.Token;
import com.swp490_g2.hrms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

public interface BuyerRepository extends  JpaRepository<Buyer, Long>  {
    @Modifying
    @Query(value = "insert into buyer values (:userId)", nativeQuery = true)
    @Transactional
    void addFromUser(Long userId);
}
