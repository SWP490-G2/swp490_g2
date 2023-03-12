-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: hrms_swp490_g2_db
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `addressId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `detailsAddress` varchar(255) NOT NULL,
  `cityId` bigint NOT NULL,
  PRIMARY KEY (`addressId`),
  KEY `FKbk7wvvrs5c6elfhk2qx9r37f3` (`cityId`),
  CONSTRAINT `FKbk7wvvrs5c6elfhk2qx9r37f3` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `userId` bigint NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FKl2s95d1f68wak2t4a4c4g5vp8` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buyer`
--

DROP TABLE IF EXISTS `buyer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buyer` (
  `userId` bigint NOT NULL,
  `requestingRestaurantId` bigint DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `FK3npde9f6heecvvsimkp4dhhkw` (`requestingRestaurantId`),
  CONSTRAINT `FK3npde9f6heecvvsimkp4dhhkw` FOREIGN KEY (`requestingRestaurantId`) REFERENCES `restaurant` (`restaurantId`),
  CONSTRAINT `FKdrfkn2awb9njy1rwixwfcmj6` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buyer`
--

LOCK TABLES `buyer` WRITE;
/*!40000 ALTER TABLE `buyer` DISABLE KEYS */;
INSERT INTO `buyer` VALUES (1,1);
/*!40000 ALTER TABLE `buyer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `cityId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `cityName` varchar(255) NOT NULL,
  PRIMARY KEY (`cityId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `districtId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `districtName` varchar(255) NOT NULL,
  `cityId` bigint NOT NULL,
  PRIMARY KEY (`districtId`),
  KEY `FK8flf570phur7x7m8pnuawm6cd` (`cityId`),
  CONSTRAINT `FK8flf570phur7x7m8pnuawm6cd` FOREIGN KEY (`cityId`) REFERENCES `city` (`cityId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file`
--

DROP TABLE IF EXISTS `file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file` (
  `fileId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `filePath` varchar(255) NOT NULL,
  PRIMARY KEY (`fileId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file`
--

LOCK TABLES `file` WRITE;
/*!40000 ALTER TABLE `file` DISABLE KEYS */;
INSERT INTO `file` VALUES (1,'2023-03-09 15:42:23',1,'2023-03-09 15:42:23',1,'uploads\\restaurant\\avatar\\file_1678376543430.jpg'),(2,'2023-03-09 15:42:31',1,'2023-03-09 15:42:31',1,'uploads\\restaurant\\avatar\\file_1678376551313.png'),(3,'2023-03-12 04:26:32',1,'2023-03-12 04:26:32',1,'uploads\\restaurant\\avatar\\file_1678595192074.jpg'),(4,'2023-03-12 04:40:22',1,'2023-03-12 04:40:22',1,'uploads\\restaurant\\avatar\\file_1678596022748.jpg');
/*!40000 ALTER TABLE `file` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `productId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `productName` varchar(255) NOT NULL,
  `restaurantId` bigint NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`productId`),
  KEY `FKo1qxdvtbd6e5le3feiwd855wt` (`restaurantId`),
  CONSTRAINT `FKo1qxdvtbd6e5le3feiwd855wt` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`restaurantId`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'2023-03-11 10:08:22',NULL,'2023-03-12 03:32:26',NULL,'Cơm gà',1,50000),(2,'2023-03-11 10:08:22',NULL,'2023-03-12 03:32:26',NULL,'Phở',1,60000),(3,'2023-03-11 10:16:13',NULL,'2023-03-12 03:32:26',NULL,'Trà sữa',1,30000),(4,'2023-03-11 10:16:13',NULL,'2023-03-12 03:32:26',NULL,'Nước suối',1,5000),(5,'2023-03-12 03:32:26',NULL,'2023-03-12 03:32:26',NULL,'Bún tôm',1,55000),(6,'2023-03-12 03:32:26',NULL,'2023-03-12 03:32:26',NULL,'Bún bò Huế',1,80000),(7,'2023-03-12 03:32:26',NULL,'2023-03-12 03:32:26',NULL,'Cơm rang',1,30000),(8,'2023-03-12 03:33:49',NULL,'2023-03-12 03:33:49',NULL,'Rau cải luộc',1,15000),(9,'2023-03-12 03:33:49',NULL,'2023-03-12 03:33:49',NULL,'Sá sùng nướng',1,150000),(10,'2023-03-12 03:33:49',NULL,'2023-03-12 03:33:49',NULL,'Sinh tố bơ',1,80000),(11,'2023-03-12 03:33:49',NULL,'2023-03-12 03:33:49',NULL,'Nước cam',1,50000),(12,'2023-03-12 04:41:25',NULL,'2023-03-12 04:41:25',NULL,'Spaghetti',2,10000),(13,'2023-03-12 04:45:25',NULL,'2023-03-12 04:45:25',NULL,'Pizza',2,200000),(14,'2023-03-12 04:45:25',NULL,'2023-03-12 04:45:25',NULL,'Wine',2,95000),(15,'2023-03-12 09:14:26',NULL,'2023-03-12 09:14:26',NULL,'Risotto',2,150000),(16,'2023-03-12 09:14:26',NULL,'2023-03-12 09:14:26',NULL,'Coca cola',2,10000),(17,'2023-03-12 09:14:26',NULL,'2023-03-12 09:14:26',NULL,'Cocktail',2,60000);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product__product_category`
--

DROP TABLE IF EXISTS `product__product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product__product_category` (
  `productId` bigint NOT NULL,
  `productCategoryId` bigint NOT NULL,
  PRIMARY KEY (`productId`,`productCategoryId`),
  KEY `FKg2htls2eibxba378rfj1fanjx` (`productCategoryId`),
  CONSTRAINT `FKg2htls2eibxba378rfj1fanjx` FOREIGN KEY (`productCategoryId`) REFERENCES `product_category` (`productCategoryId`),
  CONSTRAINT `FKr6xfkk4hf8fut1rr3nokv1i1y` FOREIGN KEY (`productId`) REFERENCES `product` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product__product_category`
--

LOCK TABLES `product__product_category` WRITE;
/*!40000 ALTER TABLE `product__product_category` DISABLE KEYS */;
INSERT INTO `product__product_category` VALUES (1,1),(2,1),(5,1),(6,1),(7,1),(8,1),(9,1),(3,2),(4,2),(10,2),(11,2),(12,3),(13,3),(14,4);
/*!40000 ALTER TABLE `product__product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `productCategoryId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `productCategoryName` varchar(255) NOT NULL,
  PRIMARY KEY (`productCategoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'2023-03-11 10:17:29',NULL,'2023-03-11 10:17:29',NULL,'Main course'),(2,'2023-03-11 10:17:29',NULL,'2023-03-11 10:17:29',NULL,'Drinks'),(3,'2023-03-12 04:42:03',NULL,'2023-03-12 04:42:03',NULL,'Italian'),(4,'2023-03-12 04:46:35',NULL,'2023-03-12 04:46:35',NULL,'Drinks'),(5,'2023-03-12 04:46:35',NULL,'2023-03-12 04:46:35',NULL,'French');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `restaurantId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `restaurantName` varchar(255) NOT NULL,
  `avatarFile_fileId` bigint DEFAULT NULL,
  PRIMARY KEY (`restaurantId`),
  KEY `FKsvru2rsksoacg9rjvk971xewx` (`avatarFile_fileId`),
  CONSTRAINT `FKsvru2rsksoacg9rjvk971xewx` FOREIGN KEY (`avatarFile_fileId`) REFERENCES `file` (`fileId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'2023-03-09 15:41:35',NULL,'2023-03-12 04:26:32',NULL,0,'Long 1 Restaurant',3),(2,'2023-03-12 04:39:47',NULL,'2023-03-12 04:40:22',NULL,0,'Pho Co',4);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller`
--

DROP TABLE IF EXISTS `seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller` (
  `userId` bigint NOT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `FKrasydwm4jogqk5h4wy2if2is3` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller`
--

LOCK TABLES `seller` WRITE;
/*!40000 ALTER TABLE `seller` DISABLE KEYS */;
/*!40000 ALTER TABLE `seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seller__restaurant`
--

DROP TABLE IF EXISTS `seller__restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seller__restaurant` (
  `userId` bigint NOT NULL,
  `restaurantId` bigint NOT NULL,
  PRIMARY KEY (`userId`,`restaurantId`),
  KEY `FK24ppl3fhgtptrsxkh9ki1j98i` (`restaurantId`),
  CONSTRAINT `FK24ppl3fhgtptrsxkh9ki1j98i` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`restaurantId`),
  CONSTRAINT `FKbjqm8phgn8dih8qap9hj7r5o7` FOREIGN KEY (`userId`) REFERENCES `seller` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seller__restaurant`
--

LOCK TABLES `seller__restaurant` WRITE;
/*!40000 ALTER TABLE `seller__restaurant` DISABLE KEYS */;
/*!40000 ALTER TABLE `seller__restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token` (
  `tokenId` bigint NOT NULL AUTO_INCREMENT,
  `expired` bit(1) NOT NULL,
  `revoked` bit(1) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `tokenType` varchar(255) DEFAULT NULL,
  `userId` bigint DEFAULT NULL,
  PRIMARY KEY (`tokenId`),
  UNIQUE KEY `UK_pddrhgwxnms2aceeku9s2ewy5` (`token`),
  KEY `FKljiaxlt4bg9emxw74wog1awjl` (`userId`),
  CONSTRAINT `FKljiaxlt4bg9emxw74wog1awjl` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES (1,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2NzgzNzYyMjEsImV4cCI6MTY3ODQ2MjYyMX0.Pst7jCAK4zx1NNuH40BxjKZTAcc-WhA6RlbG_sn6y28','BEARER',1),(2,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2NzgzNzYyMzIsImV4cCI6MTY3ODQ2MjYzMn0.Vh5RsaPFu0jF1Nq9AxoIuzFBC0QlPkmoBLkvhp-9lnY','BEARER',1),(3,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg0MzM0NzcsImV4cCI6MTY3ODUxOTg3N30.7okwi5T4ux9bmANaZfboGDpJ8gPjolZPpb_H8ve1nik','BEARER',1),(4,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg0MzM1MTksImV4cCI6MTY3ODUxOTkxOX0.frvFWO1tOusY0_vDzd1yzXpiyMR-Dc7YQbtLKeldyJc','BEARER',1),(5,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg0MzM1NTQsImV4cCI6MTY3ODUxOTk1NH0.hF9yV4aKKhgwZWJVMIhBvprOo8VRGvGKT-P6fHApIkM','BEARER',1),(6,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg0MzM2MjQsImV4cCI6MTY3ODUyMDAyNH0.bXc5D4v_Uk2jEHTAvIe-ymd1rYvsPwAFwgC7_pxaWNs','BEARER',1),(7,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMkBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDUwNDEsImV4cCI6MTY3ODU5MTQ0MX0.Vga_yCGkBjvsN6HtZMSgDVQIGM-1B-icqxkYu6dpZCU','BEARER',2),(8,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDUwOTUsImV4cCI6MTY3ODU5MTQ5NX0.3v8LlhRQEayknroXMB_WTKBgZz7PY_Zcu50auI74y1o','BEARER',1),(9,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDU2MDQsImV4cCI6MTY3ODU5MjAwNH0.HVnBPz5fo6mn8cx9Xj3ZmL8O_5urOpybDSaZIwGAQLo','BEARER',1),(10,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDU2NDQsImV4cCI6MTY3ODU5MjA0NH0.7Vb_I92JGLLQIT47ltjHUd20OExSew1oFzOCqosbaaE','BEARER',1),(11,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDU2OTgsImV4cCI6MTY3ODU5MjA5OH0.i7VngkC7V4H6TCB4cfGyQUYuxricys0Rongl6WtbFeg','BEARER',1),(12,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDU3NjYsImV4cCI6MTY3ODU5MjE2Nn0.cIIWRPiZOESbQsqiHmgyHoL-VAJDy2l63VmPBYHT4gQ','BEARER',1),(13,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDYxNjYsImV4cCI6MTY3ODU5MjU2Nn0.2Bh5Ba5-LP7QACX4aPKs5WtgXvFZOh5l7z7dHl1VZuI','BEARER',1),(14,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDY0MjEsImV4cCI6MTY3ODU5MjgyMX0.47D_t0Z8GkTJ3Hs94y5tb624SyCt365NKDEnqnfpFDk','BEARER',1),(15,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDY0NDMsImV4cCI6MTY3ODU5Mjg0M30.u1csWv3oGucg4dPDoi5ZYEd3-EundJdiwqcMAOKideQ','BEARER',1),(16,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1MDY0NTIsImV4cCI6MTY3ODU5Mjg1Mn0.bnBDKgfFlmoc3G5IwqxKvTWCcgxXGbZz2SimFkxA4uU','BEARER',1),(17,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NDY0ODIsImV4cCI6MTY3ODYzMjg4Mn0.F8B4Wt8CIRW1OfHmo8P1PD4jFBi3dKQYNIVFzBIOKyQ','BEARER',1),(18,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NDk2OTUsImV4cCI6MTY3ODYzNjA5NX0._ntn4TOoGGB958SySWN4Xpo4ZtSngM8Sbu6s2NMzr4Q','BEARER',1),(19,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NTA5MTUsImV4cCI6MTY3ODYzNzMxNX0.0SwqX1tV3tOSQfkvvaVnh6kBrx6oMNN7IkjclruxQx8','BEARER',1),(20,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NTE4ODUsImV4cCI6MTY3ODYzODI4NX0.JZSWGJJgRUcpLK42gj7SnFaS-L_Afdkgft0RgG7nrxI','BEARER',1),(21,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NTM3NzEsImV4cCI6MTY3ODY0MDE3MX0.zq2pfPo582ORTTUHIKoK24UlBgc6MNyxyDvdtzpUagM','BEARER',1),(22,_binary '',_binary '','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1NTU3MzcsImV4cCI6MTY3ODY0MjEzN30.DDuUxJ1FqNpy5blukwxyCz7vMFEVubKx8-tmSVkUI2U','BEARER',1),(23,_binary '\0',_binary '\0','eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsb25nMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzg1OTUxNjUsImV4cCI6MTY3ODY4MTU2NX0.hAoG4pInu1pvCM9Mkz4Qk1OdoR4doRunPFBoiWP-eBM','BEARER',1);
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `verificationCode` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UK_jolnwy9lwp82aoyavymxpolhl` (`phoneNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2023-03-09 15:37:01',NULL,'2023-03-11 03:47:23',NULL,'long1@gmail.com',1,'$2a$10$MF3CJgZilXEQzIPZHqxa6.vbY2ezhAffNI1LJ30qn6gcQy/23YQku','0329449539','BUYER','790574'),(2,'2023-03-11 03:24:01',NULL,'2023-03-11 03:24:01',NULL,'long2@gmail.com',0,'$2a$10$1tCdfuLCfb6XaZjq6I75L.QyV5v12CTdp1imoVd5GDIA0rbfo7Yui','0329449532','USER','214745');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ward`
--

DROP TABLE IF EXISTS `ward`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ward` (
  `wardId` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdBy` bigint DEFAULT NULL,
  `modifiedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `modifiedBy` bigint DEFAULT NULL,
  `wardName` varchar(255) NOT NULL,
  `districtId` bigint NOT NULL,
  PRIMARY KEY (`wardId`),
  KEY `FKpn3v3ay88t229p9i89a3ygobp` (`districtId`),
  CONSTRAINT `FKpn3v3ay88t229p9i89a3ygobp` FOREIGN KEY (`districtId`) REFERENCES `district` (`districtId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ward`
--

LOCK TABLES `ward` WRITE;
/*!40000 ALTER TABLE `ward` DISABLE KEYS */;
/*!40000 ALTER TABLE `ward` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-12 19:10:26
