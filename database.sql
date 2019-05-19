-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: Wypozyczalnia
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Cars`
--

DROP TABLE IF EXISTS `Cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Cars` (
  `carID` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `imageID` int(10) NOT NULL,
  `price` float NOT NULL,
  `description` varchar(1024) NOT NULL,
  `avalible` tinyint(1) DEFAULT NULL,
  `exists` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`carID`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,'Fiat 126p - Czerwony','S',1,0.3,'pusty opis',NULL,1),(2,'Fiat 126p - Zielony','S',2,0.3,'pusty opis',1,1),(3,'Fiat Cinquecento','S',3,0.3,'pusty opis',NULL,1),(4,'Fiat Cinquecento - Czerwony','S',6,0.3,'pusty opis',1,1),(5,'Fiat Seicento','S',5,0.3,'pusty opis',NULL,1),(6,'Fiat Punto','S',4,0.4,'pusty opis',NULL,1),(7,'Daewoo Matiz','S',7,0.4,'pusty opis',NULL,1),(8,'Daewoo Tico','S',8,0.4,'pusty opis',NULL,1),(9,'Volkswagen Golf','S',9,0.4,'pusty opis',NULL,1),(10,'Suzuki Swift','M',1,0.5,'pusty opis',NULL,1),(11,'Polonez Caro','M',2,0.5,'pusty opis',NULL,1),(12,'Volkswagen Passat','M',3,0.2,'pusty opis',1,1),(13,'BMW','M',4,0.5,'pusty opis',1,1),(14,'Renault Laguna','M',5,0.5,'pusty opis',NULL,1),(15,'Fiat Multipla','L',2,0.6,'pusty opis',1,1),(16,'Renault Kangoo','L',3,0.6,'pusty opis',NULL,1),(17,'Citroen Berlingo','L',4,0.6,'pusty opis',NULL,1),(18,'Zuk','XL',1,0.8,'pusty opis',NULL,1),(19,'Daewoo Lublin','XL',2,0.8,'pusty opis',1,1),(20,'Melex','E',1,0.1,'pusty opis',1,1),(21,'Melex Dostawczy','E',2,0.3,'pusty opis',1,1),(22,'Daewoo Tico E','E',3,0.2,'pusty opis',1,1);
/*!40000 ALTER TABLE `Cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reservations`
--

DROP TABLE IF EXISTS `Reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reservations` (
  `reservationID` int(10) NOT NULL AUTO_INCREMENT,
  `userID` int(10) NOT NULL,
  `carID` int(10) NOT NULL,
  `time1` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `time2` timestamp NULL DEFAULT NULL,
  `exists` tinyint(1) NOT NULL,
  PRIMARY KEY (`reservationID`),
  KEY `userID` (`userID`),
  KEY `carID` (`carID`),
  CONSTRAINT `Reservations_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userID`),
  CONSTRAINT `Reservations_ibfk_2` FOREIGN KEY (`carID`) REFERENCES `Cars` (`carID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `userID` int(10) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `exists` tinyint(1) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `token` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-19 16:21:01
