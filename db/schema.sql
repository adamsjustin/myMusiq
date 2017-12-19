CREATE SCHEMA `mymusiq` ;

CREATE TABLE `mymusiq`.`users` (
  `user_key` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_key`));

CREATE TABLE `mymusiq`.`playlist` (
  `pl_key` INT NOT NULL AUTO_INCREMENT,
  `user_key` INT NOT NULL,
  `pl_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`pl_key`));

CREATE TABLE `mymusiq`.`playlist_songs` (
  `ps_key` INT NOT NULL AUTO_INCREMENT,
  `pl_key` INT NOT NULL,
  `user_key` INT NOT NULL,
  `song_name` VARCHAR(50) NOT NULL,
  `song_url` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ps_key`));