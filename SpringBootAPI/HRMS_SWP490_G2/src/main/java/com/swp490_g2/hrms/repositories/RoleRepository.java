package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.ERole;
import com.swp490_g2.hrms.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
