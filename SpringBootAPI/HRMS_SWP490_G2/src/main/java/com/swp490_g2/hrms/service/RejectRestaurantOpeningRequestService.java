package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.RejectRestaurantOpeningRequest;
import com.swp490_g2.hrms.repositories.RejectRestaurantOpeningRequestRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
public class RejectRestaurantOpeningRequestService {
    private RejectRestaurantOpeningRequestRepository rejectRestaurantOpeningRequestRepository;

    @Autowired
    public void setRejectRestaurantOpeningRequestRepository(RejectRestaurantOpeningRequestRepository rejectRestaurantOpeningRequestRepository) {
        this.rejectRestaurantOpeningRequestRepository = rejectRestaurantOpeningRequestRepository;
    }

    public RejectRestaurantOpeningRequest insert(RejectRestaurantOpeningRequest rejectRestaurantOpeningRequest) {
        if (rejectRestaurantOpeningRequest == null)
            return null;

        rejectRestaurantOpeningRequest.setId(null);
        return rejectRestaurantOpeningRequestRepository.save(rejectRestaurantOpeningRequest);
    }
}
