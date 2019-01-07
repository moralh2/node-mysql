DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(50) NOT NULL,
  price DECIMAL(13,4) default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Headphones", "Electronics", 49.99, 100);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Cassette Tape", "Electronics", 4.99, 50);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Sweater", "Clothing", 19.99, 25);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Jeans", "Clothing", 21.99, 40);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Bookcase", "Furniture", 35.00, 12);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Desk", "Furniture", 45.00, 12);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Boots", "Shoes", 25.00, 25);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Sneakers", "Shoes", 38.50, 15);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Bed Frame", "Furniture", 75.00, 30);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("Bookcase", "Furniture", 35.00, 12);

INSERT INTO products (name, department, price, stock_quantity)
VALUES ("T-Shirt", "Clothing", 7.50, 100);