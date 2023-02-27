CREATE DATABASE `SWP490`;

CREATE TABLE `city` (
	`city_id` INT AUTO_INCREMENT PRIMARY KEY,
    `city_name` NVARCHAR(150)
);

CREATE TABLE `district` (
	`district_id` INT AUTO_INCREMENT PRIMARY KEY,
    `district_name` NVARCHAR(150)
);

CREATE TABLE `ward` (
	`ward_id` INT AUTO_INCREMENT PRIMARY KEY,
    `ward_name` NVARCHAR(150)
);

CREATE TABLE `address` (
	`address_id` INT AUTO_INCREMENT,
    `city_id` INT,
    `district_id` INT,
    `ward_id` INT,
    `address_detail` NVARCHAR(150),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (address_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id),
    FOREIGN KEY (district_id) REFERENCES district(district_id),
    FOREIGN KEY (ward_id) REFERENCES ward(ward_id)
);

CREATE TABLE `role` (
	`role_id` INT AUTO_INCREMENT PRIMARY KEY,
    `role_name` NVARCHAR(150)
);

CREATE TABLE `user` (
	`user_id` INT AUTO_INCREMENT,
    `email` NVARCHAR(150),
    `password` NVARCHAR(150),
    `address_id` INT,
    `first_name` NVARCHAR(150),
    `middle_name` NVARCHAR(150),
    `last_name` NVARCHAR(150),
    `phone_number` NVARCHAR(150),
    `avatar` NVARCHAR(150),
    `google_id` NVARCHAR(150),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (user_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE `user_role` (
	`id` INT AUTO_INCREMENT,
    `user_id` INT,
    `role_id` INT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (role_id) REFERENCES role(role_id)
);

CREATE TABLE `admin` (
	`admin_id` INT AUTO_INCREMENT,
    `is_actived` BIT,
    PRIMARY KEY (admin_id)
);

CREATE TABLE `staff` (
	`staff_id` INT AUTO_INCREMENT,
    `is_actived` BIT,
    PRIMARY KEY (staff_id)
);

CREATE TABLE `seller` (
	`seller_id` INT AUTO_INCREMENT,
    `is_actived` BIT,
    `is_banned` BIT,
    PRIMARY KEY (seller_id)
);

CREATE TABLE `buyer` (
	`buyer_id` INT AUTO_INCREMENT,
    `is_actived` BIT,
    `is_banned` BIT,
    PRIMARY KEY (buyer_id)
);

CREATE TABLE `restaurant` (
	`restaurant_id` INT AUTO_INCREMENT,
    `address_id` INT,
    `restaurant_name` NVARCHAR(150),
    `avatar` NVARCHAR(150),
    `cover` NVARCHAR(150),
    `description` NVARCHAR(450),
    `phone_number` NVARCHAR(150),
    `is_banned` BIT,
    `is_opening` BIT,
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (restaurant_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id)
);

CREATE TABLE `restaurant_history` (
	`restaurant_history_id` INT AUTO_INCREMENT,
    `restaurant_id` INT,
    `description` NVARCHAR(350),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (restaurant_history_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE `owner_restaurant` (
	`id` INT AUTO_INCREMENT,
    `owner_id` INT,
    `restaurant_id` INT,
    PRIMARY KEY (id),
    FOREIGN KEY (owner_id) REFERENCES user(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE `category` (
	`category_id` INT AUTO_INCREMENT,
    `category_name` NVARCHAR(150),
    `description` NVARCHAR(350),
    PRIMARY KEY (category_id)
);

CREATE TABLE `item_status` (
	`status_id` INT AUTO_INCREMENT,
    `status_name` NVARCHAR(150),
    PRIMARY KEY (status_id)
);

CREATE TABLE `item` (
	`item_id` INT AUTO_INCREMENT,
    `item_name` NVARCHAR(150),
    `category_id` INT,
    `restaurant_id` INT,
    `price` FLOAT,
    `quantity` INT,
    `description` NVARCHAR(450),
    `item_image` NVARCHAR(150),
    `status_id` INT,
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (item_id),
    FOREIGN KEY (category_id) REFERENCES category(category_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (status_id) REFERENCES item_status(status_id)
);

CREATE TABLE `payment` (
	`payment_id` INT AUTO_INCREMENT,
    `payment_name` NVARCHAR(150),
    `description` NVARCHAR(350),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (payment_id)
);

CREATE TABLE `order_status` (
	`status_id` INT AUTO_INCREMENT,
    `status_name` NVARCHAR(150),
    PRIMARY KEY (status_id)
);

CREATE TABLE `order` (
	`order_id` INT AUTO_INCREMENT,
    `rate` INT,
    `comment` NVARCHAR(350),
    `note` NVARCHAR(150),
    `address_id` INT,
    `payment_id` INT,
    `user_id` INT,
    `status_id` INT,
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (order_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id),
    FOREIGN KEY (payment_id) REFERENCES payment(payment_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (status_id) REFERENCES order_status(status_id)
);

CREATE TABLE `order_lines` (
	`id` INT AUTO_INCREMENT,
    `item_id` INT,
    `order_id` INT,
    `price` FLOAT,
    `quantity` INT,
    `note` NVARCHAR(150),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES item(item_id),
    FOREIGN KEY (order_id) REFERENCES `order`(order_id)
);

CREATE TABLE `certificate_authority` (
	`certificate_authority_id` INT AUTO_INCREMENT,
    `certificate_authority_name` NVARCHAR(150),
    PRIMARY KEY (certificate_authority_id)
);

CREATE TABLE `certificate` (
	`certificate_id` INT AUTO_INCREMENT,
    `certificate_name` NVARCHAR(150),
    `certificate_authority_id` INT,
    PRIMARY KEY (certificate_id),
    FOREIGN KEY (certificate_authority_id) REFERENCES certificate_authority(certificate_authority_id)
);

CREATE TABLE `restaurant_certificate` (
	`id` INT AUTO_INCREMENT,
    `restaurant_id` INT,
    `certificate_id` INT,
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (certificate_id) REFERENCES certificate(certificate_id)
);

CREATE TABLE `promotion` (
	`promotion_id` INT AUTO_INCREMENT,
    `promotion_name` NVARCHAR(150),
    `description` NVARCHAR(350),
    `created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (promotion_id)
);

CREATE TABLE `promotion_owner_restaurant` (
	`id` INT AUTO_INCREMENT,
    `promotion_id` INT,
    `restaurant_id` INT,
    `owner_id` INT,
	`created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);

CREATE TABLE `notification` (
	`notification_id` INT AUTO_INCREMENT,
    `user_id` INT,
    `title` NVARCHAR(150),
    `description` NVARCHAR(450),
    `is_read` BIT,
	`created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (notification_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE `reviews` (
	`review_id` INT AUTO_INCREMENT,
    `user_id` INT,
    `restaurant_id` INT,
    `rate` INT,
    `comment` NVARCHAR(450),
	`created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id)
);

CREATE TABLE `restaurant_opening_request` (
	`opening_request_id` INT AUTO_INCREMENT,
    `restaurant_name` NVARCHAR(150),
    `description` NVARCHAR(450),
    `phone_number` NVARCHAR(150),
    `address_id` INT,
    `owner_id` INT,
    `note` NVARCHAR(250),
    `admin_message` NVARCHAR(350),
    `status` INT,
	`created_at` DATETIME,
    `modified_at` DATETIME,
    PRIMARY KEY (opening_request_id),
    FOREIGN KEY (address_id) REFERENCES address(address_id),
    FOREIGN KEY (owner_id) REFERENCES user(user_id)
);