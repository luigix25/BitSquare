-- Progettazione Web 
DROP DATABASE if exists my_luigix25; 
CREATE DATABASE my_luigix25; 
USE my_luigix25; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: my_luigix25
-- ------------------------------------------------------
-- Server version	5.6.20

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
-- Table structure for table `amici`
--

DROP TABLE IF EXISTS `amici`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `amici` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utente1` int(11) NOT NULL,
  `utente2` int(11) NOT NULL,
  `data` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `accettata` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `utente1` (`utente1`,`utente2`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `amici`
--

LOCK TABLES `amici` WRITE;
/*!40000 ALTER TABLE `amici` DISABLE KEYS */;
INSERT INTO `amici` VALUES (9,2,4,'2016-02-12 22:32:31','2016-02-12'),(19,2,1,'2016-02-15 13:47:43','2016-02-15'),(39,4,1,'2016-02-18 15:17:08','2016-02-18'),(41,1,3,'2016-02-18 19:17:54','2016-02-18'),(42,14,1,'2016-02-18 19:25:47',NULL);
/*!40000 ALTER TABLE `amici` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commenti`
--

DROP TABLE IF EXISTS `commenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utente` int(11) NOT NULL,
  `id_notizia` int(11) NOT NULL,
  `testo` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commenti`
--

LOCK TABLES `commenti` WRITE;
/*!40000 ALTER TABLE `commenti` DISABLE KEYS */;
INSERT INTO `commenti` VALUES (1,2,1,'Ciao gigi :D','2016-02-18 19:20:15'),(2,1,6,'che ti Ã¨ successo?!','2016-02-18 19:20:40'),(3,2,6,'lasciamo stare che Ã¨ meglio..','2016-02-18 19:22:32'),(4,1,6,'ok.. :(','2016-02-18 19:22:42'),(5,1,7,'rosa?! ma no!!','2016-02-18 19:28:09'),(6,4,15,'presto!!!!!!!','2016-02-18 19:31:20'),(7,3,15,'ha ragione sara','2016-02-18 19:41:10'),(8,3,11,'Evvai!','2016-02-18 19:41:39'),(10,1,11,'non ne potevo piÃ¹!','2016-02-18 19:42:11'),(11,1,15,'altri 4 mesiii','2016-02-18 19:43:23'),(12,1,13,'beata te','2016-02-18 20:29:35');
/*!40000 ALTER TABLE `commenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `notifiche_commenti` AFTER INSERT ON `commenti` FOR EACH ROW begin

declare idd integer;

select id_utente into idd from my_luigix25.notizie where id = new.id_notizia; 

IF(new.id_utente <> idd) then
	insert into my_luigix25.notifiche (id_utente,id_post,tipo,id_destinatario) values (new.id_utente,new.id_notizia,'comme',idd);

end if;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `like`
--

DROP TABLE IF EXISTS `like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_post` int(11) NOT NULL,
  `id_utente` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_post` (`id_post`,`id_utente`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `like`
--

LOCK TABLES `like` WRITE;
/*!40000 ALTER TABLE `like` DISABLE KEYS */;
INSERT INTO `like` VALUES (2,1,2),(1,2,1),(5,4,4),(3,6,1),(4,7,2),(6,8,4),(8,11,3),(9,13,1),(7,15,4);
/*!40000 ALTER TABLE `like` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trigger_like` AFTER INSERT ON `like` FOR EACH ROW begin
declare idd integer; 

select id_utente into idd 
from my_luigix25.notizie 
where id = new.id_post; 

IF(new.id_utente <> idd) then 
insert into my_luigix25.notifiche (id_utente,id_post,tipo,id_destinatario) values (new.id_utente,new.id_post,'like',idd); 
end if; 
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `messaggi`
--

DROP TABLE IF EXISTS `messaggi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messaggi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mittente` int(11) NOT NULL,
  `destinatario` int(11) NOT NULL,
  `contenuto` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visualizzato` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messaggi`
--

