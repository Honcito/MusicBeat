CREATE DATABASE  IF NOT EXISTS `music_beat_v1` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci */;
USE `music_beat`;
-- MySQL dump 10.13  Distrib 8.0.37, for Win64 (x86_64)
--
-- Host: localhost    Database: music_database_v8
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `id_artista` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `anio_inicio` int(11) DEFAULT NULL,
  `biografia` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id_artista`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
INSERT INTO `artista` VALUES (1,'Jamiroquai',1992,'Jamiroquai es un grupo británico de funk y acid jazz que incluye matices de música disco y sonoridades de electrónica. Fue formado en 1992 por su líder, el cantante Jason \"Jay\" Kay, junto a Toby Smith (teclados), Stuart Zender (bajo), Nick Van Gelder (batería) y Wallis Buchanan (didgeridoo)'),(2,'Björk',1993,'Björk Guðmundsdóttir; Reikiavik, 21 de noviembre de 1965), conocida como Björk, es una cantante, compositora de canciones, multiinstrumentista, actriz, escritora, DJ y productora islandesa. Es reconocida por hacer música experimental, alternativa y vanguardista con la cual ha obtenido gran reconocimiento a nivel internacional, tanto de crítica como de público. Varios de sus álbumes han alcanzado el top 10 en la lista Billboard 200: el más reciente es Fossora (2022). '),(3,'Muse',1994,'Muse es una banda de rock británica formada en 1994, en Teignmouth (Devon). Desde su formación, sus integrantes son: Matt Bellamy (voz, guitarra, piano, teclados), Christopher Wolstenholme (bajo, coros) y Dominic Howard (batería).1'),(4,'The Black Keys',2001,'The Black Keys es un banda de rock estadounidense formada en Akron en 2001 y compuesta por Dan Auerbach y Patrick Carney. El dúo comenzó de forma independiente, grabando música en sótanos y produciendo sus propios álbumes, antes de emerger como una de las bandas más populares de garage rock en la década de 2010'),(5,'Pink Floyd',1965,'Pink Floyd es una banda de rock británica, fundada en Londres en 1965. Considerada un ícono cultural del siglo XX y una de las bandas más influyentes, exitosas y aclamadas en la historia de la música popular, obtuvo gran popularidad dentro del circuito underground gracias a su música psicodélica y espacial, que con el paso del tiempo evolucionó hacia el rock progresivo y el rock sinfónico adquiriendo la popularidad con la que hoy son recordados. '),(6,'Artic Monkeys',2002,'Arctic Monkeys es una banda británica de indie rock, formada en Sheffield, Reino Unido.3​ El grupo está compuesto por el guitarrista principal y vocalista Alex Turner, el guitarrista Jamie Cook, el baterista Matt Helders y el bajista Nick O\'Malley. El bajista original de la banda, Andy Nicholson, dejó el proyecto en 2006 poco después del lanzamiento del álbum debut de la banda. '),(7,'Welshly Arms',2013,'Welshly Arms es una banda estadounidense de blues rock de Cleveland, Ohio, Estados Unidos. La banda ha estado activa desde su debut en 2013 con el EP Welcome. Al año siguiente, lanzaron un EP de covers y, en 2015, un álbum titulado Welshly Arms. La banda escribe, produce y graba todo su material en Cleveland.'),(8,'Blur',1998,'Blur es una banda de rock alternativo británica formada en Londres en 1988. Está formada por el cantante Damon Albarn, el guitarrista Graham Coxon, el bajista Alex James y el baterista Dave Rowntree. Su álbum debut, Leisure (1991), incorporó los sonidos del madchester y el shoegazing. Tras un cambio estilístico influenciado por bandas pop británicas como The Kinks, The Beatles y XTC, Blur lanzó Modern Life Is Rubbish (1993), Parklife (1994) y The Great Escape (1995). Como resultado, la banda ayudó a popularizar el género del britpop y logró una gran fama en el Reino Unido, con la ayuda de una batalla mediática y en las listas de éxitos con la banda rival Oasis en 1995 denominada «La batalla del britpop». '),(9,'The Prodigy',1990,'The Prodigy es un grupo británico de música electrónica, formado por Maxim Reality y Liam Howlett. Keith Flint formó parte de la banda desde 1990 hasta el 4 de marzo de 2019, fecha en la que falleció. Leeroy Thornhill también fue miembro de la banda desde 1990 hasta el año 2000.'),(10,'Los Planetas',1993,'Los Planetas es una banda española de indie rock de la ciudad de Granada, que desarrolla su actividad a partir de 1993, y que sigue activa en la actualidad. Los Planetas recogen la influencia de grupos estadounidenses de guitarras como los Mercury Rev de la primera época o los británicos Spacemen 3 y Joy Division'),(11,'Us3',1991,'Us3 es el nombre de una banda de jazz rap creada por el compositor y productor inglés Geoff Wilkinson. Se trata de una fusión de jazz y hip-hop a partes iguales, con una clara influencia de la sonoridad del R&B y del soul'),(12,'Cafe Tacvba',1989,'Café Tacvba es una banda mexicana de rock alternativo originaria del Estado de México. El grupo se conformó en el año 1989.4​ Además del éxito comercial y de crítica que han logrado, el grupo es reconocido por su proyecto cultural vanguardista el cual mezcla el rock y sus temas habituales con letras, historias y sonidos extraídos de la cultura popular mexicana, esto último gracias al uso en diversas canciones de instrumentos como tololoche y jarana.5​ Entre los principales premios obtenidos a lo largo de su carrera, destacan el Grammy y el Grammy Latino. '),(13,'Rival Sons',2009,'Rival Sons es una banda estadounidense de hard rock proveniente de Long Beach, California, formada en el año 2009 de las cenizas de la banda Black Summer Crush. Está conformada por el cantante Jay Buchanan, el guitarrista Scott Holiday, el bajista Dave Beste y el baterista Michael Miley'),(14,'Iggy Pop',1977,'James Newell Osterberg, Jr., más conocido por su nombre artístico Iggy Pop (Muskegon, Míchigan, 21 de abril de 1947), es un cantante, músico, compositor, actor y locutor de radio estadounidense. Se considera que contribuyó a crear nuevos géneros dentro del rock tales como el punk rock, el post-punk, la new wave, y se lo considera un ícono que ha influido a varios músicos desde el inicio de los años 1970'),(15,'Aterciopelados',1990,'Aterciopelados es una banda emblemática del rock alternativo colombiana, liderada por Andrea Echeverri y Héctor Buitrago. Tuvo su origen en 1990 bajo el nombre de Delia y los Aminoácidos y posteriormente Aterciopelados en 1993'),(16,'Los Fabulosos Cadillacs',1984,'Los Fabulosos Cadillacs es una banda argentina de ska proveniente de Buenos Aires y fundada en 1984. Llevan grabados 16 álbumes y a lo largo de sus distintas eras colaboraron con distintos artistas argentinos e internacionales, obteniendo en el medio un gran reconocimiento crítico y comercial.'),(17,'Ojos de Brujo',1996,'Ojos de Brujo fue una banda formada en Barcelona, España en 1996. Se caracterizaba por la fusión de estilos, buscando los puntos de encuentro entre el flamenco con otros estilos musicales como reggae, hip hop, música latina, rock y distintos estilos de música electrónica.'),(18,'Radiohead',1985,'Radiohead es una banda británica de rock alternativo originaria de Abingdon-on-Thames, Inglaterra, formada en 1985 inicialmente como una banda de versiones. Está integrada por Thom Yorke, Jonny Greenwood, Ed O\'Brien, Colin Greenwood y Phil Selway. Radiohead lanzó su primer sencillo, «Creep», en 1992.');
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancion`
--

