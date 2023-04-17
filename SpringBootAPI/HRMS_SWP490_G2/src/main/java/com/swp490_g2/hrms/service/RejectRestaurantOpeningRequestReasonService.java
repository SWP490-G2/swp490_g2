package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.RejectRestaurantOpeningRequest;
import com.swp490_g2.hrms.entity.RejectRestaurantOpeningRequestReason;
import com.swp490_g2.hrms.repositories.RejectRestaurantOpeningRequestReasonRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
public class RejectRestaurantOpeningRequestReasonService {
    private RejectRestaurantOpeningRequestReasonRepository rejectRestaurantOpeningRequestReasonRepository;

    @Autowired
    public void setRejectRestaurantOpeningRequestReasonRepository(RejectRestaurantOpeningRequestReasonRepository rejectRestaurantOpeningRequestRepository) {
        this.rejectRestaurantOpeningRequestReasonRepository = rejectRestaurantOpeningRequestRepository;
    }

    public RejectRestaurantOpeningRequestReason insert(RejectRestaurantOpeningRequestReason rejectRestaurantOpeningRequestReason) {
        if (rejectRestaurantOpeningRequestReason == null)
            return null;

        rejectRestaurantOpeningRequestReason.setId(null);
        return rejectRestaurantOpeningRequestReasonRepository.save(rejectRestaurantOpeningRequestReason);
    }
}
