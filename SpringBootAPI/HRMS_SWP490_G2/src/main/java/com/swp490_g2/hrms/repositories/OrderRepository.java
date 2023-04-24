package com.swp490_g2.hrms.repositories;

import com.swp490_g2.hrms.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findAllByOrderCreatorId(Long id);

    @Query(value = """
            
            SELECT count(distinct(o.orderId)) totalOrders,
                sum(opd.price * opd.quantity) totalSales,
                date(o.createdAt)
            	FROM `order` o
            		inner join order_order_product_detail oopd on oopd.order_orderId = o.orderId
            		inner join order_product_detail opd on opd.orderProductDetailId = oopd.orderProductDetails_orderProductDetailId
                    inner join restaurant_product rp on rp.products_productId = opd.product_productId
            	where rp.restaurant_restaurantId = :restaurantId
            		and date(o.createdAt) in (
            			date_sub(curdate(), interval 6 + 7 * :offset day),
            			date_sub(curdate(), interval 5 + 7 * :offset day),
                        date_sub(curdate(), interval 4 + 7 * :offset day),
                        date_sub(curdate(), interval 3 + 7 * :offset day),
                        date_sub(curdate(), interval 2 + 7 * :offset day),
                        date_sub(curdate(), interval 1 + 7 * :offset day),
            			date_sub(curdate(), interval 0 + 7 * :offset day))
            	group by date(o.createdAt)
            ;
            """, nativeQuery = true)
    List<Object> getReportIncomeOverTimeByRestaurantIdByWeek(Long restaurantId, int offset);
}
