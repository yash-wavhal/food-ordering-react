CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE food_items (
    id SERIAL PRIMARY KEY,
    foodType VARCHAR(100) NOT NULL,
    category VARCHAR(100),
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    discount DECIMAL(5,2) DEFAULT 0,
    rating DECIMAL(2,1),
    image TEXT,
    deliveryTime INT CHECK (deliveryTime > 0),
    description TEXT,
    ingredients TEXT,
    veg BOOLEAN,
    isAvailable BOOLEAN DEFAULT TRUE,
    quantity INT DEFAULT 0,
    hotelName VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);