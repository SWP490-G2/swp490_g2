package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Seller;
import com.swp490_g2.hrms.repositories.SellerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerService {
    private final SellerRepository sellerRepository;

    public Seller getById(Long id) {
        return this.sellerRepository.findById(id).orElse(null);
    }
}
