package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Address;
import com.swp490_g2.hrms.entity.District;
import com.swp490_g2.hrms.entity.OrderTicket;
import com.swp490_g2.hrms.entity.Ward;
import com.swp490_g2.hrms.entity.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface OrderTicketRepository extends JpaRepository<OrderTicket, Long> {
    OrderTicket findByOrderAndStatus(Long orderId, OrderStatus orderStatus);
}
