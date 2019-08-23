/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : manager

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2019-08-23 17:37:23
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `menu`
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `desc` varchar(10) DEFAULT NULL,
  `parent_id` bigint(250) NOT NULL,
  `state` int(4) DEFAULT '1',
  `menu_href` varchar(2000) DEFAULT NULL,
  `icon` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '个人中心', '0', '1', 'null', 'glyphicon-user');
INSERT INTO `menu` VALUES ('2', '视屏管理', '0', '1', 'null', 'glyphicon-expand');
INSERT INTO `menu` VALUES ('3', '用户管理', '0', '1', 'null', 'glyphicon-headphones');
INSERT INTO `menu` VALUES ('4', '角色管理', '0', '1', '/admin/role', 'glyphicon-th-large');
INSERT INTO `menu` VALUES ('5', '评论管理', '0', '1', 'null', 'glyphicon-comment');
INSERT INTO `menu` VALUES ('6', '积分管理', '0', '1', 'null', 'glyphicon-shopping-cart');
INSERT INTO `menu` VALUES ('7', '修改密码', '1', '1', '/admin/showInfo', null);
INSERT INTO `menu` VALUES ('8', '添加视屏', '2', '1', 'null', null);
INSERT INTO `menu` VALUES ('9', '删除视屏', '2', '1', 'null', null);
INSERT INTO `menu` VALUES ('10', '修改视屏信息', '2', '1', 'null', null);
INSERT INTO `menu` VALUES ('11', '用户信息', '3', '1', 'null', null);
INSERT INTO `menu` VALUES ('12', '删除用户', '3', '1', 'null', null);
INSERT INTO `menu` VALUES ('13', '修改用户', '3', '1', 'null', null);
INSERT INTO `menu` VALUES ('17', '删除评论', '5', '1', 'null', null);
INSERT INTO `menu` VALUES ('18', '修改评论', '5', '1', 'null', null);
INSERT INTO `menu` VALUES ('19', '修改积分', '6', '1', 'null', null);

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  `state` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '1');
INSERT INTO `role` VALUES ('2', '管理员', '2');
INSERT INTO `role` VALUES ('10', '1', '1');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `state` int(4) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '123', '1');

-- ----------------------------
-- Function structure for `getChildLst`
-- ----------------------------
DROP FUNCTION IF EXISTS `getChildLst`;
DELIMITER ;;
CREATE DEFINER=`root`@`127.0.0.1` FUNCTION `getChildLst`(rootId INT) RETURNS varchar(1000) CHARSET utf8
    READS SQL DATA
BEGIN
  DECLARE sTemp VARCHAR(1000);
  
  DECLARE sTempChd VARCHAR(1000);

  SET sTemp = '$';

  SET sTempChd =cast(rootId as CHAR);

  WHILE sTempChd is not null DO

    SET sTemp = concat(sTemp,',',sTempChd);
    
    SELECT group_concat(id) INTO sTempChd FROM menu where FIND_IN_SET(parent_id,sTempChd)>0;

  END WHILE;

  RETURN sTemp;

END
;;
DELIMITER ;
