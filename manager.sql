/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50508
Source Host           : localhost:3306
Source Database       : manager

Target Server Type    : MYSQL
Target Server Version : 50508
File Encoding         : 65001

Date: 2019-08-30 23:39:29
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `handle_count`
-- ----------------------------
DROP TABLE IF EXISTS `handle_count`;
CREATE TABLE `handle_count` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `handle_name` varchar(20) NOT NULL,
  `count` int(250) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of handle_count
-- ----------------------------
INSERT INTO `handle_count` VALUES ('1', '个人中心', '23');
INSERT INTO `handle_count` VALUES ('2', '用户列表', '90');
INSERT INTO `handle_count` VALUES ('3', '添加用户', '40');
INSERT INTO `handle_count` VALUES ('4', '删除用户', '100');
INSERT INTO `handle_count` VALUES ('5', '修改用户', '21');
INSERT INTO `handle_count` VALUES ('6', '角色列表', '200');
INSERT INTO `handle_count` VALUES ('7', '添加角色', '10');
INSERT INTO `handle_count` VALUES ('8', '删除角色', '0');
INSERT INTO `handle_count` VALUES ('9', '修改角色', '20');
INSERT INTO `handle_count` VALUES ('10', '评论列表', '200');
INSERT INTO `handle_count` VALUES ('11', '删除评论', '100');
INSERT INTO `handle_count` VALUES ('12', '积分列表', '50');
INSERT INTO `handle_count` VALUES ('13', '修改积分', '30');

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '个人中心', '0', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('2', '视屏管理', '0', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('3', '用户管理', '0', '1', '/admin/userList');
INSERT INTO `menu` VALUES ('4', '角色管理', '0', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('5', '评论管理', '0', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('6', '积分管理', '0', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('7', '修改密码', '1', '1', '/admin/showInfo');
INSERT INTO `menu` VALUES ('8', '添加视屏', '2', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('9', '删除视屏', '2', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('10', '修改视屏信息', '2', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('11', '用户列表', '3', '1', '/admin/userList');
INSERT INTO `menu` VALUES ('17', '删除评论', '5', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('18', '修改评论', '5', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('19', '修改积分', '6', '1', 'javascript:void(0)');
INSERT INTO `menu` VALUES ('21', '角色列表', '4', '1', '/admin/role');

-- ----------------------------
-- Table structure for `permissions`
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(200) NOT NULL,
  `permission_href` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES ('1', '后台登录', '/admin/toLogin');
INSERT INTO `permissions` VALUES ('2', '后台注销', '/admin/leave');
INSERT INTO `permissions` VALUES ('3', '后台密码信息', '/admin/showInfo');
INSERT INTO `permissions` VALUES ('4', '后台修改密码', '/admin/updatePsw');
INSERT INTO `permissions` VALUES ('5', '后台错误页面', '/admin/error');
INSERT INTO `permissions` VALUES ('6', '角色列表', '/admin/role');
INSERT INTO `permissions` VALUES ('7', '修改角色', '/admin/alterRole');
INSERT INTO `permissions` VALUES ('8', '删除角色', '/admin/deleteRole');
INSERT INTO `permissions` VALUES ('9', '添加角色', '/admin/addRole');
INSERT INTO `permissions` VALUES ('10', '用户列表', '/admin/userList');
INSERT INTO `permissions` VALUES ('11', '修改用户信息', '/admin/alterUser');
INSERT INTO `permissions` VALUES ('12', '删除用户', '/admin/deleteUser');
INSERT INTO `permissions` VALUES ('13', '添加用户', '/admin/addUser');
INSERT INTO `permissions` VALUES ('14', '分页查询用户', '/admin/user/paging');
INSERT INTO `permissions` VALUES ('15', '后台首页', '/admin/index');

-- ----------------------------
-- Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  `state` int(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '超级管理员', '1');
INSERT INTO `role` VALUES ('2', '管理员', '2');
INSERT INTO `role` VALUES ('3', '游客', '3');

-- ----------------------------
-- Table structure for `role_permission`
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES ('1', '1', '1');
INSERT INTO `role_permission` VALUES ('2', '1', '2');
INSERT INTO `role_permission` VALUES ('3', '1', '3');
INSERT INTO `role_permission` VALUES ('4', '1', '4');
INSERT INTO `role_permission` VALUES ('5', '1', '5');
INSERT INTO `role_permission` VALUES ('6', '1', '6');
INSERT INTO `role_permission` VALUES ('7', '1', '7');
INSERT INTO `role_permission` VALUES ('8', '1', '8');
INSERT INTO `role_permission` VALUES ('9', '1', '9');
INSERT INTO `role_permission` VALUES ('10', '1', '10');
INSERT INTO `role_permission` VALUES ('11', '1', '11');
INSERT INTO `role_permission` VALUES ('12', '1', '12');
INSERT INTO `role_permission` VALUES ('13', '1', '13');
INSERT INTO `role_permission` VALUES ('14', '1', '14');
INSERT INTO `role_permission` VALUES ('15', '2', '1');
INSERT INTO `role_permission` VALUES ('16', '2', '2');
INSERT INTO `role_permission` VALUES ('17', '2', '3');
INSERT INTO `role_permission` VALUES ('18', '2', '4');
INSERT INTO `role_permission` VALUES ('19', '2', '5');
INSERT INTO `role_permission` VALUES ('20', '2', '6');
INSERT INTO `role_permission` VALUES ('21', '2', '7');
INSERT INTO `role_permission` VALUES ('22', '2', '9');
INSERT INTO `role_permission` VALUES ('23', '2', '10');
INSERT INTO `role_permission` VALUES ('24', '2', '11');
INSERT INTO `role_permission` VALUES ('25', '2', '13');
INSERT INTO `role_permission` VALUES ('26', '2', '14');
INSERT INTO `role_permission` VALUES ('27', '1', '15');
INSERT INTO `role_permission` VALUES ('28', '2', '15');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(250) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `state` int(4) NOT NULL DEFAULT '2',
  `role_id` bigint(250) NOT NULL DEFAULT '1',
  `vip_id` bigint(250) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'admin', '202cb962ac59075b964b07152d234b70', '1', '1', '100');
INSERT INTO `user` VALUES ('2', 'sep_admin', '202cb962ac59075b964b07152d234b70', '2', '1', '1');
INSERT INTO `user` VALUES ('3', '张三', '202cb962ac59075b964b07152d234b70', '2', '2', '1');
INSERT INTO `user` VALUES ('4', 'LIS', '202cb962ac59075b964b07152d234b70', '1', '2', '1');
INSERT INTO `user` VALUES ('5', 'JK', '202cb962ac59075b964b07152d234b70', '2', '1', '0');
INSERT INTO `user` VALUES ('7', '李四', 'd9b1d7db4cd6e70935368a1efb10e377', '1', '1', '3');
INSERT INTO `user` VALUES ('8', '王五', '123', '2', '1', '2');
INSERT INTO `user` VALUES ('9', '赵柳', '123', '2', '1', '1');
INSERT INTO `user` VALUES ('10', '华山街道', '123', '2', '1', '0');
INSERT INTO `user` VALUES ('11', '句', '12 ', '2', '1', '4');
INSERT INTO `user` VALUES ('12', '巨蟒', '123', '2', '1', '5');
INSERT INTO `user` VALUES ('13', '聚', '123', '2', '1', '0');
INSERT INTO `user` VALUES ('14', '奸臣', '123', '2', '1', '2');
INSERT INTO `user` VALUES ('15', '土豆', '123 ', '2', '1', '3');
INSERT INTO `user` VALUES ('16', '天蚕', '123', '2', '1', '5');
INSERT INTO `user` VALUES ('17', '@#————', '123', '2', '1', '2');
INSERT INTO `user` VALUES ('18', '￥￥￥', '123', '1', '1', '2');
INSERT INTO `user` VALUES ('23', '123', '123', '2', '0', '0');
INSERT INTO `user` VALUES ('24', '城东', '123', '1', '0', '0');
INSERT INTO `user` VALUES ('25', '二妈', '123', '2', '0', '0');
INSERT INTO `user` VALUES ('27', '111', '111', '2', '2', '0');
INSERT INTO `user` VALUES ('28', '22', '22', '2', '0', '0');
INSERT INTO `user` VALUES ('29', '33', '33', '2', '2', '0');
INSERT INTO `user` VALUES ('30', '12312', '11', '1', '1', '0');
INSERT INTO `user` VALUES ('31', '545', '123', '2', '1', '0');
INSERT INTO `user` VALUES ('49', '123', '202cb962ac59075b964b07152d234b70', '2', '3', '0');
INSERT INTO `user` VALUES ('50', '18674801565', 'e034fb6b66aacc1d48f445ddfb08da98', '2', '2', '0');

-- ----------------------------
-- Table structure for `vip`
-- ----------------------------
DROP TABLE IF EXISTS `vip`;
CREATE TABLE `vip` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `vip` int(11) NOT NULL DEFAULT '0',
  `vip_name` varchar(20) DEFAULT '普通用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vip
-- ----------------------------
INSERT INTO `vip` VALUES ('1', '0', '普通用户');
INSERT INTO `vip` VALUES ('2', '1', 'vip1');
INSERT INTO `vip` VALUES ('3', '2', 'vip2');
INSERT INTO `vip` VALUES ('4', '3', 'vip3');
INSERT INTO `vip` VALUES ('5', '4', 'vip4');
INSERT INTO `vip` VALUES ('6', '5', 'vip5');
INSERT INTO `vip` VALUES ('100', '100', '超级vip');

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
