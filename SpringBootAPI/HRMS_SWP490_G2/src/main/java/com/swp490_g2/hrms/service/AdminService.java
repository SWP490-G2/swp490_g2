package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.config.AuthenticationFacade;
import com.swp490_g2.hrms.entity.Admin;
import com.swp490_g2.hrms.entity.Buyer;
import com.swp490_g2.hrms.repositories.AdminRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@Getter
public class AdminService {
    private AdminRepository adminRepository;

    @Autowired
    public void setAdminRepository(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private AuthenticationFacade authenticationFacade;

    @Autowired
    public void setAuthenticationFacade(AuthenticationFacade authenticationFacade) {
        this.authenticationFacade = authenticationFacade;
    }

    private BuyerService buyerService;

    @Autowired
    public void setBuyerService(BuyerService buyerService) {
        this.buyerService = buyerService;
    }

    public Admin getByEmail(String email) {
        return adminRepository.findByEmail(email).orElse(null);
    }

    public Admin getCurrentAdmin() {
        Authentication authentication = authenticationFacade.getAuthentication();
        if (authentication == null)
            return null;

        String email = authentication.getName();
        return getByEmail(email);
    }

    public Admin getById(Long id) {
        return this.adminRepository.findById(id).orElse(null);
    }

    public List<Buyer> getAllOpeningRestaurantRequests() {
        return this.buyerService.getAllOpeningRestaurantRequests();
    }
}
