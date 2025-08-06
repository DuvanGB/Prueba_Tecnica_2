---- Insertar roles
INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');

---- Insertar usuario admin
INSERT INTO users(name, username, email, password, is_frequent_customer)
VALUES('Duvan', 'Galvis', 'duvangalvis14@gmail.com', '$2a$10$E2Z6Y5s7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9', true);

---- Asignar rol de admin
INSERT INTO user_roles(user_id, role_id) VALUES(1, 2);

---- Insertar productos
-- Computadoras y Laptops
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('MacBook Air M2', 'Laptop Apple 13 pulgadas con chip M2', 1299.99, 8, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('PC Gamer RTX 4060', 'Computadora para gaming con tarjeta gráfica RTX 4060', 1499.99, 5, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Laptop Lenovo ThinkPad', 'Laptop empresarial 14 pulgadas', 1099.99, 12, true, CURRENT_TIMESTAMP);

-- Periféricos
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Mouse Gaming Logitech', 'Mouse óptico para gaming con 6 botones', 49.99, 35, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Webcam 4K', 'Cámara web con resolución 4K y micrófono integrado', 129.99, 20, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 199.99, 30, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Monitor 27 pulgadas', 'Monitor Full HD IPS de 27 pulgadas', 299.99, 15, true, CURRENT_TIMESTAMP);

-- Smartphones y Tablets
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('iPhone 15', 'Smartphone Apple 128GB', 999.99, 18, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Samsung Galaxy S24', 'Smartphone Android 256GB', 899.99, 22, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('iPad Air', 'Tablet Apple 10.9 pulgadas 64GB', 599.99, 14, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Tablet Samsung Galaxy Tab', 'Tablet Android 10.4 pulgadas 128GB', 349.99, 16, true, CURRENT_TIMESTAMP);

-- Accesorios y Cables
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Cargador USB-C 65W', 'Cargador rápido universal USB-C', 29.99, 50, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Cable HDMI 4K', 'Cable HDMI 2.1 de 2 metros para 4K', 19.99, 45, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Hub USB 7 puertos', 'Concentrador USB 3.0 con 7 puertos', 39.99, 25, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Funda para Laptop', 'Funda protectora para laptop de 15 pulgadas', 24.99, 40, true, CURRENT_TIMESTAMP);

-- Almacenamiento
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('SSD 1TB Samsung', 'Disco sólido interno SATA 1TB', 89.99, 30, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Disco Duro Externo 2TB', 'Disco duro portátil USB 3.0 2TB', 79.99, 28, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Memoria RAM 16GB', 'Memoria DDR4 16GB 3200MHz', 69.99, 35, true, CURRENT_TIMESTAMP);

-- Gaming
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Consola PlayStation 5', 'Consola de videojuegos Sony PS5', 499.99, 6, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Xbox Series X', 'Consola Microsoft Xbox Series X', 499.99, 7, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Nintendo Switch OLED', 'Consola portátil Nintendo con pantalla OLED', 349.99, 12, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Silla Gaming', 'Silla ergonómica para gaming con soporte lumbar', 249.99, 10, true, CURRENT_TIMESTAMP);

-- Audio
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Altavoz Bluetooth Portátil', 'Altavoz inalámbrico resistente al agua', 79.99, 32, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Micrófono USB', 'Micrófono de condensador para streaming', 119.99, 18, true, CURRENT_TIMESTAMP);

-- Smart Home
INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Echo Dot Amazon', 'Altavoz inteligente con Alexa', 49.99, 25, true, CURRENT_TIMESTAMP);

INSERT INTO products(name, description, price, stock_quantity, active, created_at)
VALUES('Bombilla LED Inteligente', 'Bombilla WiFi RGB regulable', 19.99, 60, true, CURRENT_TIMESTAMP);