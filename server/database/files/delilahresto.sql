CREATE SCHEMA delilahresto;

use delilahresto;

CREATE TABLE IF NOT EXISTS roles (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO roles (description) VALUES ('client'), ('admin');

CREATE TABLE IF NOT EXISTS statuses (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO statuses (description) VALUES ('New'), ('Confirmed'), ('Prepared'), ('Sent'), ('Delivered'), ('Cancelled');

CREATE TABLE IF NOT EXISTS paymentmethods (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO paymentmethods (description) VALUES ('Credit'), ('Debit'), ('Cash'), ('PSE');

CREATE TABLE IF NOT EXISTS users (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  username varchar(255) NOT NULL,
  fullname varchar(255) NOT NULL,
  cellphone varchar(255) NOT NULL,
  shippingAddress varchar(255) NOT NULL,
  roleId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY roleId (roleId),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (roleId) REFERENCES roles (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO users 
(email, password, username, fullname, cellphone, shippingAddress, roleId) 
VALUES ('admin@admin.com',"admin123","user_admin","My fullname admin", "0123456789", "Calle 10", 2);

CREATE TABLE IF NOT EXISTS products (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  price decimal(10,0) NOT NULL
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS orders (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(255) NOT NULL,
  createdAt datetime DEFAULT CURRENT_TIMESTAMP,
  userId int DEFAULT NULL,
  statusId int DEFAULT NULL,
  paymentmethodId int DEFAULT NULL,
  PRIMARY KEY (id),
  KEY userId (userId),
  KEY statusId (statusId),
  KEY paymentmethodId (paymentmethodId),
  CONSTRAINT orders_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orders_ibfk_2 FOREIGN KEY (statusId) REFERENCES statuses (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orders_ibfk_3 FOREIGN KEY (paymentmethodId) REFERENCES paymentmethods (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS orderdetails (
  quantity int NOT NULL,
  price decimal(10,0) NOT NULL,
  orderId int DEFAULT NULL,
  productId int DEFAULT NULL,
  PRIMARY KEY (quantity,price),
  KEY orderId (orderId),
  KEY productId (productId),
  CONSTRAINT orderdetails_ibfk_1 FOREIGN KEY (orderId) REFERENCES orders (id) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT orderdetails_ibfk_2 FOREIGN KEY (productId) REFERENCES products (id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
