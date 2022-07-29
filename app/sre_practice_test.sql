CREATE DATABASE IF NOT EXISTS `sre_practice_test`;
USE `sre_practice_test`;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `provider` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
);