package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FileRepository extends JpaRepository<File, Long> {
    @Query(value = """
                  select f.* from file f inner join user u\s
                        on f.createdBy = u.userId\s
                        where u.userId = :id
            """, nativeQuery = true)
    Set<File> findAllByCurrentUserId(Long id);
}
