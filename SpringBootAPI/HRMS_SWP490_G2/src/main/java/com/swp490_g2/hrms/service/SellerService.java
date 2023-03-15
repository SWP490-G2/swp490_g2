package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.Seller;
import com.swp490_g2.hrms.entity.User;
import com.swp490_g2.hrms.repositories.SellerRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Getter
public class SellerService {
    private SellerRepository sellerRepository;

    @Autowired
    public void setSellerRepository(SellerRepository sellerRepository) {
        this.sellerRepository = sellerRepository;
    }

    public Seller getById(Long id) {
        return this.sellerRepository.findById(id).orElse(null);
    }

    public Seller getByEmail(String email) {
        return this.sellerRepository.findByEmail(email).orElse(null);
    }
}
