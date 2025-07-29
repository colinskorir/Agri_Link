-- AgriLink PostgreSQL Schema and Sample Data Initialization Script

-- Drop tables if they exist (for re-initialization)
DROP TABLE IF EXISTS Reviews, Messages, Orders, Produce_Listings, Users CASCADE;

-- Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    role VARCHAR(10) NOT NULL CHECK (role IN ('farmer', 'buyer')),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    location VARCHAR(100),
    certifications TEXT[] DEFAULT NULL, -- Only for farmers
    business_type VARCHAR(100) DEFAULT NULL, -- Only for buyers
    delivery_preferences VARCHAR(255) DEFAULT NULL -- Only for buyers
);

-- Produce_Listings table
CREATE TABLE Produce_Listings (
    id SERIAL PRIMARY KEY,
    farmer_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    quantity NUMERIC(10,2) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    harvest_date DATE NOT NULL,
    image_url TEXT DEFAULT NULL
);

-- Orders table
CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    listing_id INTEGER NOT NULL REFERENCES Produce_Listings(id) ON DELETE CASCADE,
    quantity NUMERIC(10,2) NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('pending', 'confirmed', 'delivered'))
);

-- Messages table
CREATE TABLE Messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    receiver_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES Orders(id) ON DELETE SET NULL,
    content TEXT NOT NULL
);

-- Reviews table
CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES Orders(id) ON DELETE CASCADE,
    reviewer_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT
);

-- Indexes for frequent queries
CREATE INDEX idx_produce_type ON Produce_Listings(type);
CREATE INDEX idx_produce_location ON Users(location);
CREATE INDEX idx_listing_farmer ON Produce_Listings(farmer_id);
CREATE INDEX idx_order_buyer ON Orders(buyer_id);

-- Sample data

-- Insert farmers
INSERT INTO Users (role, name, email, password_hash, location, certifications)
VALUES
('farmer', 'John Mwangi', 'john@farmers.co.ke', 'hashed_pw1', 'Nakuru', ARRAY['Organic', 'GAP']),
('farmer', 'Mary Wanjiku', 'mary@farmers.co.ke', 'hashed_pw2', 'Eldoret', ARRAY['FairTrade']);

-- Insert buyers
INSERT INTO Users (role, name, email, password_hash, location, business_type, delivery_preferences)
VALUES
('buyer', 'FreshMart Ltd', 'contact@freshmart.co.ke', 'hashed_pw3', 'Nairobi', 'Retailer', 'Home Delivery'),
('buyer', 'GreenGrocers', 'info@greengrocers.co.ke', 'hashed_pw4', 'Mombasa', 'Wholesaler', 'Pickup');

-- Insert produce listings (farmer_id: 1, 2)
INSERT INTO Produce_Listings (farmer_id, type, quantity, price, harvest_date)
VALUES
(1, 'Maize', 1000, 30.00, '2025-07-10'),
(1, 'Beans', 500, 80.00, '2025-07-12'),
(2, 'Tomatoes', 300, 50.00, '2025-07-11');

-- Insert orders (buyer_id: 3, 4; listing_id: 1, 2, 3)
INSERT INTO Orders (buyer_id, listing_id, quantity, status)
VALUES
(3, 1, 200, 'pending'),
(4, 2, 100, 'confirmed'),
(3, 3, 50, 'delivered');

-- Insert messages (sender_id/receiver_id: 1-4, order_id: 1-2)
INSERT INTO Messages (sender_id, receiver_id, order_id, content)
VALUES
(3, 1, 1, 'Is the maize organic?'),
(1, 3, 1, 'Yes, it is certified organic.'),
(4, 2, 2, 'Can you deliver to Mombasa?');

-- Insert reviews (order_id: 2-3, reviewer_id: 3-4)
INSERT INTO Reviews (order_id, reviewer_id, rating, comment)
VALUES
(3, 3, 5, 'Great quality tomatoes and fast delivery!'),
(2, 4, 4, 'Beans were good, but delivery was delayed.');

-- End of script
