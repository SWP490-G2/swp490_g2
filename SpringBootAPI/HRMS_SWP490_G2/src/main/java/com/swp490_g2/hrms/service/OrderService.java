package com.swp490_g2.hrms.service;

import com.swp490_g2.hrms.entity.*;
import com.swp490_g2.hrms.entity.enums.OrderStatus;
import com.swp490_g2.hrms.entity.enums.ProductStatus;
import com.swp490_g2.hrms.repositories.OrderRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Getter
public class OrderService {
    private OrderRepository orderRepository;

    @Autowired
    public void setOrderRepository(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    private ProductService productService;

    @Autowired
    public void setProductService(ProductService productService) {
        this.productService = productService;
    }

    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    private RestaurantService restaurantService;

    @Autowired
    public void setRestaurantService(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    private WebSocketService webSocketService;

    @Autowired
    public void setWebSocketService(WebSocketService webSocketService) {
        this.webSocketService = webSocketService;
    }
    //////////////////////////////

    @Transactional
    public String insert(Order order) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "\"Current user does not exist!\"";

        if (order == null)
            return "\"Order does not exist!\"";

        order.setId(null);
        Restaurant restaurant = null;
        for (OrderProductDetail orderProductDetail : order.getOrderProductDetails()) {
            Restaurant restaurant2 = restaurantService.getByProductId(orderProductDetail.getProduct().getId());
            if (restaurant == null)
                restaurant = restaurant2;
            else if (!restaurant.getId().equals(restaurant2.getId())) {
                return "\"Order must include products from a SINGLE restaurant!\"";
            }
        }

        for (OrderProductDetail orderProductDetail : order.getOrderProductDetails()) {
            Product product = productService.getById(orderProductDetail.getProduct().getId());
            if (product.getProductStatus() == ProductStatus.OUT_OF_STOCK) {
                return "\"Product [%s] is out of stock!\"".formatted(product.getProductName());
            }
        }

        order.setCreatedBy(currentUser.getId());
        order.setOrderCreator(currentUser);
        orderRepository.save(order);

        assert restaurant != null;
        webSocketService.push(
                "/notification",
                Notification.builder()
                        .url("")
                        .message("[%s] made an order!".formatted(currentUser.getFirstName()))
                        .toUsers(userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId())))
                        .build()
        );
        return null;
    }

    public Order getById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public Restaurant getRestaurantByOrderId(Long orderId) {
        Order order = getById(orderId);
        if (order == null)
            return null;

        Restaurant restaurant = null;
        for (OrderProductDetail orderProductDetail : order.getOrderProductDetails()) {
            Restaurant restaurant2 = restaurantService.getByProductId(orderProductDetail.getProduct().getId());
            if (restaurant == null)
                restaurant = restaurant2;
            else if (!restaurant.getId().equals(restaurant2.getId())) {
                return null;
            }
        }

        return restaurant;
    }

    public String accept(Long orderId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "Current user does not have permission to do this action!";

        Restaurant restaurant = getRestaurantByOrderId(orderId);
        if (restaurant == null)
            return "Order [id=%d] is not valid!";

        List<User> owners = userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId()));
        if (owners == null || owners.stream().noneMatch(owner -> owner.getId().equals(currentUser.getId())))
            return "Current user does not have permission to do this action!";

        if (!orderRepository.existsById(orderId))
            return "Order [id=%d] does not exist!".formatted(orderId);

        Order order = getById(orderId);
        if (order.getOrderStatus() != OrderStatus.PENDING)
            return "Cannot change order status from [%s] to [ACCEPTED]!".formatted(order.getOrderStatus());

        order.setOrderStatus(OrderStatus.ACCEPTED);
        order.setModifiedBy(currentUser.getId());
        orderRepository.save(order);
        return null;
    }

    public String reject(Long orderId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "Current user does not have permission to do this action!";

        Restaurant restaurant = getRestaurantByOrderId(orderId);
        if (restaurant == null)
            return "Order [id=%d] is not valid!";

        List<User> owners = userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId()));
        if (owners == null || owners.stream().noneMatch(owner -> owner.getId().equals(currentUser.getId())))
            return "Current user does not have permission to do this action!";

        if (!orderRepository.existsById(orderId))
            return "Order [id=%d] does not exist!".formatted(orderId);

        Order order = getById(orderId);
        if (order.getOrderStatus() != OrderStatus.PENDING)
            return "Cannot change order status from [%s] to [REJECTED]!".formatted(order.getOrderStatus());

        order.setOrderStatus(OrderStatus.REJECTED);
        order.setModifiedBy(currentUser.getId());
        orderRepository.save(order);
        return null;
    }

    public String deliver(Long orderId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "Current user does not have permission to do this action!";

        Restaurant restaurant = getRestaurantByOrderId(orderId);
        if (restaurant == null)
            return "Order [id=%d] is not valid!";

        List<User> owners = userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId()));
        if (owners == null || owners.stream().noneMatch(owner -> owner.getId().equals(currentUser.getId())))
            return "Current user does not have permission to do this action!";

        if (!orderRepository.existsById(orderId))
            return "Order [id=%d] does not exist!".formatted(orderId);

        Order order = getById(orderId);
        if (order.getOrderStatus() != OrderStatus.ACCEPTED)
            return "Cannot change order status from [%s] to [DELIVERING]!".formatted(order.getOrderStatus());

        order.setOrderStatus(OrderStatus.DELIVERING);
        order.setModifiedBy(currentUser.getId());
        orderRepository.save(order);
        return null;
    }


    public String complete(Long orderId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "Current user does not have permission to do this action!";

        Restaurant restaurant = getRestaurantByOrderId(orderId);
        if (restaurant == null)
            return "Order [id=%d] is not valid!";

        List<User> owners = userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId()));
        if (owners == null || owners.stream().noneMatch(owner -> owner.getId().equals(currentUser.getId())))
            return "Current user does not have permission to do this action!";

        if (!orderRepository.existsById(orderId))
            return "Order [id=%d] does not exist!".formatted(orderId);

        Order order = getById(orderId);
        if (order.getOrderStatus() != OrderStatus.DELIVERING)
            return "Cannot change order status from [%s] to [COMPLETED]!".formatted(order.getOrderStatus());

        order.setOrderStatus(OrderStatus.COMPLETED);
        order.setModifiedBy(currentUser.getId());
        orderRepository.save(order);
        return null;
    }

    public String abort(Long orderId) {
        User currentUser = userService.getCurrentUser();
        if (currentUser == null)
            return "Current user does not have permission to do this action!";

        Restaurant restaurant = getRestaurantByOrderId(orderId);
        if (restaurant == null)
            return "Order [id=%d] is not valid!";

        List<User> owners = userService.getAllOwnersByRestaurantIds(List.of(restaurant.getId()));
        if (owners == null || owners.stream().noneMatch(owner -> owner.getId().equals(currentUser.getId())))
            return "Current user does not have permission to do this action!";

        if (!orderRepository.existsById(orderId))
            return "Order [id=%d] does not exist!".formatted(orderId);

        Order order = getById(orderId);
        if (order.getOrderStatus() == OrderStatus.DELIVERING)
            return "Cannot change order status from [%s] to [ABORTED]!".formatted(order.getOrderStatus());

        order.setOrderStatus(OrderStatus.ABORTED);
        order.setModifiedBy(currentUser.getId());
        orderRepository.save(order);
        return null;
    }
}
