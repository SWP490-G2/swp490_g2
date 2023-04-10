package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query(value = "" +
            "SELECT DISTINCT o.*, r.restaurantName FROM `order` o \n" +
            "JOIN order_order_product_detail oopd \n" +
            "ON o.orderId = oopd.order_orderId \n" +
            "JOIN order_product_detail opd\n" +
            "ON oopd.orderProductDetails_orderProductDetail = opd.orderProductDetail \n" +
            "JOIN product p \n" +
            "ON opd.productId = p.productId \n" +
            "JOIN restaurant_product rp\n" +
            "ON p.productId = rp.products_productId \n" +
            "JOIN restaurant r\n" +
            "ON rp.restaurant_restaurantId = r.restaurantId\n" +
            "WHERE r.restaurantId IN :restaurantIds", nativeQuery = true)
    List<Order> getAllOrdersByRestaurantIds(@Param("restaurantIds") List<Long> restaurantIds);

    @Query(value = "select * from `order` where userId = :userId", nativeQuery = true)
    List<Order> getAllOrdersByBuyerId(@Param("userId") Long userId);

}