DROP TABLE IF EXISTS `cancion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancion` (
  `cod_cancion` bigint(20) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) DEFAULT NULL,
  `duracion` time DEFAULT NULL,
  `album` varchar(255) DEFAULT NULL,
  `artista_id` bigint(20) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cod_cancion`),
  KEY `FKkoeqsbikkwgjhfa5mv9ybfq5a` (`artista_id`),
  CONSTRAINT `FKkoeqsbikkwgjhfa5mv9ybfq5a` FOREIGN KEY (`artista_id`) REFERENCES `artista` (`id_artista`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancion`
--

LOCK TABLES `cancion` WRITE;
/*!40000 ALTER TABLE `cancion` DISABLE KEYS */;
INSERT INTO `cancion` VALUES (1,'Virtual Insanity','05:38:00','Travelling without moving',1,'Jamiroquai - Virtual Insanity.mp3'),(2,'Canned Heat','03:54:23','Synkronized',1,'Jamiroquai - Canned Heat.mp3'),(3,'Deeper Underground','04:36:34','Synkronized',1,'Jamiroquai-Deeper Underground.mp3'),(4,'Little L','03:57:50','A Funk Odyssey',1,'Jamiroquai - Little L.mp3'),(5,'Venus as a Boy','04:48:12','Debut',2,'Bjork - Venus as a boy.mp3'),(6,'Jóga','03:14:36','Homogenic',2,'Bjork - Joga.mp3'),(7,'Human Behaviour','04:15:31','Debut',2,'Bjork - Human behaviour.mp3'),(8,'Uprising','04:12:43','The Resistance',3,'Muse - Uprising.mp3'),(9,'Supermassive Black Hole','03:31:26','Black Holes and Revelations',3,'Muse - Supermassive Black Hole.mp3'),(10,'Plug in Baby','03:41:29','Origin of Symmetry',3,'Muse - Plug in Baby.mp3'),(11,'Knights of Cydonia','06:06:12','Black Holes and Revelations',3,'Muse - Knights of Cydonia.mp3'),(12,'Butterflies and Hurricanes','04:34:30','Absolution',3,'Muse - Butterflies  Hurricanes.mp3'),(13,'Muscle Museum','03:45:12','Showbiz',3,'Muse - Muscle Museum.mp3'),(14,'Lonely Boy','03:16:23','El Camino',4,'The Black Keys - Lonely Boy.mp3'),(15,'Lies','04:00:12','Attack & Release',4,'The Black Keys - Lies.mp3'),(16,'Whish You Where Here','04:54:52','Whish You Where Here',5,'Pink Floyd - Wish You Were Here.mp3'),(17,'Another Brick in the Wall, Part 2','03:19:37','The Wall',5,'Another Brick in the Wall (Part 2) - Pink Floyd.mp3'),(18,'Shine On You Crazy Diamond','13:23:34','Whish You Where Here',5,'Pink Floyd - Shine On You Crazy Diamond.mp3'),(19,'Mardy Bum','02:58:40','Whatever People Say I Am, That\'s What I\'m Not',6,'Artic Monkeys - Mardy Bum.mp3'),(20,'Brianstorm','00:53:21','Favourite Worst Nightmare',6,'Arctic Monkeys - Brianstorm.mp3'),(21,'Teddy Picker','02:53:41','Favourite Worst Nightmare',6,'Artic Monkeys - Teddy Picker.mp3'),(22,'Legendary','03:37:12','Legendary',7,'Welshly Arms - Legendary.mp3'),(23,'The Touch','04:20:50','Welshly Arms',7,'Welshly Arms - The Touch.mp3'),(24,'Love in a Minor Key','03:59:10','Welshly Arms',7,'Welshly Arms - Love in a Minor Key.mp3'),(25,'Song 2','02:03:34','Blur',8,'Blur - Song 2.mp3'),(26,'Girls & Boys','04:19:29','ParkLife',8,'Blur - Girls & Boys.mp3'),(27,'Jigsaw Falling Into Place','04:18:29','In Rainbows',18,'Radiohead - Jigsaw Falling Into Place.mp3'),(28,'Creep','03:57:03','Pablo Honey',18,'Radiohead - Creep.mp3'),(29,'Voodoo People','05:10:34','Music for the Jilted Generation',9,'The Prodigy - Voodoo People.mp3'),(30,'Breathe','04:02:12','The Fat of the Land',9,'The Prodigy - Breathe.mp3'),(31,'Firestarter','03:46:34','The Fat of the Land',9,'The Prodigy - Firestarter.mp3'),(32,'Smack My Bitch Up','05:44:12','The Fat of the Land',9,'The Prodigy - Smack My Bitch Up.mp3'),(33,'Narayan','06:34:27','The Fat of the Land',9,'The Prodigy - Narayan.mp3'),(34,'Que puedo hacer','03:05:23','Super 8',10,'Los Planetas - Qué Puedo Hacer.mp3'),(35,'Pesadilla en el parque de atracciones','02:21:50','Encuentros con entidades',10,'Los Planetas - Pesadilla En El Parque De Atracciones.mp3'),(36,'Cumpleaños total','03:09:29','Una semana en el motor de un autobús',10,'Los Planetas - Cumpleaños Total.mp3'),(37,'Islamabad','07:04:10','Zona temporalmente autónoma',10,'Los Planetas - Islamabad.mp3'),(38,'Cantaloop','03:41:32','Hand On the Torch',11,'US3 - Cantaloop.mp3'),(39,'Tukka Yoot\'s Riddim','03:59:11','Hand On the Torch',11,'US3 - Tukka Yoots Riddim.mp3'),(40,'Caught Up in a Struggle','03:43:29','Broadway & 52nd',11,'Us3 - Caught Up In A Struggle.mp3'),(41,'Ingrata','03:35:40','Re',12,'Café Tacvba - La Ingrata.mp3'),(42,'El puñal y el corazón','04:21:10','Re',12,'Cafe Tacvba - El puñal y el corazón.mp3');
/*!40000 ALTER TABLE `cancion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `canciones_lista`
--

DROP TABLE IF EXISTS `canciones_lista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `canciones_lista` (
  `cod_canciones_lista` bigint(20) NOT NULL AUTO_INCREMENT,
  `cod_cancion` bigint(20) DEFAULT NULL,
  `cod_lista` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`cod_canciones_lista`),
  KEY `FKb1yofntr4oehu1kp75mmqgh2a` (`cod_cancion`),
  KEY `FK5wlacoxemlov062vbjwu6xds4` (`cod_lista`),
  CONSTRAINT `FK5wlacoxemlov062vbjwu6xds4` FOREIGN KEY (`cod_lista`) REFERENCES `lista_reproduccion` (`cod_lista`),
  CONSTRAINT `FKb1yofntr4oehu1kp75mmqgh2a` FOREIGN KEY (`cod_cancion`) REFERENCES `cancion` (`cod_cancion`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `canciones_lista`
--

LOCK TABLES `canciones_lista` WRITE;
/*!40000 ALTER TABLE `canciones_lista` DISABLE KEYS */;
INSERT INTO `canciones_lista` VALUES (1,1,1),(2,7,1),(3,13,1),(7,2,3),(8,4,3),(9,8,3),(10,11,3),(11,12,3),(12,18,3),(13,19,3),(14,20,3),(15,25,3),(16,26,3),(17,29,3),(18,40,3),(19,14,1),(20,6,1),(21,15,1),(22,28,1),(27,1,6),(28,2,6),(29,3,6),(30,4,6),(31,6,6),(32,8,6),(33,11,6),(34,14,6),(35,16,6),(36,18,6),(37,19,6),(40,12,7),(41,19,7),(42,39,1),(43,5,8),(44,9,8),(47,37,9),(48,20,9),(49,18,9),(50,28,9),(51,26,9);
/*!40000 ALTER TABLE `canciones_lista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista_reproduccion`
--

DROP TABLE IF EXISTS `lista_reproduccion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_reproduccion` (
  `cod_lista` bigint(20) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `id_usuario` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`cod_lista`),
  KEY `FKcbkeogn0llwt67smrghdbccu6` (`id_usuario`),
  CONSTRAINT `FKcbkeogn0llwt67smrghdbccu6` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_reproduccion`
--

LOCK TABLES `lista_reproduccion` WRITE;
/*!40000 ALTER TABLE `lista_reproduccion` DISABLE KEYS */;
INSERT INTO `lista_reproduccion` VALUES (1,'ripley1',2),(3,'ripley2',2),(6,'Karma',2),(7,'Lista1',10),(8,'lista1',18),(9,'soyyo1',19);
/*!40000 ALTER TABLE `lista_reproduccion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rol` enum('ROLE_ADMIN','ROLE_USER') DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'admin','admin@test.com','$2a$10$lVesBtbl.TmTDP9FXGSM6.kBeg1gyZgtAP/Wm3/kHq.oYnezLfkVa','ROLE_ADMIN'),(2,'ripley','ripley@test.com','$2a$10$TJ1V9uAmOIxhiHNxdJIEZ.ic5TUulssZ.D9W8u1Gfl9V8vXwN7W12','ROLE_USER'),(6,'supersayian','supersayian@test.com','$2a$10$dwuWIgl7OiBTHWQ6SwHKS.QjlRArw5..qDCWCewGJIXjqdk8h/Ouq','ROLE_USER'),(10,'nuevousuario','nuevousuario@test.com','$2a$10$qJ4b1WxpQeeqt.yt7Q.96OWPvRVAu5uW.KgehQVJmR9Xn4HNsDNrO','ROLE_USER'),(13,'test','test@test.com','$2a$10$N55W07Rd/RM2G76JMSR/zuoNxzEacf.favVcjsRkL8lz0B71SUY0y','ROLE_USER'),(18,'user1','user1@test.com','$2a$10$4rhgh8vvxCYvreGrRd6b..2Ifh8zU0xerTTFwEHHcbZRh2EYcW20O','ROLE_USER'),(19,'soyyo','soyyo@test.com','$2a$10$SBz/olylmHwsrHhZ3GsZqOKuINreHl2mFWQs1o0TC5haKroRdjcMK','ROLE_USER');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09  1:42:55
