package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.OrderProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderProductDetailRepository extends JpaRepository<OrderProductDetail, Long> {

    @Query(value = "" +
            "select opd.* from order_product_detail as opd " +
            "inner join order_order_product_detail as oopd " +
            "on opd.orderProductDetail = oopd.orderProductDetails_orderProductDetail " +
            "where opd.productId = :productId", nativeQuery = true)
    List<OrderProductDetail> getAllOrderProductDetailsByProductId(@Param("productId") Long productId);
}
