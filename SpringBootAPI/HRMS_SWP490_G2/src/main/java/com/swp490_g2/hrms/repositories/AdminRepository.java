package com.swp490_g2.hrms.repositories;


import com.swp490_g2.hrms.entity.Admin;
import com.swp490_g2.hrms.entity.Buyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    @Query(value = """
            select *\s
            from admin a\s
                inner join user u on a.userId = u.userId
            where u.email = (:email)\s
                """, nativeQuery = true)
    Optional<Admin> findByEmail(String email);

}
