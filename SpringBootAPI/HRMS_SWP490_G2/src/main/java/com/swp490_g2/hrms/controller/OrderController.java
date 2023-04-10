package com.swp490_g2.hrms.controller;

import com.swp490_g2.hrms.entity.Order;
import com.swp490_g2.hrms.requests.SearchRequest;
import com.swp490_g2.hrms.service.OrderService;
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
    public ResponseEntity<String> insert(@RequestBody Order order) {
        return ResponseEntity.ok(orderService.insert(order));
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

    @PutMapping("/deliver/{orderId}")
    public ResponseEntity<String> delivering(@PathVariable Long orderId) {
        return ResponseEntity.ok(orderService.deliver(orderId));
    }

    @PostMapping("/search")
    public ResponseEntity<Page<Order>> search(@RequestBody SearchRequest request) {
        return ResponseEntity.ok(orderService.search(request));
    }

//    public getById
}
