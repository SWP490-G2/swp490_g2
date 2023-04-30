package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Order;
import com.swp490_g2.hrms.entity.enums.Role;
import com.swp490_g2.hrms.entity.enums.TimeLine;
import com.swp490_g2.hrms.response.ReportIncomeOverTime;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.service.OrderService;
import jakarta.validation.ConstraintViolationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {
    private OrderService orderService;

    @Autowired
    public void setOrderService(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insert(
            @Valid @RequestBody Order order) {
        try {
            return ResponseEntity.ok(orderService.insert(order));
        } catch (ConstraintViolationException e) {
            return ResponseEntity.ok("\"%s\"".formatted(e.getConstraintViolations().stream().findFirst().get().getMessage()));
        }
    }

    @PutMapping("/accept/{orderId}")
    public ResponseEntity<String> accept(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.accept(orderId));
    }

    @PutMapping("/abort/{orderId}")
    public ResponseEntity<String> aborted(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.abort(orderId));
    }

    @PutMapping("/complete/{orderId}")
    public ResponseEntity<String> completed(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.complete(orderId));
    }

    @PutMapping("/reject/{orderId}")
    public ResponseEntity<String> rejected(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.reject(orderId));
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<String> cancel(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.cancel(orderId));
    }

    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<String> delivering(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.deliver(orderId));
    }

    @PostMapping("/get-all-by-role/{role}")
    public ResponseEntity<Page<Order>> getAllByRole(@PathVariable String role, @RequestBody SearchRequest searchRequest) {
        return ResponseEntity.ok(orderService.getAllByRole(Role.valueOf(role), searchRequest));
    }

    @GetMapping("/get-report-income-over-time/{restaurantId}")
    public ResponseEntity<List<ReportIncomeOverTime>> getReportIncomeOverTimeByRestaurantId(@PathVariable Long restaurantId,
                                                                                            @RequestParam TimeLine timeLine,
                                                                                            @RequestParam int offset) {
        return ResponseEntity.ok(orderService.getReportIncomeOverTimeByRestaurantId(restaurantId, timeLine, offset));
    }

    @GetMapping("/check-user-ever-ordered-in-restaurant")
    public boolean checkUserEverOrderedInRestaurant(@RequestParam Long userId, @RequestParam Long restaurantId) {
        return orderService.checkUserEverOrderedInRestaurant(userId, restaurantId);
    }

    @GetMapping("/get-order-by-id/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
}
