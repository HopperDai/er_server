/*
Navicat MySQL Data Transfer

Source Server         : hopper
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : eleme

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-07-12 23:33:30
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart_table
-- ----------------------------
DROP TABLE IF EXISTS `cart_table`;
CREATE TABLE `cart_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(32) DEFAULT NULL,
  `item_id` varchar(32) DEFAULT NULL,
  `count` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `user_id` (`user_id`,`item_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for collect_table
-- ----------------------------
DROP TABLE IF EXISTS `collect_table`;
CREATE TABLE `collect_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(8) DEFAULT NULL,
  `data` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for menu_table
-- ----------------------------
DROP TABLE IF EXISTS `menu_table`;
CREATE TABLE `menu_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) DEFAULT NULL,
  `item_id` varchar(32) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `tips` varchar(16) DEFAULT NULL,
  `image_path` varchar(48) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for restaurant_table
-- ----------------------------
DROP TABLE IF EXISTS `restaurant_table`;
CREATE TABLE `restaurant_table` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_id` int(11) DEFAULT NULL,
  `name` varchar(32) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `distance` mediumint(9) DEFAULT NULL,
  `float_delivery_fee` tinyint(4) DEFAULT NULL,
  `image_path` varchar(64) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `opening_hours` varchar(32) DEFAULT NULL,
  `phone` varchar(128) DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `rating_count` mediumint(9) DEFAULT NULL,
  `recent_order_num` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `restaurant_id is unique` (`restaurant_id`)
) ENGINE=MyISAM AUTO_INCREMENT=1258 DEFAULT CHARSET=utf8;
