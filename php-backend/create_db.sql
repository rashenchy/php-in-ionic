-- create_db.sql
-- Run this in your MySQL (phpMyAdmin or mysql CLI) to create the database and users table

CREATE DATABASE IF NOT EXISTS `ionic_auth_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `ionic_auth_db`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
