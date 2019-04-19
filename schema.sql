CREATE TABLE `Products` (
  `id_of_product` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `inventory_available` int(11) DEFAULT '0',
  PRIMARY KEY (`id_of_product`);


INSERT INTO products
  (product_name,category_name,price,inventory_available)
VALUES
  ("Patio Set", "Furniture", 600.00, 8),
  ("Mailbox", "Furniture", 100.00, 5),
  ("Bar Stool Set", "Furniture", 200.00, 6),
  ("Tire Set", "Auto", 400.00, 15),
  ("Coach Purse", "Accessories", 200.00, 15),
  ("Stero System", "Auto", 300.00, 10),
  ("Pancakes", "Grocery", 3.00, 15),
  ("Nike Shoes", "Accessories", 50.00, 12),
  ("Chocolate Easter Eggs", "Grocery", 8.00, 25),
  ("Under Armour Hoodie", "Accessories", 60.00, 1);
