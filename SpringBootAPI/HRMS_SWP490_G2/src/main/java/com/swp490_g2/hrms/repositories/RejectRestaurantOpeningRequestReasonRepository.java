package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.RejectRestaurantOpeningRequest;
import com.swp490_g2.hrms.entity.RejectRestaurantOpeningRequestReason;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RejectRestaurantOpeningRequestReasonRepository extends JpaRepository<RejectRestaurantOpeningRequestReason, Long> {
}
