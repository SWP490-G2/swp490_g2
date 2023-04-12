package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderCreatorId(Long id);
}
