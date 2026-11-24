-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: zenisa_perfumes
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `zenisa_perfumes`
--

-- NOTE FOR CPANEL HOSTING:
-- 1. Create your database in cPanel (e.g. cpaneluser_zenisa) in "MySQL Databases".
-- 2. Open phpMyAdmin, select your database from the left panel, and click "Import".
-- 3. Select this SQL file and click "Go" or "Import".
-- The CREATE DATABASE and USE statements are commented out below so it imports cleanly into your cPanel database:
-- CREATE DATABASE /*!32312 IF NOT EXISTS*/ `zenisa_perfumes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
-- USE `zenisa_perfumes`;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `show_in_header` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_categories_slug` (`slug`),
  KEY `idx_categories_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Gender','gender','',1,'2026-10-20 16:43:29','2026-10-24 18:48:41',0),(2,'Celebs Choose','celebs-choose','',1,'2026-10-20 16:43:51','2026-10-24 18:48:46',0),(3,'Fragrance Notes','fragrance-notes','',1,'2026-10-20 16:44:02','2026-10-24 18:25:58',1),(4,'Occasion','occasion','',1,'2026-10-20 16:44:08','2026-10-24 18:25:58',1),(5,'Brand','brand','',1,'2026-10-20 16:44:16','2026-10-20 16:44:16',0),(7,'Try The Sample Kit','try-the-sample-kit','',1,'2026-10-24 18:56:10','2026-10-24 18:56:10',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commerce_settings`
--

DROP TABLE IF EXISTS `commerce_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commerce_settings` (
  `id` tinyint(3) unsigned NOT NULL,
  `settings_json` longtext NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commerce_settings`
--

LOCK TABLES `commerce_settings` WRITE;
/*!40000 ALTER TABLE `commerce_settings` DISABLE KEYS */;
INSERT INTO `commerce_settings` VALUES (1,'{\"whatsappNumber\":\"919589138699\",\"shippingFee\":null,\"free50\":{\"active\":false,\"productIds\":[],\"repeat\":true},\"bundle20\":{\"active\":false,\"productIds\":[],\"repeat\":true},\"combineOffers\":false,\"googleProfileUrl\":\"\",\"googlePlaceId\":\"\"}','2026-11-17 11:56:41');
/*!40000 ALTER TABLE `commerce_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_inquiries`
--

DROP TABLE IF EXISTS `contact_inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contact_inquiries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `subject` varchar(200) DEFAULT NULL,
  `message` text NOT NULL,
  `status` enum('unread','read','replied') NOT NULL DEFAULT 'unread',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_inquiries`
--

LOCK TABLES `contact_inquiries` WRITE;
/*!40000 ALTER TABLE `contact_inquiries` DISABLE KEYS */;
INSERT INTO `contact_inquiries` VALUES (2,'Ayushi Agrawal','agrawalayushi093@gmail.com','9174125957','testing','testing','unread','2026-10-23 23:48:42'),(3,'Ayushi Agrawal','agrawal.ayushi093@gmail.com','09174125957','testing','testing','unread','2026-10-23 23:51:37');
/*!40000 ALTER TABLE `contact_inquiries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faqs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(500) NOT NULL,
  `answer` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'How do I place an order on Zenisa Perfumes?','Delivery timelines depend on your location and courier availability. Estimated delivery details will be provided during order confirmation or through our customer support team.','2026-10-20 18:09:34','2026-10-20 18:10:03'),(2,'How long does delivery take?','Returns or exchanges may be accepted for damaged, defective, leaking, or incorrect products. Due to the personal-use nature of perfumes, change-of-mind returns are generally not accepted. Please refer to our Return & Exchange Policy for details.','2026-10-20 18:09:50','2026-10-20 18:09:50'),(3,'Can I return or exchange a perfume?','Returns or exchanges may be accepted for damaged, defective, leaking, or incorrect products. Due to the personal-use nature of perfumes, change-of-mind returns are generally not accepted. Please refer to our Return & Exchange Policy for details.','2026-10-20 18:11:01','2026-10-20 18:11:01');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `rules_json` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
INSERT INTO `offers` VALUES (2,'Buy 2 × 50ml, Get 1 Free.','',1,'{\"title\":\"Buy 2 × 50ml, Get 1 Free.\",\"description\":\"\",\"type\":\"buy_get\",\"is_active\":true,\"repeat\":true,\"productIds\":[\"product-4\"],\"ml\":50,\"value\":0,\"minQuantity\":2,\"buyQuantity\":2,\"getQuantity\":1}','2026-10-23 19:54:25','2026-10-23 20:05:19','buy-2-50ml-get-1-free-2/buy-2-50ml-get-1-free-e05d498a-561c-4f6d-a920-ad1e30ae2b22.png'),(3,'Your discovery set. 4 × 20ml for ₹999.','',1,'{\"title\":\"Your discovery set. 4 × 20ml for ₹999.\",\"description\":\"\",\"type\":\"bundle\",\"is_active\":true,\"repeat\":true,\"productIds\":[\"product-4\"],\"ml\":20,\"value\":999,\"minQuantity\":4,\"buyQuantity\":0,\"getQuantity\":0}','2026-10-23 19:56:31','2026-10-23 20:04:04','your-discovery-set-4-20ml-for-999-3/your-discovery-set-4-20ml-for-999-a3ebe5a0-cad4-43c4-bd0f-96b15c1073fd.png');
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_number` varchar(40) NOT NULL,
  `request_key` varchar(36) NOT NULL,
  `request_hash` char(64) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `customer_phone` varchar(20) NOT NULL,
  `customer_json` text NOT NULL,
  `quote_json` longtext NOT NULL,
  `message` text NOT NULL,
  `status` enum('new','confirmed','shipped','delivered','cancelled') NOT NULL DEFAULT 'new',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number` (`order_number`),
  UNIQUE KEY `request_key` (`request_key`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'ZEN-20261031-5B59E998','68cf4d03-b9da-40da-a6c1-0584ec5c3b3c','22908fc3f9cf8e740b3974069db42d579265dcb0a41b83ccd8790b8bddf50687','Ayushi Agrawal','9174125957','{\"name\":\"Ayushi Agrawal\",\"phone\":\"9174125957\",\"email\":\"agrawal.ayushi093@gmail.com\",\"address\":\"57, om Shiv Nagar , lalghati, Bhopal, M.P.\",\"city\":\"Bhopal\",\"state\":\"M.P.\",\"pincode\":\"462030\",\"notes\":\"\"}','{\"lines\":[{\"productId\":\"product-4\",\"categoryIds\":[1,3],\"subcategoryIds\":[1,7],\"name\":\"AZZ The Most Loved\",\"variant\":\"50 ml\",\"quantity\":1,\"unitPrice\":750,\"lineTotal\":750},{\"productId\":\"product-21\",\"categoryIds\":[1,3,4],\"subcategoryIds\":[2,4,5,10,13],\"name\":\"Zoya & Flora\",\"variant\":\"50 ml\",\"quantity\":1,\"unitPrice\":799,\"lineTotal\":799},{\"productId\":\"product-20\",\"categoryIds\":[1,3,4],\"subcategoryIds\":[3,6,5,7,10,13],\"name\":\"Rouge Glow\",\"variant\":\"50 ml\",\"quantity\":1,\"unitPrice\":799,\"lineTotal\":799}],\"subtotal\":2348,\"savings\":0,\"appliedOffers\":[],\"shippingFee\":null,\"shippingPending\":true,\"total\":2348,\"currency\":\"INR\",\"sampleCatalogue\":true}','Order: ZEN-20261031-5B59E998\nHello ZENISA PERFUMES! I would like to enquire about this selection:\n1. AZZ The Most Loved | 50 ml | Qty 1 × ₹750.00 = ₹750.00\n2. Zoya & Flora | 50 ml | Qty 1 × ₹799.00 = ₹799.00\n3. Rouge Glow | 50 ml | Qty 1 × ₹799.00 = ₹799.00\n\nSubtotal: ₹2,348.00\nSavings: ₹0.00\nShipping: To be confirmed\nEstimated total: ₹2,348.00 + shipping, if applicable\n\nCustomer: Ayushi Agrawal\nPhone: 9174125957\nEmail: agrawal.ayushi093@gmail.com\nAddress: 57, om Shiv Nagar , lalghati, Bhopal, M.P., Bhopal, M.P., 462030\n\nPlease confirm availability, final pricing, delivery and applicable taxes. This is an enquiry, not a confirmed or paid order. ','new','2026-10-31 17:58:28','2026-10-31 17:58:28'),(4,'ZEN-20261117-47EB94F9','44d322bd-d273-4410-966e-4a2a56f4ce48','ce9cfb212a5c11a9ba5316a35414c99abcc003d876e4f4c4b82db2121196c465','Ayushi Agrawal','+919174125957','{\"name\":\"Ayushi Agrawal\",\"phone\":\"+919174125957\",\"email\":\"agrawal.ayushi093@gmail.com\",\"address\":\"lalghati, Bhopal, M.P.\",\"city\":\"Bhopal\",\"state\":\"M.P.\",\"pincode\":\"462030\",\"notes\":\"\"}','{\"lines\":[{\"productId\":\"product-20\",\"categoryIds\":[1,3,4],\"subcategoryIds\":[3,6,5,7,10,13],\"name\":\"Rouge Glow\",\"variant\":\"50 ml\",\"quantity\":1,\"unitPrice\":799,\"lineTotal\":799},{\"productId\":\"product-19\",\"categoryIds\":[1,3,4],\"subcategoryIds\":[2,6,5,8,10,13],\"name\":\"Heel & Girl\",\"variant\":\"50 ml\",\"quantity\":1,\"unitPrice\":799,\"lineTotal\":799},{\"productId\":\"product-20\",\"categoryIds\":[1,3,4],\"subcategoryIds\":[3,6,5,7,10,13],\"name\":\"Rouge Glow\",\"variant\":\"20 ml\",\"quantity\":1,\"unitPrice\":499,\"lineTotal\":499}],\"subtotal\":2097,\"savings\":0,\"appliedOffers\":[],\"shippingFee\":null,\"shippingPending\":true,\"total\":2097,\"currency\":\"INR\",\"sampleCatalogue\":true}','Order: ZEN-20261117-47EB94F9\nHello ZENISA PERFUMES! I would like to enquire about this selection:\n1. Rouge Glow | 50 ml | Qty 1 × ₹799.00 = ₹799.00\n2. Heel & Girl | 50 ml | Qty 1 × ₹799.00 = ₹799.00\n3. Rouge Glow | 20 ml | Qty 1 × ₹499.00 = ₹499.00\n\nSubtotal: ₹2,097.00\nSavings: ₹0.00\nShipping: To be confirmed\nEstimated total: ₹2,097.00 + shipping, if applicable\n\nCustomer: Ayushi Agrawal\nPhone: +919174125957\nEmail: agrawal.ayushi093@gmail.com\nAddress: lalghati, Bhopal, M.P., Bhopal, M.P., 462030\n\nPlease confirm availability, final pricing, delivery and applicable taxes. This is an enquiry, not a confirmed or paid order. ','new','2026-11-17 11:58:55','2026-11-17 11:58:55');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `policy_pages`
