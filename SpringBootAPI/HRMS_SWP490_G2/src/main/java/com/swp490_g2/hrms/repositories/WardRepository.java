package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.District;
import com.swp490_g2.hrms.entity.Product;
import com.swp490_g2.hrms.entity.Ward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface WardRepository extends JpaRepository<Ward, Long>, JpaSpecificationExecutor<Ward> {

    @Query(value = "select * from ward as w\n" +
            "inner join district as d on w.districtId = d.districtId\n" +
            "inner join city as c on d.cityId = c.cityId\n" +
            "where w.wardId = :wardId", nativeQuery = true)
    Ward getWardById(Long wardId);

}
