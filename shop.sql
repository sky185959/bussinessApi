-- MySQL dump 10.13  Distrib 5.6.29, for Linux (x86_64)
--
-- Host: localhost    Database: shop
-- ------------------------------------------------------
-- Server version	5.6.29

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

te
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '地址标示',
  `uid` int(11) NOT NULL COMMENT '所属用户',
  `addr` varchar(99) NOT NULL COMMENT '地址',
  `real_name` varchar(24) NOT NULL COMMENT '收货人姓名',
  `is_default` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态：0：普通可用；1：默认地址；2：废弃',
  `is_delete` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否删除：0：正常;1:删除',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authenticity`
--

DROP TABLE IF EXISTS `authenticity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authenticity` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '认证唯一biao''sh',
  `name` varchar(24) DEFAULT '""' COMMENT '认证名称',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `is_delete` int(11) DEFAULT '0' COMMENT '是否删除：1：删除',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态：0：开启；1：关闭',
  PRIMARY KEY (`id`),
  KEY `create_time` (`create_time`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='认证';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authenticity`
--

LOCK TABLES `authenticity` WRITE;
/*!40000 ALTER TABLE `authenticity` DISABLE KEYS */;
INSERT INTO `authenticity` VALUES (1,'1','2017-11-28 04:52:21',0,0);
/*!40000 ALTER TABLE `authenticity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buycar`
--

DROP TABLE IF EXISTS `buycar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buycar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `shopping_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '1',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_delete` int(11) NOT NULL DEFAULT '0' COMMENT '是否删除：1：删除',
  `is_get_active` int(11) NOT NULL COMMENT '预留字段：是否参加折扣活动',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购物车';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buycar`
--

LOCK TABLES `buycar` WRITE;
/*!40000 ALTER TABLE `buycar` DISABLE KEYS */;
/*!40000 ALTER TABLE `buycar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loopimg`
--

DROP TABLE IF EXISTS `loopimg`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `loopimg` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` int(11) NOT NULL,
  `link` int(11) NOT NULL,
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '轮播类型：0：首页轮播',
  `create_time` int(11) NOT NULL,
  `is_delete` int(11) NOT NULL COMMENT '是否删除。1.删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='轮播图';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loopimg`
--

LOCK TABLES `loopimg` WRITE;
/*!40000 ALTER TABLE `loopimg` DISABLE KEYS */;
/*!40000 ALTER TABLE `loopimg` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderinfo`
--

DROP TABLE IF EXISTS `orderinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `order_no` varchar(24) NOT NULL COMMENT '订单号',
  `shopping_id` int(11) NOT NULL COMMENT '商铺id',
  `shop_id` int(11) NOT NULL COMMENT '商铺id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_delete` int(11) DEFAULT '0' COMMENT '是否删除：1：删除',
  `sent_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '发货时间',
  `addr_id` int(11) NOT NULL COMMENT '地址id',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '购买数量',
  `status` int(4) NOT NULL DEFAULT '0' COMMENT '0：代付款；1：已付款代发货；2：已发货；3：已完成',
  `pay_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '支付时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_no` (`order_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderinfo`
--

LOCK TABLES `orderinfo` WRITE;
/*!40000 ALTER TABLE `orderinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderinfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '店铺id',
  `name` varchar(24) NOT NULL DEFAULT '""' COMMENT '店铺名称',
  `description` varchar(99) NOT NULL COMMENT '店铺简介',
  `type` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0：普通店铺：1：vip店铺：2体验店铺',
  `code` varchar(99) NOT NULL COMMENT '店铺二维码',
  `icon` varchar(99) NOT NULL COMMENT '店铺头像',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '店铺创建时间',
  `is_delete` int(11) DEFAULT '0' COMMENT '是否删除：1：删除',
  `auth_id` int(11) NOT NULL COMMENT '认证唯一标示',
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `auth_id` (`auth_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='店铺';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'官方店铺','官方店铺',0,'','','2017-11-26 18:47:13',0,0);
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping`
--

DROP TABLE IF EXISTS `shopping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shopping` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `name` varchar(99) NOT NULL COMMENT '商品名称',
  `description` varchar(99) NOT NULL COMMENT '商品简述',
  `stock` int(11) NOT NULL COMMENT '库存',
  `sort` int(11) NOT NULL COMMENT '商品排序',
  `up_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '上架时间',
  `down_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT '下架时间',
  `parameter` varchar(99) NOT NULL COMMENT 'json格式的商品参数{"pp":"","package":"装袋","metering":"片剂","age_type":"成人","make_addr":"日本","period":"36个月","specifications":"350mg*60粒","pass_sex":"通用"}',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '商品状态：0：未上架；1：审核中：2：已上架',
  `shop_id` int(11) NOT NULL DEFAULT '0' COMMENT '所属店铺id',
  `type_id` int(11) NOT NULL DEFAULT '1' COMMENT '所属类型ID',
  `sale_ty` int(11) NOT NULL DEFAULT '0' COMMENT '推荐属性：0：本周推荐；1：本月推荐；2：套装推荐；3：推荐列表',
  `pic` varchar(99) NOT NULL COMMENT '商品头图',
  `pic1` varchar(99) NOT NULL COMMENT '商品图片',
  `pic2` varchar(99) NOT NULL COMMENT '商品图片',
  `pic3` varchar(99) NOT NULL COMMENT '商品图片',
  `pic4` varchar(99) NOT NULL COMMENT '商品图片',
  `detail` text NOT NULL COMMENT '详情页内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `is_delete` int(11) DEFAULT '0' COMMENT '是否删除：1：删除',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `create_time` (`create_time`),
  KEY `sort` (`sort`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='商品表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping`
--

LOCK TABLES `shopping` WRITE;
/*!40000 ALTER TABLE `shopping` DISABLE KEYS */;
INSERT INTO `shopping` VALUES (1,'测试数据','测试数据测试数据',1,0,'0000-00-00 00:00:00','0000-00-00 00:00:00','',0,1,1,1,'','','','','','','2017-11-26 18:37:03',0),(2,'1','1',1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','1',0,0,1,0,'','','','','','','2017-11-28 16:41:23',0);
/*!40000 ALTER TABLE `shopping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_users`
--

DROP TABLE IF EXISTS `tb_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tb_users` (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `counties` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `QQ` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createtime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_users`
--

LOCK TABLES `tb_users` WRITE;
/*!40000 ALTER TABLE `tb_users` DISABLE KEYS */;
INSERT INTO `tb_users` VALUES (16,'admin','123456','男','543843838@qq.com','123456789',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(18,'王骄阳','123456','女','未知','未知',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(19,'金三胖','123456','女','未知','秘密',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(20,'王胜凯','456789','男','密码','不明',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(21,'奥巴马','123456','男','抱歉，您没的权限','抱歉，您没的权限',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(22,'第一条','456','男','admin','别删',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(23,'admin','123456','男','删了这条你就别想登录上去了',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `tb_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `appid` varchar(32) NOT NULL COMMENT '应用id',
  `user_login_name` varchar(24) NOT NULL COMMENT '登录账户',
  `passwd` char(32) NOT NULL COMMENT '登录密码MD5加密',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '状态：0：正常；1：关闭',
  `identity` tinyint(2) NOT NULL DEFAULT '0' COMMENT '预留字段 系统身份：0普通身份（其他暂定）',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '注册时间',
  `is_delete` tinyint(2) DEFAULT '0' COMMENT '是否删除：1：删除',
  PRIMARY KEY (`id`),
  KEY `identity` (`identity`),
  KEY `user_login_name` (`user_login_name`),
  KEY `appid` (`appid`),
  KEY `create_time` (`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'1','1','1',0,0,'2017-11-28 05:32:52',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userinfo` (
  `user_id` int(11) NOT NULL COMMENT '用户标示',
  `nick` varchar(24) NOT NULL COMMENT '用户昵称',
  `portrait` varchar(99) NOT NULL COMMENT '头像',
  `qq` varchar(15) NOT NULL COMMENT 'qq',
  `email` varchar(48) NOT NULL COMMENT '邮箱',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `card_id` varchar(25) NOT NULL COMMENT '身份证号',
  `wechart` varchar(24) NOT NULL COMMENT '微信号',
  `description` varchar(48) NOT NULL COMMENT '个性签名',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
  `is_delete` tinyint(2) NOT NULL DEFAULT '0' COMMENT '是否删除：1：删除',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-29 19:17:52