--

DROP TABLE IF EXISTS `policy_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `policy_pages` (
  `slug` varchar(60) NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `policy_pages`
--

LOCK TABLES `policy_pages` WRITE;
/*!40000 ALTER TABLE `policy_pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `policy_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privacy_policy`
--

DROP TABLE IF EXISTS `privacy_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `privacy_policy` (
  `id` tinyint(3) unsigned NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privacy_policy`
--

LOCK TABLES `privacy_policy` WRITE;
/*!40000 ALTER TABLE `privacy_policy` DISABLE KEYS */;
INSERT INTO `privacy_policy` VALUES (1,'<p>Privacy Policy</p><p><strong>Last Updated: 20 October 2026</strong></p><p>At <strong>Zenisa Perfumes</strong>, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, share, and protect your information when you visit our website, purchase our products, or interact with our services.</p><p>By using our website, you acknowledge the practices described in this Privacy Policy. Where required by applicable law, we will obtain your consent before processing your personal information.</p><h2>1. Information We Collect</h2><p>We may collect the following types of information:</p><p><strong>Personal Information</strong></p><ul><li>Full name</li><li>Email address</li><li>Mobile number</li><li>Billing and shipping address</li><li>Postal code and delivery details</li></ul><p><strong>Order Information</strong></p><ul><li>Products purchased</li><li>Order history</li><li>Transaction details</li><li>Payment status</li><li>Shipping and delivery information</li></ul><p><strong>Technical Information</strong></p><ul><li>IP address</li><li>Browser type and device information</li><li>Website usage and navigation activity</li><li>Cookies and similar technologies</li></ul><p><strong>Customer Communication</strong></p><ul><li>Messages sent through WhatsApp, email, or contact forms</li><li>Customer feedback, reviews, and support inquiries</li></ul><p>We collect only the information reasonably necessary to provide our products and services.</p><h2>2. How We Use Your Information</h2><p>We may use your information to:</p><ul><li>Process, confirm, and deliver orders.</li><li>Provide order updates and tracking information.</li><li>Respond to customer inquiries and support requests.</li><li>Manage returns, exchanges, and refunds.</li><li>Improve website functionality and customer experience.</li><li>Detect fraudulent transactions and prevent unauthorized activities.</li><li>Maintain business records and comply with legal obligations.</li><li>Send promotional offers and product updates where you have provided the required consent or where otherwise permitted by law.</li></ul><h2>3. Payment Information</h2><p>Payments made through our website may be processed by authorized third-party payment service providers.</p><p>When an online payment gateway is enabled, payment information will be handled according to the security standards and privacy policies of the respective payment provider.</p><p>Zenisa Perfumes does not intend to store complete debit or credit card details on its own servers.</p><h2>4. Cookies and Tracking Technologies</h2><p>Our website may use cookies and similar technologies to improve your browsing experience.</p><p>Cookies may help us:</p><ul><li>Remember shopping cart items and website preferences.</li><li>Maintain secure browsing sessions.</li><li>Understand website traffic and performance.</li><li>Improve website functionality.</li><li>Measure the effectiveness of marketing campaigns, where applicable.</li></ul><p>You may manage or disable cookies through your browser settings. Where required, we will provide appropriate cookie consent choices.</p><p>Disabling certain cookies may affect website functionality.</p><h2>5. Sharing of Personal Information</h2><p>We do not sell your personal information.</p><p>We may share necessary information with trusted third parties, including:</p><ul><li>Courier and delivery service providers.</li><li>Payment gateway providers.</li><li>Website hosting and technical service providers.</li><li>Customer support and communication platforms.</li><li>Analytics and marketing service providers, where applicable.</li><li>Government or regulatory authorities when legally required.</li></ul><p>Such information will be shared only for legitimate business purposes and subject to applicable legal requirements.</p><h2>6. WhatsApp and Customer Communication</h2><p>Customers may contact Zenisa Perfumes through WhatsApp for product inquiries, order assistance, and customer support.</p><p>When you communicate with us through WhatsApp, information shared during the conversation may be used to respond to your inquiry, process orders, or provide customer assistance.</p><p>WhatsApp communications are also subject to the privacy practices of WhatsApp and its service providers.</p><p>Promotional WhatsApp messages will be sent only where permitted under applicable law and consent requirements.</p><h2>7. Data Security</h2><p>We take reasonable technical and organizational measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or loss.</p><p>These measures may include secure website connections, access controls, and appropriate safeguards for customer records.</p><p>However, no method of online transmission or electronic storage is completely secure. We cannot guarantee absolute security.</p><h2>8. Data Retention</h2><p>We retain personal information only for as long as reasonably necessary to fulfill the purposes described in this Privacy Policy, including order processing, customer support, recordkeeping, and compliance with applicable laws.</p><p>When personal information is no longer required, we will take appropriate steps to delete or securely anonymize it, subject to legal retention requirements.</p><h2>9. Your Privacy Rights</h2><p>Subject to applicable Indian data protection laws, you may have the right to:</p><ul><li>Request access to information about your personal data.</li><li>Request correction or updating of inaccurate information.</li><li>Request deletion of personal information, where applicable.</li><li>Withdraw consent for processing based on consent.</li><li>Opt out of promotional communications.</li><li>Raise concerns or grievances regarding the handling of your personal information.</li></ul><p>To exercise your rights, please contact us using the details provided below.</p><p>Certain requests may be subject to identity verification and legal requirements.</p><h2>10. Third-Party Websites and Services</h2><p>Our website may contain links to third-party websites, social media platforms, or external services.</p><p>Zenisa Perfumes is not responsible for the privacy practices or content of third-party websites.</p><p>We encourage customers to review the privacy policies of these services before sharing personal information.</p><h2>11. Children\'s Privacy</h2><p>Our website is intended for general customers and is not specifically directed toward children.</p><p>We do not knowingly collect personal information from children in violation of applicable laws.</p><p>If we become aware that personal information has been collected from a child without the required authorization, we will take appropriate steps to address the matter.</p><h2>12. Changes to This Privacy Policy</h2><p>Zenisa Perfumes may update this Privacy Policy from time to time to reflect changes in our business practices, website functionality, or legal requirements.</p><p>Any updates will be published on this page with a revised \"Last Updated\" date.</p><p>Where required by law, we will provide additional notice or obtain fresh consent for relevant changes.</p><h2>13. Contact Us</h2><p>If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact:</p><p><strong>Zenisa Perfumes</strong></p><p><strong>Email:</strong> [Official Support Email]</p><p><strong>WhatsApp:</strong> [Official WhatsApp Number]</p><p><strong>Business Address:</strong> [Registered Business Address]</p><p><strong>Privacy / Grievance Contact:</strong> [Name or Designation and Contact Details]</p><p><strong>Customer Support Hours:</strong> [Support Timings]</p><p>We will review and respond to privacy-related requests in accordance with applicable laws.</p><hr /><p><strong>Thank you for trusting Zenisa Perfumes. We are committed to respecting your privacy and protecting your personal information.</strong></p>','2026-10-20 17:51:31','2026-10-20 17:51:31');
/*!40000 ALTER TABLE `privacy_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category_assignments`
--

DROP TABLE IF EXISTS `product_category_assignments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category_assignments` (
  `product_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `subcategory_id` int(10) unsigned NOT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`product_id`,`category_id`,`subcategory_id`),
  KEY `fk_assignment_category` (`category_id`),
  KEY `fk_assignment_subcategory` (`subcategory_id`),
  CONSTRAINT `fk_assignment_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_assignment_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_assignment_subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category_assignments`
--

LOCK TABLES `product_category_assignments` WRITE;
/*!40000 ALTER TABLE `product_category_assignments` DISABLE KEYS */;
INSERT INTO `product_category_assignments` VALUES (4,1,1,0),(4,3,7,1),(12,1,1,0),(12,3,6,1),(12,3,7,2),(12,3,8,3),(12,4,13,4),(13,1,1,0),(13,3,4,2),(13,3,6,1),(13,4,10,3),(13,4,13,4),(14,1,1,0),(14,3,6,1),(14,4,10,2),(14,4,11,3),(14,4,13,4),(15,1,3,0),(15,3,8,1),(15,4,13,2),(16,1,3,0),(16,3,7,1),(16,3,8,2),(17,1,1,0),(17,3,4,2),(17,3,6,1),(17,4,10,3),(17,4,13,4),(18,1,1,0),(18,3,4,2),(18,3,6,1),(18,4,10,3),(19,1,2,0),(19,3,5,2),(19,3,6,1),(19,3,8,3),(19,4,10,4),(19,4,13,5),(20,1,3,0),(20,3,5,2),(20,3,6,1),(20,3,7,3),(20,4,10,4),(20,4,13,5),(21,1,2,0),(21,3,4,1),(21,3,5,2),(21,4,10,3),(21,4,13,4);
/*!40000 ALTER TABLE `product_category_assignments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_import_sources`
--

DROP TABLE IF EXISTS `product_import_sources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_import_sources` (
  `source_url` varchar(255) NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `imported_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`source_url`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_import_sources_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_import_sources`
--

LOCK TABLES `product_import_sources` WRITE;
/*!40000 ALTER TABLE `product_import_sources` DISABLE KEYS */;
INSERT INTO `product_import_sources` VALUES ('https://kaviorperfume.com/products/amber-elixir',12,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/aventus-apex',14,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/bleu-empire',13,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/cafe-kamra',15,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/cherry-secret',16,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/club-shadow',17,'2026-10-31 17:16:33'),('https://kaviorperfume.com/products/heel-and-girl',19,'2026-10-31 17:16:34'),('https://kaviorperfume.com/products/rouge-glow',20,'2026-10-31 17:16:34'),('https://kaviorperfume.com/products/sauvage-drift',18,'2026-10-31 17:16:34'),('https://kaviorperfume.com/products/zoya-and-flora',21,'2026-10-31 17:16:34');
/*!40000 ALTER TABLE `product_import_sources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variant_photos`
--

DROP TABLE IF EXISTS `product_variant_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variant_photos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `variant_id` int(10) unsigned NOT NULL,
  `image_path` varchar(500) NOT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_photo_variant` (`variant_id`),
  CONSTRAINT `fk_photo_variant` FOREIGN KEY (`variant_id`) REFERENCES `product_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variant_photos`
--

LOCK TABLES `product_variant_photos` WRITE;
/*!40000 ALTER TABLE `product_variant_photos` DISABLE KEYS */;
INSERT INTO `product_variant_photos` VALUES (21,21,'azz-the-most-loved-4/azz-the-most-loved-57e4b6f3-32f1-403f-b373-5b37e70aee4d.png',0),(22,21,'azz-the-most-loved-4/azz-the-most-loved-37dae3c9-22c6-4024-b780-a543fa4691a4.png',1),(23,21,'azz-the-most-loved-4/azz-the-most-loved-6abdf454-0029-400c-a6ef-d9c8ac8ccfa4.png',2),(24,21,'azz-the-most-loved-4/azz-the-most-loved-42d85dd9-ff7d-4276-9079-48e042bf5b67.png',3),(25,21,'azz-the-most-loved-4/azz-the-most-loved-28794aa9-ec43-412b-9b5a-b6d2f54c54b5.png',4),(26,22,'azz-the-most-loved-4/azz-the-most-loved-4e35b2b7-abd7-4ef3-a0b0-8148cebd460e.png',0),(27,22,'azz-the-most-loved-4/azz-the-most-loved-f2c3419c-bd00-4cff-a932-6eb680090150.png',1),(28,22,'azz-the-most-loved-4/azz-the-most-loved-cecb9a4a-5a19-42ec-a090-5181f32aef12.png',2),(29,22,'azz-the-most-loved-4/azz-the-most-loved-c3e1f425-ec81-4ddb-86cc-c7a97d9d4b77.png',3),(70,63,'zoya-flora-21/zoya-flora-5ff42736-9452-4886-b0f6-d0b00480f4fc.png',0),(71,64,'zoya-flora-21/zoya-flora-e3e4da75-bb9b-4b31-ae77-3f1a3e573e66.png',0),(72,65,'zoya-flora-21/zoya-flora-d867bd98-87ac-482f-bcb0-e095c1c1da34.png',0),(73,66,'zoya-flora-21/zoya-flora-ac09d07b-8405-4b6c-9e76-eb8167844792.png',0),(74,67,'amber-elixir-12/amber-elixir-15372107-1bfe-4213-824a-f2133b108af6.png',0),(75,68,'amber-elixir-12/amber-elixir-b130caff-5756-45ee-a453-1f25c24b8410.png',0),(76,69,'bleu-empire-13/bleu-empire-fb284b57-8a85-4311-b361-8102fc38ada4.png',0),(77,70,'bleu-empire-13/bleu-empire-840acfa6-2d93-4f0b-97ba-6dab0b31e8be.png',0),(78,71,'cherry-secret-16/cherry-secret-be40d63e-fa69-48e8-ba1d-beaf362acdaf.png',0),(79,72,'cherry-secret-16/cherry-secret-2165713e-8d31-42d3-b2d7-0470def002d1.png',0),(80,73,'aventus-apex-14/aventus-apex-59c909d9-f629-4085-ad90-b59fcb20357e.png',0),(81,74,'aventus-apex-14/aventus-apex-05d7d041-792c-4bf3-a0ad-383599266c98.png',0),(82,75,'cafe-kamra-15/cafe-kamra-84400440-1157-4daa-a5cc-e16369268bd5.png',0),(83,76,'cafe-kamra-15/cafe-kamra-01b7183c-cea9-4a25-b842-2f3f4c5eefb5.png',0),(84,77,'club-shadow-17/club-shadow-43bff136-3aac-4188-b7eb-b51c79cc76cd.png',0),(85,78,'club-shadow-17/club-shadow-a56f257d-31a5-4562-bc7d-76b545df55dd.png',0),(86,79,'sauvage-drift-18/sauvage-drift-98ce06c2-1973-455e-b381-cb84f3846667.png',0),(87,80,'sauvage-drift-18/sauvage-drift-c989ce75-d979-450b-9e68-727d2af6e5b2.png',0),(88,81,'heel-girl-19/heel-girl-3bda659a-f644-4d12-ba70-bd8141ad568f.png',0),(89,82,'heel-girl-19/heel-girl-bd0c427e-a590-432f-b841-50378596d2d7.png',0),(90,83,'rouge-glow-20/rouge-glow-fc79c9aa-627c-4b7d-b612-0685837dfc23.png',0),(91,84,'rouge-glow-20/rouge-glow-0d90b176-1844-4a17-91bf-cd6c9076815d.png',0);
/*!40000 ALTER TABLE `product_variant_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_variants` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `ml` decimal(10,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `mrp` decimal(10,2) NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_product_ml` (`product_id`,`ml`),
  CONSTRAINT `fk_variant_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_variants`
--

LOCK TABLES `product_variants` WRITE;
/*!40000 ALTER TABLE `product_variants` DISABLE KEYS */;
INSERT INTO `product_variants` VALUES (21,4,20.00,350.00,499.00,10,0),(22,4,50.00,750.00,999.00,9,1),(63,21,50.00,799.00,1999.00,6,0),(64,21,20.00,499.00,999.00,0,1),(65,21,100.00,1449.00,2699.00,0,2),(66,21,8.00,89.00,249.00,0,3),(67,12,50.00,799.00,1999.00,6,0),(68,12,20.00,499.00,999.00,1,1),(69,13,50.00,799.00,1999.00,5,0),(70,13,20.00,499.00,999.00,5,1),(71,16,50.00,799.00,1999.00,3,0),(72,16,20.00,499.00,999.00,3,1),(73,14,50.00,799.00,1999.00,8,0),(74,14,20.00,499.00,999.00,5,1),(75,15,50.00,799.00,1999.00,4,0),(76,15,20.00,499.00,999.00,4,1),(77,17,50.00,799.00,1999.00,4,0),(78,17,20.00,499.00,999.00,10,1),(79,18,50.00,799.00,1999.00,10,0),(80,18,20.00,499.00,999.00,10,1),(81,19,50.00,799.00,1999.00,8,0),(82,19,20.00,499.00,999.00,3,1),(83,20,50.00,799.00,1999.00,2,0),(84,20,20.00,499.00,999.00,5,1);
/*!40000 ALTER TABLE `product_variants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `subcategory_id` int(10) unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `mrp` decimal(10,2) NOT NULL,
  `stock` int(10) unsigned NOT NULL DEFAULT 0,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `variants_json` longtext DEFAULT NULL,
  `content_json` longtext DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `top_notes` text DEFAULT NULL,
  `middle_notes` text DEFAULT NULL,
  `base_notes` text DEFAULT NULL,
  `mood` text DEFAULT NULL,
  `mood_description` text DEFAULT NULL,
  `delivery_returns` text DEFAULT NULL,
  `ingredients` text DEFAULT NULL,
  `manufacturer` text DEFAULT NULL,
  `country_of_origin` text DEFAULT NULL,
  `product_information` text DEFAULT NULL,
  `is_bestseller` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `fk_products_subcategory` (`subcategory_id`),
  KEY `fk_products_category` (`category_id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `fk_products_subcategory` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (4,'AZZ The Most Loved',1,350.00,499.00,19,'Command the room with an undeniable presence. The Most Dangerous is expertly crafted for the modern individual who embraces bold choices and radiates magnetic confidence wherever they go.\n\n\nThis premium inspired perfume delivers a captivating fragrance experience, seamlessly blending fiery spicy notes with a deep, warm amber core. The result is a highly addictive scent profile that evolves beautifully, leaving a sophisticated and memorable trail that lingers into the night.\n\n\nDesigned for versatility, this dynamic fragrance naturally adapts to your lifestyle : \n\n• Everyday Wear: Adds a touch of daring elegance to your daily routine.\n• Office Wear: Commands a subtle, respected authority in professional settings.\n• Date Nights: Creates an intimate, irresistible, and truly unforgettable aura.\n• Parties & Celebrations: Thrives in high-energy, vibrant evening environments.\n• Travel: A striking companion for your late-night adventures abroad.\n• Seasonal Suitability: Beautifully cuts through crisp autumn and winter air.\n\n\nDiscover your ultimate signature scent with KAVIOR. Elevate your presence and always leave a lasting impression with every spray.',1,'2026-10-23 18:33:10','2026-10-31 17:58:28','[{\"ml\":20,\"price\":350,\"mrp\":499,\"stock\":10,\"photos\":[\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-57e4b6f3-32f1-403f-b373-5b37e70aee4d.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-37dae3c9-22c6-4024-b780-a543fa4691a4.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-6abdf454-0029-400c-a6ef-d9c8ac8ccfa4.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-42d85dd9-ff7d-4276-9079-48e042bf5b67.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-28794aa9-ec43-412b-9b5a-b6d2f54c54b5.png\"]},{\"ml\":50,\"price\":750,\"mrp\":999,\"stock\":10,\"photos\":[\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-4e35b2b7-abd7-4ef3-a0b0-8148cebd460e.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-f2c3419c-bd00-4cff-a932-6eb680090150.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-cecb9a4a-5a19-42ec-a090-5181f32aef12.png\",\"/api/store/product-images/azz-the-most-loved-4/azz-the-most-loved-c3e1f425-ec81-4ddb-86cc-c7a97d9d4b77.png\"]}]','{\"top_notes\":\"Cardamom, toffee, bergamot · Toffee, amber, cinnamon · Amberwood, musk, woody notes\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"The Most Dangerous is built for the night and the moments that matter most. It thrives in dimly lit venues, vibrant parties, and intimate date nights where a strong, charismatic presence is required. While it naturally elevates evening celebrations and formal gatherings, its inviting warmth also makes it a striking companion for late-night travel or crisp winter evenings. This is a scent for the individual who owns the room, radiating undeniable confidence and a magnetic personality from the first spray to the final hour.\",\"delivery_returns\":\"At Zenisa Perfumes, we believe that every fragrance deserves to reach you with care. We strive to provide a smooth, secure, and reliable delivery experience for every order.\\n\\n1. Shipping Coverage\\nWe offer shipping across India, subject to courier service availability at your delivery location.\\n\\nCurrently, international shipping is not available unless specifically confirmed by our team.\\n\\n2. Order Processing\\nOrders are typically processed within [1–2 business days] after order confirmation.\\n\\nOrders placed on Sundays or public holidays may be processed on the next working day.\\n\\nDuring festive seasons, promotional sales, or periods of high order volume, processing may take longer.\\n\\n3. Estimated Delivery Time\\nEstimated delivery timelines after dispatch are:\\n\\nMetro Cities: [3–5 business days]\\nOther Cities: [4–7 business days]\\nRemote Locations: [5–10 business days]\\nThese are estimated timelines and may vary depending on courier operations, location, weather conditions, or unforeseen circumstances.\\n\\n4. Shipping Charges\\nShipping charges, if applicable, will be displayed at checkout or communicated before order confirmation.\\n\\nAny free shipping offers will be subject to the terms and conditions mentioned on our website.\\n\\n5. Order Tracking\\nOnce your order has been dispatched, tracking details will be shared through the available communication channel, such as email, SMS, or WhatsApp, where supported.\\n\\nCustomers can use these details to monitor their shipment.\\n\\n6. Delivery Attempts\\nPlease ensure that your shipping address, contact number, and postal code are accurate.\\n\\nIf delivery is unsuccessful due to an incorrect address, customer unavailability, or repeated failed delivery attempts, additional shipping charges may apply for re-dispatch.\\n\\n7. Delayed or Lost Shipments\\nAlthough we make every effort to ensure timely delivery, unexpected courier delays may occasionally occur.\\n\\nIf your order is significantly delayed or tracking information has not updated for an extended period, please contact our support team for assistance.\\n\\n8. Damaged or Incorrect Products\\nIf you receive a damaged, leaking, or incorrect product, please contact us within [48 hours] of delivery.\\n\\nWe recommend sharing clear photographs of the product, packaging, and shipping label, along with your order details, to help us review the issue.\\n\\nResolution will be handled according to our Return & Refund Policy and applicable consumer protection laws.\\n\\n9. Address Changes and Order Cancellation\\nRequests to change the delivery address or cancel an order should be made before dispatch.\\n\\nOnce an order has been shipped, changes or cancellations may not be possible.\\n\\n10. Contact Us\\nFor shipping-related questions or assistance, please contact:\\n\\nZenisa Perfumes\\n\\nEmail: [Official Support Email]\\n\\nWhatsApp: [Official WhatsApp Number]\\n\\nCustomer Support Hours: [Support Timings]\\n\\nWe appreciate your trust in Zenisa Perfumes and look forward to delivering your favourite fragrances safely to your doorstep.\\n\\nReturn & Exchange Policy\\n\\nLast Updated: 20 October 2026\\n\\nAt Zenisa Perfumes, customer satisfaction is important to us. We take great care in ensuring that every fragrance is carefully packed and delivered in excellent condition.\\n\\nIf you experience an issue with your order, please review our Return & Exchange Policy below.\\n\\n1. Return & Exchange Eligibility\\nDue to the personal-use and hygiene-sensitive nature of perfume products, we generally do not accept returns or exchanges for change of mind, personal fragrance preferences, or products that have been opened or used.\\n\\nHowever, returns or exchanges may be considered under the following circumstances:\\n\\nYou received a damaged or leaking product.\\nYou received an incorrect product.\\nYou received a defective product.\\nAn item is missing from your order.\\nAll requests are subject to verification and applicable consumer protection laws.\\n\\n2. Reporting an Issue\\nIf you receive a damaged, defective, leaking, or incorrect product, please contact our customer support team within [48 hours] of delivery.\\n\\nTo help us review your request, please provide:\\n\\nYour order number.\\nClear photographs of the product and packaging.\\nA photograph of the shipping label.\\nA brief description of the issue.\\nAn unboxing video, if available.\\nAn unboxing video is recommended but is not mandatory for submitting a complaint.\\n\\n3. Conditions for Returns & Exchanges\\nWhere a return or exchange is approved, the following conditions may apply:\\n\\nThe product should be returned with its original packaging, where reasonably possible.\\nAll accessories and complimentary items should be included, if applicable.\\nThe product should not have been intentionally damaged or misused.\\nProof of purchase must be provided.\\nProducts received damaged or defective will be assessed based on their condition at delivery.\\n\\n4. Non-Returnable Items\\nThe following items are generally not eligible for return or exchange unless they are defective, damaged, incorrectly supplied, or otherwise required by applicable law:\\n\\nOpened or used perfume bottles.\\nProducts returned solely because the fragrance is not to the customer\'s preference.\\nProducts damaged due to improper handling or storage after delivery.\\nComplimentary gifts and promotional items.\\nSample kits and discovery sets that have been opened or used.\\nPersonalized or customized products.\\n5. Exchange Process\\nOnce your exchange request has been reviewed and approved, our team will guide you through the next steps.\\n\\nWhere an eligible product is available, we will arrange a replacement.\\n\\nIf the same product is unavailable, we may offer an appropriate alternative or a refund, depending on the circumstances and applicable law.\\n\\n6. Refund Policy\\nIf a refund is approved, it will generally be processed to the original payment method.\\n\\nEstimated Refund Timeline: [5–7 business days] after approval.\\n\\nThe time taken for the refunded amount to appear in your account may vary depending on your bank or payment provider.\\n\\nWhere an eligible order was paid through Cash on Delivery (COD), our support team will coordinate an appropriate refund method.\\n\\n7. Return Shipping Charges\\nFor verified damaged, defective, or incorrect products, Zenisa Perfumes will bear reasonable return shipping costs or arrange a suitable collection method.\\n\\nFor any other return accepted as an exception, applicable shipping charges will be communicated before processing.\\n\\n8. Order Cancellation\\nCustomers may request order cancellation before the order has been dispatched.\\n\\nOnce an order has been shipped, cancellation may not be possible. Any eligible return or refund request will be handled according to this policy and applicable law.\\n\\n9. Important Information\\nAll return, exchange, and refund requests are reviewed individually.\\nRequests should be submitted with accurate order details.\\nWe reserve the right to verify claims to prevent misuse of the return process.\\nNothing in this policy limits customers\' statutory rights under applicable consumer protection laws.\\n10. Contact Us\\nFor return, exchange, or refund assistance, please contact:\\n\\nZenisa Perfumes\\n\\nEmail: [Official Support Email]\\n\\nWhatsApp: [Official WhatsApp Number]\\n\\nCustomer Support Hours: [Support Timings]\\n\\nOur support team will assist you in resolving your concern as quickly as reasonably possible.\\n\\nThank you for choosing Zenisa Perfumes. Your trust and satisfaction matter to us.\\n\\nShipping Policy · Return & Exchange Policy\",\"ingredients\":\"\",\"manufacturer\":\"Zenisa\",\"country_of_origin\":\"India\",\"product_information\":\"\"}',1,'Cardamom, toffee, bergamot · Toffee, amber, cinnamon · Amberwood, musk, woody notes','','','','The Most Dangerous is built for the night and the moments that matter most. It thrives in dimly lit venues, vibrant parties, and intimate date nights where a strong, charismatic presence is required. While it naturally elevates evening celebrations and formal gatherings, its inviting warmth also makes it a striking companion for late-night travel or crisp winter evenings. This is a scent for the individual who owns the room, radiating undeniable confidence and a magnetic personality from the first spray to the final hour.','At Zenisa Perfumes, we believe that every fragrance deserves to reach you with care. We strive to provide a smooth, secure, and reliable delivery experience for every order.\n\n1. Shipping Coverage\nWe offer shipping across India, subject to courier service availability at your delivery location.\n\nCurrently, international shipping is not available unless specifically confirmed by our team.\n\n2. Order Processing\nOrders are typically processed within [1–2 business days] after order confirmation.\n\nOrders placed on Sundays or public holidays may be processed on the next working day.\n\nDuring festive seasons, promotional sales, or periods of high order volume, processing may take longer.\n\n3. Estimated Delivery Time\nEstimated delivery timelines after dispatch are:\n\nMetro Cities: [3–5 business days]\nOther Cities: [4–7 business days]\nRemote Locations: [5–10 business days]\nThese are estimated timelines and may vary depending on courier operations, location, weather conditions, or unforeseen circumstances.\n\n4. Shipping Charges\nShipping charges, if applicable, will be displayed at checkout or communicated before order confirmation.\n\nAny free shipping offers will be subject to the terms and conditions mentioned on our website.\n\n5. Order Tracking\nOnce your order has been dispatched, tracking details will be shared through the available communication channel, such as email, SMS, or WhatsApp, where supported.\n\nCustomers can use these details to monitor their shipment.\n\n6. Delivery Attempts\nPlease ensure that your shipping address, contact number, and postal code are accurate.\n\nIf delivery is unsuccessful due to an incorrect address, customer unavailability, or repeated failed delivery attempts, additional shipping charges may apply for re-dispatch.\n\n7. Delayed or Lost Shipments\nAlthough we make every effort to ensure timely delivery, unexpected courier delays may occasionally occur.\n\nIf your order is significantly delayed or tracking information has not updated for an extended period, please contact our support team for assistance.\n\n8. Damaged or Incorrect Products\nIf you receive a damaged, leaking, or incorrect product, please contact us within [48 hours] of delivery.\n\nWe recommend sharing clear photographs of the product, packaging, and shipping label, along with your order details, to help us review the issue.\n\nResolution will be handled according to our Return & Refund Policy and applicable consumer protection laws.\n\n9. Address Changes and Order Cancellation\nRequests to change the delivery address or cancel an order should be made before dispatch.\n\nOnce an order has been shipped, changes or cancellations may not be possible.\n\n10. Contact Us\nFor shipping-related questions or assistance, please contact:\n\nZenisa Perfumes\n\nEmail: [Official Support Email]\n\nWhatsApp: [Official WhatsApp Number]\n\nCustomer Support Hours: [Support Timings]\n\nWe appreciate your trust in Zenisa Perfumes and look forward to delivering your favourite fragrances safely to your doorstep.\n\nReturn & Exchange Policy\n\nLast Updated: 20 October 2026\n\nAt Zenisa Perfumes, customer satisfaction is important to us. We take great care in ensuring that every fragrance is carefully packed and delivered in excellent condition.\n\nIf you experience an issue with your order, please review our Return & Exchange Policy below.\n\n1. Return & Exchange Eligibility\nDue to the personal-use and hygiene-sensitive nature of perfume products, we generally do not accept returns or exchanges for change of mind, personal fragrance preferences, or products that have been opened or used.\n\nHowever, returns or exchanges may be considered under the following circumstances:\n\nYou received a damaged or leaking product.\nYou received an incorrect product.\nYou received a defective product.\nAn item is missing from your order.\nAll requests are subject to verification and applicable consumer protection laws.\n\n2. Reporting an Issue\nIf you receive a damaged, defective, leaking, or incorrect product, please contact our customer support team within [48 hours] of delivery.\n\nTo help us review your request, please provide:\n\nYour order number.\nClear photographs of the product and packaging.\nA photograph of the shipping label.\nA brief description of the issue.\nAn unboxing video, if available.\nAn unboxing video is recommended but is not mandatory for submitting a complaint.\n\n3. Conditions for Returns & Exchanges\nWhere a return or exchange is approved, the following conditions may apply:\n\nThe product should be returned with its original packaging, where reasonably possible.\nAll accessories and complimentary items should be included, if applicable.\nThe product should not have been intentionally damaged or misused.\nProof of purchase must be provided.\nProducts received damaged or defective will be assessed based on their condition at delivery.\n\n4. Non-Returnable Items\nThe following items are generally not eligible for return or exchange unless they are defective, damaged, incorrectly supplied, or otherwise required by applicable law:\n\nOpened or used perfume bottles.\nProducts returned solely because the fragrance is not to the customer\'s preference.\nProducts damaged due to improper handling or storage after delivery.\nComplimentary gifts and promotional items.\nSample kits and discovery sets that have been opened or used.\nPersonalized or customized products.\n5. Exchange Process\nOnce your exchange request has been reviewed and approved, our team will guide you through the next steps.\n\nWhere an eligible product is available, we will arrange a replacement.\n\nIf the same product is unavailable, we may offer an appropriate alternative or a refund, depending on the circumstances and applicable law.\n\n6. Refund Policy\nIf a refund is approved, it will generally be processed to the original payment method.\n\nEstimated Refund Timeline: [5–7 business days] after approval.\n\nThe time taken for the refunded amount to appear in your account may vary depending on your bank or payment provider.\n\nWhere an eligible order was paid through Cash on Delivery (COD), our support team will coordinate an appropriate refund method.\n\n7. Return Shipping Charges\nFor verified damaged, defective, or incorrect products, Zenisa Perfumes will bear reasonable return shipping costs or arrange a suitable collection method.\n\nFor any other return accepted as an exception, applicable shipping charges will be communicated before processing.\n\n8. Order Cancellation\nCustomers may request order cancellation before the order has been dispatched.\n\nOnce an order has been shipped, cancellation may not be possible. Any eligible return or refund request will be handled according to this policy and applicable law.\n\n9. Important Information\nAll return, exchange, and refund requests are reviewed individually.\nRequests should be submitted with accurate order details.\nWe reserve the right to verify claims to prevent misuse of the return process.\nNothing in this policy limits customers\' statutory rights under applicable consumer protection laws.\n10. Contact Us\nFor return, exchange, or refund assistance, please contact:\n\nZenisa Perfumes\n\nEmail: [Official Support Email]\n\nWhatsApp: [Official WhatsApp Number]\n\nCustomer Support Hours: [Support Timings]\n\nOur support team will assist you in resolving your concern as quickly as reasonably possible.\n\nThank you for choosing Zenisa Perfumes. Your trust and satisfaction matter to us.\n\nShipping Policy · Return & Exchange Policy','','Zenisa','India','',1),(12,'Amber Elixir',1,799.00,1999.00,7,'Amber Elixir by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:33','2026-10-31 17:50:43','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":6,\"photos\":[\"/api/store/product-images/amber-elixir-12/amber-elixir-15372107-1bfe-4213-824a-f2133b108af6.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":1,\"photos\":[\"/api/store/product-images/amber-elixir-12/amber-elixir-b130caff-5756-45ee-a453-1f25c24b8410.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/amber-elixir\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/amber-elixir',0),(13,'Bleu Empire',1,799.00,1999.00,10,'Bleu Empire by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:33','2026-10-31 17:52:24','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":5,\"photos\":[\"/api/store/product-images/bleu-empire-13/bleu-empire-fb284b57-8a85-4311-b361-8102fc38ada4.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":5,\"photos\":[\"/api/store/product-images/bleu-empire-13/bleu-empire-840acfa6-2d93-4f0b-97ba-6dab0b31e8be.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/bleu-empire\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/bleu-empire',0),(14,'Aventus Apex',1,799.00,1999.00,13,'Aventus Apex by KAVIOR. Available sizes: 50 ml, 20 ml',1,'2026-10-31 17:16:33','2026-10-31 17:54:30','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":8,\"photos\":[\"/api/store/product-images/aventus-apex-14/aventus-apex-59c909d9-f629-4085-ad90-b59fcb20357e.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":5,\"photos\":[\"/api/store/product-images/aventus-apex-14/aventus-apex-05d7d041-792c-4bf3-a0ad-383599266c98.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"\"}',1,'','','','','','','','','','',0),(15,'Cafe Kamra',3,799.00,1999.00,8,'Cafe Kamra by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:33','2026-10-31 17:54:54','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":4,\"photos\":[\"/api/store/product-images/cafe-kamra-15/cafe-kamra-84400440-1157-4daa-a5cc-e16369268bd5.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":4,\"photos\":[\"/api/store/product-images/cafe-kamra-15/cafe-kamra-01b7183c-cea9-4a25-b842-2f3f4c5eefb5.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/cafe-kamra\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/cafe-kamra',0),(16,'Cherry Secret',3,799.00,1999.00,6,'Cherry Secret by KAVIOR. Available sizes: 50 ml, 20 ml',1,'2026-10-31 17:16:33','2026-10-31 17:53:43','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":3,\"photos\":[\"/api/store/product-images/cherry-secret-16/cherry-secret-be40d63e-fa69-48e8-ba1d-beaf362acdaf.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":3,\"photos\":[\"/api/store/product-images/cherry-secret-16/cherry-secret-2165713e-8d31-42d3-b2d7-0470def002d1.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"\"}',1,'','','','','','','','','','',0),(17,'Club Shadow',1,799.00,1999.00,14,'Club Shadow by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:33','2026-10-31 17:55:16','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":4,\"photos\":[\"/api/store/product-images/club-shadow-17/club-shadow-43bff136-3aac-4188-b7eb-b51c79cc76cd.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":10,\"photos\":[\"/api/store/product-images/club-shadow-17/club-shadow-a56f257d-31a5-4562-bc7d-76b545df55dd.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/club-shadow\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/club-shadow',0),(18,'Sauvage Drift',1,799.00,1999.00,20,'Sauvage Drift by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:33','2026-10-31 17:55:35','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":10,\"photos\":[\"/api/store/product-images/sauvage-drift-18/sauvage-drift-98ce06c2-1973-455e-b381-cb84f3846667.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":10,\"photos\":[\"/api/store/product-images/sauvage-drift-18/sauvage-drift-c989ce75-d979-450b-9e68-727d2af6e5b2.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/sauvage-drift\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/sauvage-drift',0),(19,'Heel & Girl',2,799.00,1999.00,11,'Heel & Girl by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:34','2026-11-17 11:58:55','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":9,\"photos\":[\"/api/store/product-images/heel-girl-19/heel-girl-3bda659a-f644-4d12-ba70-bd8141ad568f.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":3,\"photos\":[\"/api/store/product-images/heel-girl-19/heel-girl-bd0c427e-a590-432f-b841-50378596d2d7.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/heel-and-girl\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/heel-and-girl',0),(20,'Rouge Glow',3,799.00,1999.00,7,'Rouge Glow by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:34','2026-11-17 11:58:55','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":4,\"photos\":[\"/api/store/product-images/rouge-glow-20/rouge-glow-fc79c9aa-627c-4b7d-b612-0685837dfc23.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":6,\"photos\":[\"/api/store/product-images/rouge-glow-20/rouge-glow-0d90b176-1844-4a17-91bf-cd6c9076815d.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"\"}',1,'','','','','','','','','','',0),(21,'Zoya & Flora',2,799.00,1999.00,6,'Zoya & Flora by KAVIOR. Available sizes: 50 ml, 20 ml, 100 ml, 8 ml.',1,'2026-10-31 17:16:34','2026-10-31 17:58:28','[{\"ml\":50,\"price\":799,\"mrp\":1999,\"stock\":7,\"photos\":[\"/api/store/product-images/zoya-flora-21/zoya-flora-5ff42736-9452-4886-b0f6-d0b00480f4fc.png\"]},{\"ml\":20,\"price\":499,\"mrp\":999,\"stock\":0,\"photos\":[\"/api/store/product-images/zoya-flora-21/zoya-flora-e3e4da75-bb9b-4b31-ae77-3f1a3e573e66.png\"]},{\"ml\":100,\"price\":1449,\"mrp\":2699,\"stock\":0,\"photos\":[\"/api/store/product-images/zoya-flora-21/zoya-flora-d867bd98-87ac-482f-bcb0-e095c1c1da34.png\"]},{\"ml\":8,\"price\":89,\"mrp\":249,\"stock\":0,\"photos\":[\"/api/store/product-images/zoya-flora-21/zoya-flora-ac09d07b-8405-4b6c-9e76-eb8167844792.png\"]}]','{\"top_notes\":\"\",\"middle_notes\":\"\",\"base_notes\":\"\",\"mood\":\"\",\"mood_description\":\"\",\"delivery_returns\":\"\",\"ingredients\":\"\",\"manufacturer\":\"\",\"country_of_origin\":\"\",\"product_information\":\"Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/zoya-and-flora\"}',1,'','','','','','','','','','Brand: KAVIOR. Catalogue source: https://kaviorperfume.com/products/zoya-and-flora',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refund_policy`
--

DROP TABLE IF EXISTS `refund_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `refund_policy` (
  `id` tinyint(3) unsigned NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refund_policy`
--

LOCK TABLES `refund_policy` WRITE;
/*!40000 ALTER TABLE `refund_policy` DISABLE KEYS */;
INSERT INTO `refund_policy` VALUES (1,'<p>Refund Policy</p><p><strong>Last Updated: 20 October 2026</strong></p><p>At <strong>Zenisa Perfumes</strong>, we are committed to providing our customers with a smooth and satisfying shopping experience. We carefully inspect and package our fragrances to ensure they reach you in excellent condition.</p><p>If you experience an issue with your order, our team will assist you in resolving it fairly and efficiently.</p><h2>1. Refund Eligibility</h2><p>Refunds may be provided under the following circumstances:</p><ul><li>You receive a damaged or leaking perfume bottle.</li><li>You receive an incorrect product.</li><li>You receive a defective product.</li><li>Your prepaid order is cancelled before dispatch.</li><li>Your order cannot be fulfilled due to product unavailability.</li><li>Your confirmed prepaid order is not delivered and is determined to be lost in transit.</li><li>A refund is otherwise required under applicable consumer protection laws.</li></ul><p>All refund requests are subject to appropriate verification.</p><h2>2. Non-Refundable Products</h2><p>Due to the personal-use nature of perfumes, refunds are generally not available for:</p><ul><li>Change of mind after purchase.</li><li>Personal dislike of a fragrance or scent preference.</li><li>Opened or used perfumes without a verified defect.</li><li>Products damaged due to improper handling or storage after delivery.</li><li>Opened or used sample kits and discovery sets without a verified defect.</li><li>Customized or personalized products without a verified issue.</li></ul><p>These restrictions do not apply where a refund or other remedy is required under applicable law.</p><h2>3. Reporting Damaged or Incorrect Products</h2><p>If you receive a damaged, defective, leaking, or incorrect product, please contact our customer support team within <strong>[48 hours]</strong> of delivery.</p><p>To help us review your request, please provide:</p><ul><li>Order number.</li><li>Registered contact details.</li><li>Clear photographs of the product.</li><li>Photographs of the outer packaging and shipping label.</li><li>A brief explanation of the issue.</li><li>An unboxing video, if available.</li></ul><p>An unboxing video is recommended but is not mandatory.</p><p>Requests submitted after the suggested reporting period will still be considered where required by applicable law.</p><h2>4. Refund Request Process</h2><p>To request a refund:</p><ol><li>Contact Zenisa Perfumes through our official email or WhatsApp support.</li><li>Share your order number and details of the issue.</li><li>Submit supporting photographs or other relevant information.</li><li>Our support team will review your request.</li><li>If approved, we will communicate the refund amount, method, and expected processing timeline.</li></ol><p>We may request additional information where reasonably necessary to verify the issue.</p><h2>5. Refund Processing Time</h2><p>Once a refund has been approved, we aim to initiate it within <strong>[5–7 business days]</strong>.</p><p>The time required for the amount to appear in your account may vary depending on the bank or payment service provider.</p><p>Refund status updates will be communicated through the available contact channel.</p><h2>6. Refund Methods</h2><p>Approved refunds will generally be processed through the original payment method.</p><p>Depending on the payment method used:</p><ul><li><strong>UPI Payments:</strong> Refunds may be processed to the original UPI payment source.</li><li><strong>Debit/Credit Cards:</strong> Refunds may be credited to the original card through the payment provider.</li><li><strong>Net Banking:</strong> Refunds may be credited to the original bank account.</li><li><strong>Cash on Delivery (COD):</strong> Eligible refunds may be processed through bank transfer or UPI after verification of the customer\'s details.</li></ul><p>The available refund method will be confirmed by our support team.</p><h2>7. Order Cancellation and Refunds</h2><p>Customers may request cancellation before an order has been dispatched.</p><p>For eligible prepaid orders cancelled before dispatch, the amount paid will be refunded according to the applicable processing timeline.</p><p>Once an order has been dispatched, cancellation may not be possible. Any subsequent refund request will be reviewed under our Return &amp; Exchange Policy and applicable law.</p><h2>8. Refunds for Lost or Undelivered Orders</h2><p>If a prepaid order is confirmed lost in transit or cannot be delivered due to an issue attributable to Zenisa Perfumes or its delivery partners, the customer may be eligible for a replacement or refund.</p><p>Our team may coordinate with the courier provider to verify the shipment status before processing the request.</p><h2>9. Promotional Offers and Combo Purchases</h2><p>For purchases made under promotional offers, combo deals, discounts, or free-gift campaigns, the refund amount will be calculated based on the actual amount paid and the applicable offer conditions.</p><p>If a partial refund affects the eligibility of a promotional offer, any adjustment will be clearly explained to the customer and made only where permitted by applicable law.</p><p>Refunds will not exceed the amount actually paid for the relevant products, except where otherwise required by law.</p><h2>10. Return Shipping Charges</h2><p>For verified damaged, defective, or incorrect products, Zenisa Perfumes will bear reasonable return shipping costs or arrange an appropriate collection method.</p><p>Where another return is accepted as an exception, any applicable shipping charges will be communicated in advance.</p><h2>11. Delayed or Missing Refunds</h2><p>If your approved refund has not been received within the communicated timeline:</p><ul><li>Check your bank account or original payment method.</li><li>Contact your bank or payment provider to confirm whether the refund is being processed.</li><li>Contact Zenisa Perfumes with your order number and refund details for further assistance.</li></ul><p>Our team will help investigate the delay.</p><h2>12. Contact Us</h2><p>For refund-related questions, requests, or assistance, please contact:</p><p><strong>Zenisa Perfumes</strong></p><p><strong>Email:</strong> [Official Support Email]</p><p><strong>WhatsApp:</strong> [Official WhatsApp Number]</p><p><strong>Business Address:</strong> [Registered Business Address]</p><p><strong>Customer Support Hours:</strong> [Support Timings]</p><p>We aim to resolve refund-related concerns fairly and as quickly as reasonably possible.</p><h2>13. Consumer Rights</h2><p>Nothing in this Refund Policy limits or excludes any rights or remedies available to customers under applicable Indian consumer protection laws.</p><hr /><p><strong>Thank you for shopping with Zenisa Perfumes. Your trust and satisfaction are important to us.</strong></p>','2026-10-20 17:58:48','2026-10-20 17:58:48');
/*!40000 ALTER TABLE `refund_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `return_exchange_policy`
--

DROP TABLE IF EXISTS `return_exchange_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `return_exchange_policy` (
  `id` tinyint(3) unsigned NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `return_exchange_policy`
--

LOCK TABLES `return_exchange_policy` WRITE;
/*!40000 ALTER TABLE `return_exchange_policy` DISABLE KEYS */;
INSERT INTO `return_exchange_policy` VALUES (1,'<p>Return &amp; Exchange Policy</p><p><strong>Last Updated: 20 October 2026</strong></p><p>At <strong>Zenisa Perfumes</strong>, customer satisfaction is important to us. We take great care in ensuring that every fragrance is carefully packed and delivered in excellent condition.</p><p>If you experience an issue with your order, please review our Return &amp; Exchange Policy below.</p><h2>1. Return &amp; Exchange Eligibility</h2><p>Due to the personal-use and hygiene-sensitive nature of perfume products, we generally do not accept returns or exchanges for change of mind, personal fragrance preferences, or products that have been opened or used.</p><p>However, returns or exchanges may be considered under the following circumstances:</p><ul><li>You received a damaged or leaking product.</li><li>You received an incorrect product.</li><li>You received a defective product.</li><li>An item is missing from your order.</li></ul><p>All requests are subject to verification and applicable consumer protection laws.</p><h2>2. Reporting an Issue</h2><p>If you receive a damaged, defective, leaking, or incorrect product, please contact our customer support team within <strong>[48 hours]</strong> of delivery.</p><p>To help us review your request, please provide:</p><ul><li>Your order number.</li><li>Clear photographs of the product and packaging.</li><li>A photograph of the shipping label.</li><li>A brief description of the issue.</li><li>An unboxing video, if available.</li></ul><p>An unboxing video is recommended but is not mandatory for submitting a complaint.</p><h2>3. Conditions for Returns &amp; Exchanges</h2><p>Where a return or exchange is approved, the following conditions may apply:</p><ul><li>The product should be returned with its original packaging, where reasonably possible.</li><li>All accessories and complimentary items should be included, if applicable.</li><li>The product should not have been intentionally damaged or misused.</li><li>Proof of purchase must be provided.</li></ul><p>Products received damaged or defective will be assessed based on their condition at delivery.</p><h2>4. Non-Returnable Items</h2><p>The following items are generally not eligible for return or exchange unless they are defective, damaged, incorrectly supplied, or otherwise required by applicable law:</p><ul><li>Opened or used perfume bottles.</li><li>Products returned solely because the fragrance is not to the customer\'s preference.</li><li>Products damaged due to improper handling or storage after delivery.</li><li>Complimentary gifts and promotional items.</li><li>Sample kits and discovery sets that have been opened or used.</li><li>Personalized or customized products.</li></ul><h2>5. Exchange Process</h2><p>Once your exchange request has been reviewed and approved, our team will guide you through the next steps.</p><p>Where an eligible product is available, we will arrange a replacement.</p><p>If the same product is unavailable, we may offer an appropriate alternative or a refund, depending on the circumstances and applicable law.</p><h2>6. Refund Policy</h2><p>If a refund is approved, it will generally be processed to the original payment method.</p><p><strong>Estimated Refund Timeline:</strong> [5–7 business days] after approval.</p><p>The time taken for the refunded amount to appear in your account may vary depending on your bank or payment provider.</p><p>Where an eligible order was paid through Cash on Delivery (COD), our support team will coordinate an appropriate refund method.</p><h2>7. Return Shipping Charges</h2><p>For verified damaged, defective, or incorrect products, Zenisa Perfumes will bear reasonable return shipping costs or arrange a suitable collection method.</p><p>For any other return accepted as an exception, applicable shipping charges will be communicated before processing.</p><h2>8. Order Cancellation</h2><p>Customers may request order cancellation before the order has been dispatched.</p><p>Once an order has been shipped, cancellation may not be possible. Any eligible return or refund request will be handled according to this policy and applicable law.</p><h2>9. Important Information</h2><ul><li>All return, exchange, and refund requests are reviewed individually.</li><li>Requests should be submitted with accurate order details.</li><li>We reserve the right to verify claims to prevent misuse of the return process.</li><li>Nothing in this policy limits customers\' statutory rights under applicable consumer protection laws.</li></ul><h2>10. Contact Us</h2><p>For return, exchange, or refund assistance, please contact:</p><p><strong>Zenisa Perfumes</strong></p><p><strong>Email:</strong> [Official Support Email]</p><p><strong>WhatsApp:</strong> [Official WhatsApp Number]</p><p><strong>Customer Support Hours:</strong> [Support Timings]</p><p>Our support team will assist you in resolving your concern as quickly as reasonably possible.</p><p><strong>Thank you for choosing Zenisa Perfumes. Your trust and satisfaction matter to us.</strong></p>','2026-10-20 17:50:50','2026-10-20 17:50:50');
/*!40000 ALTER TABLE `return_exchange_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_policy`
--

DROP TABLE IF EXISTS `shipping_policy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shipping_policy` (
  `id` tinyint(3) unsigned NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_policy`
--

LOCK TABLES `shipping_policy` WRITE;
/*!40000 ALTER TABLE `shipping_policy` DISABLE KEYS */;
INSERT INTO `shipping_policy` VALUES (1,'<p>At <strong>Zenisa Perfumes</strong>, we believe that every fragrance deserves to reach you with care. We strive to provide a smooth, secure, and reliable delivery experience for every order.</p><h2>1. Shipping Coverage</h2><p>We offer shipping across India, subject to courier service availability at your delivery location.</p><p>Currently, international shipping is not available unless specifically confirmed by our team.</p><h2>2. Order Processing</h2><p>Orders are typically processed within <strong>[1–2 business days]</strong> after order confirmation.</p><p>Orders placed on Sundays or public holidays may be processed on the next working day.</p><p>During festive seasons, promotional sales, or periods of high order volume, processing may take longer.</p><h2>3. Estimated Delivery Time</h2><p>Estimated delivery timelines after dispatch are:</p><ul><li><strong>Metro Cities:</strong> [3–5 business days]</li><li><strong>Other Cities:</strong> [4–7 business days]</li><li><strong>Remote Locations:</strong> [5–10 business days]</li></ul><p>These are estimated timelines and may vary depending on courier operations, location, weather conditions, or unforeseen circumstances.</p><h2>4. Shipping Charges</h2><p>Shipping charges, if applicable, will be displayed at checkout or communicated before order confirmation.</p><p>Any free shipping offers will be subject to the terms and conditions mentioned on our website.</p><h2>5. Order Tracking</h2><p>Once your order has been dispatched, tracking details will be shared through the available communication channel, such as email, SMS, or WhatsApp, where supported.</p><p>Customers can use these details to monitor their shipment.</p><h2>6. Delivery Attempts</h2><p>Please ensure that your shipping address, contact number, and postal code are accurate.</p><p>If delivery is unsuccessful due to an incorrect address, customer unavailability, or repeated failed delivery attempts, additional shipping charges may apply for re-dispatch.</p><h2>7. Delayed or Lost Shipments</h2><p>Although we make every effort to ensure timely delivery, unexpected courier delays may occasionally occur.</p><p>If your order is significantly delayed or tracking information has not updated for an extended period, please contact our support team for assistance.</p><h2>8. Damaged or Incorrect Products</h2><p>If you receive a damaged, leaking, or incorrect product, please contact us within <strong>[48 hours]</strong> of delivery.</p><p>We recommend sharing clear photographs of the product, packaging, and shipping label, along with your order details, to help us review the issue.</p><p>Resolution will be handled according to our Return &amp; Refund Policy and applicable consumer protection laws.</p><h2>9. Address Changes and Order Cancellation</h2><p>Requests to change the delivery address or cancel an order should be made before dispatch.</p><p>Once an order has been shipped, changes or cancellations may not be possible.</p><h2>10. Contact Us</h2><p>For shipping-related questions or assistance, please contact:</p><p><strong>Zenisa Perfumes</strong></p><p>Email: [Official Support Email]</p><p>WhatsApp: [Official WhatsApp Number]</p><p>Customer Support Hours: [Support Timings]</p><p>We appreciate your trust in Zenisa Perfumes and look forward to delivering your favourite fragrances safely to your doorstep.</p>','2026-10-20 17:13:29','2026-10-20 17:14:02');
/*!40000 ALTER TABLE `shipping_policy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned NOT NULL,
  `name` varchar(120) NOT NULL,
  `slug` varchar(140) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_path` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_subcategories_parent_slug` (`category_id`,`slug`),
  KEY `idx_subcategories_active` (`is_active`),
  CONSTRAINT `fk_subcategories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,1,'Men','men','',1,'2026-10-20 16:45:11','2026-10-21 17:53:01','men-1/men-dab930c4-2d16-4471-bae8-4f0a3ec8571e.png'),(2,1,'Women','women','',1,'2026-10-20 16:45:22','2026-10-21 17:54:26','women-2/women-814d3bab-7007-4e5b-95ab-eda77eeb29a9.png'),(3,1,'Unisex','unisex','',1,'2026-10-20 16:45:33','2026-10-21 17:55:26','unisex-3/unisex-99b5b867-fdd0-4c3e-8538-679e7c1159c1.png'),(4,3,'Fresh & Citrus','fresh-citrus','Bright, clean and uplifting',1,'2026-10-20 16:46:17','2026-10-24 09:34:04','fresh-citrus-4/fresh-citrus-de44c2ad-bede-4e9a-bb71-57cb50f145b6.png'),(5,3,'Floral','floral','Elegant, romantic and graceful',1,'2026-10-20 16:46:29','2026-10-24 09:34:15','floral-5/floral-38086265-bf2d-44fa-b3ac-2b42ab4a4534.png'),(6,3,'Woody','woody','Smooth, comforting and sophisticated',1,'2026-10-20 16:46:41','2026-10-24 09:34:39','woody-6/woody-08a2d162-d6f1-4332-ba06-e90e2092c560.png'),(7,3,'Amber & Spicy','amber-spicy','Warm, sensual and expressive',1,'2026-10-20 16:46:53','2026-10-24 09:34:49','amber-spicy-7/amber-spicy-66bc5e3f-c154-4b33-8d5f-814f2f238320.png'),(8,3,'Sweet & Vanilla','sweet-vanilla','Soft, cosy and beautifully sweet',1,'2026-10-20 16:47:01','2026-10-24 09:35:01','sweet-vanilla-8/sweet-vanilla-e61d99f6-cb7d-43d6-8c08-24f8e6a2f526.png'),(9,3,'Aquatic','aquatic','Cool, breezy and refreshing',1,'2026-10-20 16:47:14','2026-10-24 09:35:11','aquatic-9/aquatic-ce0129d0-d449-42b5-9385-20ae2ff8f41b.png'),(10,4,'Everyday Wear','everyday-wear','Fresh, effortless and versatile',1,'2026-10-20 16:47:38','2026-10-24 09:57:22','everyday-wear-10/everyday-wear-5723ed3f-0f21-4d7b-948b-bae3fcfa70ca.png'),(11,4,'Office Wear','office-wear','Confident, professional and polished',1,'2026-10-20 16:47:47','2026-10-24 09:57:33','office-wear-11/office-wear-b782a5c1-dc55-4379-b89d-4918238a21f1.png'),(12,4,'Gym Wear','gym-wear','Energetic, fresh and long-lasting',1,'2026-10-20 16:47:57','2026-10-24 09:57:49','gym-wear-12/gym-wear-f9afb5c0-a666-4c4c-8992-9fc6dd5de639.png'),(13,4,'Date Night','date-night','Sensual, captivating and memorable',1,'2026-10-20 16:48:12','2026-10-24 09:58:02','date-night-13/date-night-d849f56a-c6bb-440d-acaf-a06b91d7c50e.png'),(14,4,'Party Wear','party-wear','Bold, vibrant and attention-grabbing',1,'2026-10-20 16:48:25','2026-10-24 09:58:13','party-wear-14/party-wear-3e1103c1-b336-4f3b-bc1a-2b98d5c95cd3.png'),(15,4,'Wedding Wear','wedding-wear','Elegant, timeless and unforgettable',1,'2026-10-20 16:49:12','2026-10-24 09:58:24','wedding-wear-15/wedding-wear-fbc8d072-dc5c-48da-92f0-c877cd3cae32.png');
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `terms_condition`
--

DROP TABLE IF EXISTS `terms_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `terms_condition` (
  `id` tinyint(3) unsigned NOT NULL,
  `content_html` longtext NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `terms_condition`
--

LOCK TABLES `terms_condition` WRITE;
/*!40000 ALTER TABLE `terms_condition` DISABLE KEYS */;
INSERT INTO `terms_condition` VALUES (1,'<p>Terms &amp; Conditions</p><p><strong>Last Updated: 20 October 2026</strong></p><p>Welcome to <strong>Zenisa Perfumes</strong>!</p><p>These Terms &amp; Conditions govern your access to and use of our website, products, and services. Please read them carefully before browsing our website or placing an order.</p><p>By accessing or using our website, you agree to comply with these Terms &amp; Conditions, subject to applicable laws.</p><p>If you do not agree with these terms, please discontinue using our website.</p><h2>1. General Information</h2><p>Zenisa Perfumes operates an online platform offering perfumes, fragrances, discovery sets, gift collections, and related products.</p><p>We reserve the right to update our product offerings, website content, prices, and services from time to time.</p><p>These Terms &amp; Conditions apply to all visitors, customers, and users of our website.</p><h2>2. Eligibility</h2><p>By placing an order, you confirm that you are legally capable of entering into a binding contract under applicable Indian laws.</p><p>If you are using our website on behalf of another person or organization, you confirm that you have the necessary authorization.</p><h2>3. Product Information</h2><p>We make reasonable efforts to ensure that product descriptions, images, fragrance notes, sizes, prices, and other details displayed on our website are accurate.</p><p>However:</p><ul><li>Product packaging may vary slightly from the images shown.</li><li>Colours may appear different depending on screen settings.</li><li>Fragrance preferences and perceptions may vary from person to person.</li><li>Fragrance longevity and performance may vary depending on skin type, weather, application, and storage conditions.</li><li>Product availability may change without prior notice.</li></ul><p>We reserve the right to correct genuine errors or inaccuracies in product listings.</p><p>Nothing in this section limits customers\' statutory rights regarding misleading descriptions, defective products, or other matters protected by applicable law.</p><h2>4. Pricing and Payments</h2><p>All prices displayed on our website are in Indian Rupees (INR), unless otherwise specified.</p><p>Applicable taxes, delivery charges, and other fees will be disclosed before order confirmation.</p><p>We reserve the right to revise product prices and promotional offers at any time. Price changes will not affect orders already accepted, except where permitted by applicable law.</p><p>Payments may be accepted through the methods displayed or communicated during checkout, which may include online payment options, UPI, or Cash on Delivery (COD), subject to availability.</p><p>Orders requiring advance payment will be processed according to the payment terms communicated at checkout.</p><h2>5. Order Placement and Confirmation</h2><p>When placing an order, customers are responsible for providing accurate and complete information, including:</p><ul><li>Full name</li><li>Contact number</li><li>Email address, where required</li><li>Complete shipping address</li><li>Correct postal code</li><li>Product selection and quantity</li></ul><p>After an order is placed, an acknowledgment or confirmation may be sent through email, SMS, or WhatsApp.</p><p>An order acknowledgment does not necessarily mean the order has been accepted for dispatch.</p><p>We may contact customers to verify order details or payment information before processing.</p><h2>6. Order Cancellation</h2><p>Customers may request cancellation before an order has been dispatched.</p><p>Once an order has been shipped, cancellation may not be possible.</p><p>If an accepted order cannot be fulfilled because of stock unavailability, payment issues, or other legitimate reasons, we will inform the customer and arrange an appropriate refund for any amount already paid.</p><p>Cancellation and refund requests will be handled in accordance with our Return &amp; Exchange Policy and applicable consumer protection laws.</p><h2>7. Shipping and Delivery</h2><p>Zenisa Perfumes aims to process and dispatch orders within the timelines communicated on our website.</p><p>Delivery timelines are estimates and may vary depending on:</p><ul><li>Delivery location</li><li>Courier service availability</li><li>Weather conditions</li><li>Public holidays</li><li>Unexpected logistical delays</li></ul><p>Customers are responsible for providing accurate delivery information.</p><p>For more information, please refer to our <strong>Shipping Policy</strong>.</p><h2>8. Returns, Exchanges and Refunds</h2><p>Due to the personal-use nature of fragrance products, certain returns or exchanges may be restricted, particularly for opened or used products where no defect or other valid issue exists.</p><p>Customers may be eligible for a return, exchange, replacement, or refund in cases involving damaged, defective, incorrect, or otherwise non-compliant products, subject to our Return &amp; Exchange Policy and applicable laws.</p><p>For detailed information, please refer to our <strong>Return &amp; Exchange Policy</strong>.</p><p>Nothing in these Terms &amp; Conditions excludes or restricts rights available to consumers under applicable Indian laws.</p><h2>9. Promotional Offers and Discounts</h2><p>Zenisa Perfumes may introduce promotional offers, discount codes, combo deals, free gifts, and limited-time campaigns.</p><p>Promotional offers may be subject to:</p><ul><li>Specific validity periods</li><li>Minimum purchase requirements</li><li>Selected product eligibility</li><li>Stock availability</li><li>Quantity restrictions</li><li>Other clearly disclosed promotional conditions</li></ul><p>Unless expressly stated otherwise, multiple promotional offers may not be combined.</p><p>We reserve the right to withdraw or modify future promotions, subject to applicable law and commitments already made to customers.</p><h2>10. Product Usage and Safety</h2><p>Customers should use perfume products according to the instructions and precautions provided on the packaging.</p><p>For safe usage:</p><ul><li>Avoid direct contact with eyes.</li><li>Keep products away from flames and excessive heat.</li><li>Store fragrances in a cool, dry place.</li><li>Keep products out of reach of children.</li><li>Discontinue use if irritation or an adverse reaction occurs.</li><li>Consider testing a small amount before regular use if you have sensitive skin.</li></ul><p>Zenisa Perfumes is not responsible for damage resulting solely from misuse, improper storage, or use contrary to clear product safety instructions, to the extent permitted by applicable law.</p><h2>11. Intellectual Property</h2><p>All original website content, including the Zenisa Perfumes brand name, logos, graphics, product photographs, descriptions, website design, and other materials owned by Zenisa Perfumes, is protected by applicable intellectual property laws.</p><p>Customers and website visitors may not reproduce, distribute, modify, or commercially use protected content without appropriate authorization.</p><p>Third-party trademarks and brand names remain the property of their respective owners.</p><h2>12. User Responsibilities</h2><p>When using our website, you agree not to:</p><ul><li>Provide false or misleading information.</li><li>Engage in fraudulent transactions.</li><li>Attempt unauthorized access to our website or systems.</li><li>Upload or transmit harmful software or malicious code.</li><li>Interfere with website functionality or security.</li><li>Misuse promotional offers or payment systems.</li><li>Violate applicable laws or the rights of others.</li></ul><p>We may restrict access or take appropriate action where misuse is reasonably identified.</p><h2>13. Third-Party Links and Services</h2><p>Our website may contain links to third-party websites, payment providers, social media platforms, or external services.</p><p>These services may operate under their own terms and privacy policies.</p><p>Zenisa Perfumes is not responsible for third-party content or services beyond its reasonable control, except where responsibility arises under applicable law.</p><h2>14. Limitation of Liability</h2><p>We make reasonable efforts to maintain accurate information and reliable website functionality.</p><p>However, temporary interruptions, technical errors, or delays may occasionally occur.</p><p>To the extent permitted by applicable law, Zenisa Perfumes will not be responsible for indirect or consequential losses arising solely from circumstances beyond its reasonable control.</p><p>Nothing in these Terms &amp; Conditions excludes liability that cannot lawfully be excluded or limits any mandatory consumer protection rights.</p><h2>15. Privacy and Data Protection</h2><p>We respect customer privacy and handle personal information in accordance with our Privacy Policy and applicable data protection laws.</p><p>Please review our <strong>Privacy Policy</strong> to understand how customer information is collected, used, stored, and protected.</p><h2>16. Changes to Terms &amp; Conditions</h2><p>Zenisa Perfumes may update these Terms &amp; Conditions to reflect changes in business operations, services, or legal requirements.</p><p>Updated terms will be published on this page with a revised \"Last Updated\" date.</p><p>Changes will not retroactively remove rights that customers have already acquired under applicable law.</p><h2>17. Governing Law and Dispute Resolution</h2><p>These Terms &amp; Conditions are governed by the applicable laws of India.</p><p>In the event of a concern or dispute, customers are encouraged to contact our support team so that we can attempt to resolve the matter promptly.</p><p>Any legal proceedings will be subject to the jurisdiction of the competent courts and consumer dispute resolution authorities under applicable Indian law.</p><h2>18. Contact Information</h2><p>For questions or assistance regarding these Terms &amp; Conditions, please contact:</p><p><strong>Zenisa Perfumes</strong></p><p><strong>Email:</strong> [Official Support Email]</p><p><strong>WhatsApp:</strong> [Official WhatsApp Number]</p><p><strong>Business Address:</strong> [Registered Business Address]</p><p><strong>Customer Support Hours:</strong> [Support Timings]</p><hr /><p><strong>Thank you for choosing Zenisa Perfumes. We look forward to making your fragrance shopping experience exceptional.</strong></p>','2026-10-20 17:52:26','2026-10-20 17:52:26');
/*!40000 ALTER TABLE `terms_condition` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-17 17:56:39