LOCK TABLES `messaggi` WRITE;
/*!40000 ALTER TABLE `messaggi` DISABLE KEYS */;
INSERT INTO `messaggi` VALUES (1,1,2,'Ciao Davide','2016-02-16 01:48:41','2016-02-18 19:44:52'),(2,2,1,'Ciao Luigi','2016-02-16 01:48:49','2016-02-18 19:28:20'),(3,2,1,'come stai?','2016-02-16 01:48:52','2016-02-18 19:28:20'),(4,1,2,'bene dai, tu?','2016-02-16 01:49:00','2016-02-18 19:44:52'),(5,2,1,'non c\'Ã¨ male dai','2016-02-16 01:49:24','2016-02-18 19:28:20'),(6,3,1,'Oi','2016-02-16 02:04:05','2016-02-18 19:28:30'),(7,3,1,'Ci sei?','2016-02-16 02:04:12','2016-02-18 19:28:30'),(8,1,3,'si scusa, studiavo','2016-02-16 02:05:24','2016-02-18 19:41:03'),(9,1,3,'dimmi tutto','2016-02-16 02:05:30','2016-02-18 19:41:03'),(10,1,3,':)','2016-02-16 02:05:43','2016-02-18 19:41:03'),(11,3,1,'no niente, mi serviva una mano con Fisica','2016-02-16 02:06:06','2016-02-18 19:28:30'),(12,3,1,'sul rotolamento','2016-02-16 02:06:37','2016-02-18 19:28:30'),(23,1,3,'nooo il rotolamento no!','2016-02-16 02:21:32','2016-02-18 19:41:03'),(24,2,1,'cocco bello cocco fresco','2016-02-16 11:42:59','2016-02-18 19:28:20'),(25,1,2,'wewe','2016-02-16 11:43:08','2016-02-18 19:44:52'),(26,2,1,'come stai luigi?','2016-02-16 11:43:28','2016-02-18 19:28:20'),(27,1,2,'io sto bene, grazie','2016-02-16 11:43:34','2016-02-18 19:44:52'),(28,2,1,'wewe','2016-02-18 00:32:15','2016-02-18 19:28:20'),(29,1,2,'ciao bello!','2016-02-18 00:56:53','2016-02-18 19:44:52'),(30,1,4,'Sara!','2016-02-18 01:55:58','2016-02-18 15:17:36'),(31,4,1,'Luigi!','2016-02-18 15:17:21','2016-02-18 19:28:23'),(32,1,4,'Ciao!','2016-02-18 15:17:32','2016-02-18 15:17:36'),(33,1,2,'oi','2016-02-18 18:44:01','2016-02-18 19:44:52'),(34,3,1,'daiiiii che sei bravissimo in fisica','2016-02-18 19:40:21',NULL),(35,2,1,'we Gigi','2016-02-18 19:44:34',NULL),(36,2,1,'ma quand\'Ã¨ che fai l\'esame?!','2016-02-18 19:44:40',NULL),(37,2,1,'mi raccomando fammi sapere <.<','2016-02-18 19:44:48',NULL);
/*!40000 ALTER TABLE `messaggi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifiche`
--

DROP TABLE IF EXISTS `notifiche`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifiche` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utente` int(11) NOT NULL,
  `id_post` int(11) DEFAULT NULL,
  `id_destinatario` int(11) DEFAULT NULL,
  `tipo` varchar(5) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `visualizzato` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifiche`
--

LOCK TABLES `notifiche` WRITE;
/*!40000 ALTER TABLE `notifiche` DISABLE KEYS */;
INSERT INTO `notifiche` VALUES (1,1,2,3,'p_bac','2016-02-18 19:13:53','2016-02-18 19:44:19'),(3,3,NULL,1,'amici','2016-02-18 19:17:59','2016-02-18 22:26:43'),(4,3,3,1,'p_bac','2016-02-18 19:18:18','2016-02-18 22:26:43'),(6,2,1,1,'like','2016-02-18 19:20:09','2016-02-18 22:26:43'),(7,2,1,1,'comme','2016-02-18 19:20:15','2016-02-18 22:26:43'),(8,1,6,2,'comme','2016-02-18 19:20:40','2016-02-18 21:21:00'),(9,1,6,2,'comme','2016-02-18 19:22:42','2016-02-18 21:21:00'),(10,1,6,2,'like','2016-02-18 19:22:45','2016-02-18 21:21:00'),(11,2,7,4,'like','2016-02-18 19:23:24','2016-02-18 19:39:58'),(12,4,4,3,'like','2016-02-18 19:23:45','2016-02-18 19:44:19'),(13,4,8,1,'p_bac','2016-02-18 19:23:57','2016-02-18 22:26:43'),(14,1,7,4,'comme','2016-02-18 19:28:09','2016-02-18 19:39:58'),(15,4,15,1,'like','2016-02-18 19:31:13','2016-02-18 22:26:43'),(16,4,15,1,'comme','2016-02-18 19:31:20','2016-02-18 22:26:43'),(17,3,15,1,'comme','2016-02-18 19:41:10','2016-02-18 22:26:43'),(18,3,11,1,'comme','2016-02-18 19:41:39','2016-02-18 22:26:43'),(19,3,11,1,'comme','2016-02-18 19:41:40','2016-02-18 22:26:43'),(20,3,11,1,'like','2016-02-18 19:44:11','2016-02-18 22:26:43'),(21,1,13,4,'like','2016-02-18 20:29:32',NULL),(22,1,13,4,'comme','2016-02-18 20:29:35',NULL);
/*!40000 ALTER TABLE `notifiche` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notizie`
--

DROP TABLE IF EXISTS `notizie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notizie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_utente` int(11) NOT NULL,
  `id_bacheca` int(11) DEFAULT NULL,
  `contenuto` text NOT NULL,
  `link` text,
  `tipo` varchar(10) NOT NULL DEFAULT 'testo',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notizie`
--

LOCK TABLES `notizie` WRITE;
/*!40000 ALTER TABLE `notizie` DISABLE KEYS */;
INSERT INTO `notizie` VALUES (1,1,NULL,'Ciao Mondo',NULL,'testo','2016-02-18 19:13:35'),(2,1,3,'Sipannnn benvenuto su BitSquare!',NULL,'testo','2016-02-18 19:13:53'),(3,3,1,'Gigiiiiiii',NULL,'testo','2016-02-18 19:18:18'),(4,3,1,'come staiii?',NULL,'testo','2016-02-18 19:18:39'),(5,2,NULL,'We belliii',NULL,'testo','2016-02-18 19:19:59'),(6,2,NULL,'Che giornataccia oggi uff :-(',NULL,'testo','2016-02-18 19:20:32'),(7,4,NULL,'Ci avrei messo piÃ¹ rosa in questo sito!!!',NULL,'testo','2016-02-18 19:23:10'),(8,4,1,'Che bel sito che hai fatto',NULL,'testo','2016-02-18 19:23:57'),(9,14,NULL,'Che vitaccia questi esamiiiiii',NULL,'testo','2016-02-18 19:26:25'),(10,14,NULL,'Evvivaaaaaa finalmente Analisi 2!!!!!! ',NULL,'testo','2016-02-18 19:29:01'),(11,1,NULL,'E anche un altro Ã¨ andato.. Fondamenti 2 addio :-D',NULL,'testo','2016-02-18 19:29:22'),(13,4,NULL,'Bellissima giornata sotto il piumone :)',NULL,'testo','2016-02-18 19:29:59'),(14,4,NULL,'e di pioggia...',NULL,'testo','2016-02-18 19:30:44'),(15,1,NULL,'ma quando arriva l\'estate?!',NULL,'testo','2016-02-18 19:30:56');
/*!40000 ALTER TABLE `notizie` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 trigger trigger_notifiche after insert on my_luigix25.notizie 
for each row
begin

IF(new.id_bacheca is not null) then
	insert into my_luigix25.notifiche (id_utente,id_post,id_destinatario,tipo) values (new.id_utente,new.id,new.id_bacheca,'p_bac');

end if;

end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `d_nascita` date NOT NULL,
  `sesso` char(1) NOT NULL,
  `password` varchar(50) NOT NULL,
  `foto` text NOT NULL,
  `citta` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES (1,'luigi@leonardi.it','Luigi','Leonardi','1995-10-01','M','6e6bc4e49dd477ebc98ef4046c067b5f','1.jpg','Catanzaro'),(2,'davide@coccomini.it','Davide','Coccomini','1995-07-05','M','6e6bc4e49dd477ebc98ef4046c067b5f','2.jpg','Gela'),(3,'sipan@ahmed.it','Sipan','Ahmed','2016-02-17','M','6e6bc4e49dd477ebc98ef4046c067b5f','3.jpg','Palermo'),(4,'sara@lotano.it','Sara','Lotano','1995-03-21','F','6e6bc4e49dd477ebc98ef4046c067b5f','0.jpg','Pescopagano'),(14,'giuseppe@romano.it','Giuseppe','Romano','1995-06-13','M','6e6bc4e49dd477ebc98ef4046c067b5f','14.jpg','Caltanissetta');
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-02-18 23:26:44
