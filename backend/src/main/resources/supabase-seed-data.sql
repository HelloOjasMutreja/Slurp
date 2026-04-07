-- ========================================
-- Slurp Supabase Seed Data
-- ========================================
-- Run this after creating the schema to populate initial test data
-- This creates sample users, vendors, menu items, and delivery slots

-- NOTE: All passwords are BCrypt encoded 'password'
-- Password hash: $2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O

-- ========================================
-- 1. SAMPLE USERS
-- ========================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE TABLE wallet_transactions, payment_transactions, order_items, orders, menu_items, riders, vendors, delivery_slots, settings, users CASCADE;

-- Insert test users
INSERT INTO users (id, username, email, password, full_name, phone, address, role, enabled, wallet_balance, loyalty_points) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'customer', 'customer@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Test Customer', '9876543210', 'Building A, Room 101, SRM University', 'CUSTOMER', true, 1000.0, 150.0),
  ('b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'vendor1', 'vendor1@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Vendor Owner 1', '9876543211', 'Shop 1, Food Court', 'VENDOR', true, 0.0, 0.0),
  ('c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'vendor2', 'vendor2@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Vendor Owner 2', '9876543212', 'Shop 2, Food Court', 'VENDOR', true, 0.0, 0.0),
  ('d3eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'admin', 'admin@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Admin User', '9876543213', 'Admin Office', 'ADMIN', true, 0.0, 0.0),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'rider1', 'rider1@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Rider One', '9876543214', 'Delivery Hub', 'RIDER', true, 0.0, 0.0),
  ('f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a66', 'customer2', 'customer2@slurp.com', '$2a$10$rqzJWZKJ3Cr.Yj6E1uHYme4xQFrHx4qJkFqBTHlCU8Yj9RvQPmU7O', 'Test Customer 2', '9876543215', 'Building B, Room 202, SRM University', 'CUSTOMER', true, 500.0, 50.0);

-- ========================================
-- 2. DELIVERY SLOTS
-- ========================================

INSERT INTO delivery_slots (id, start_time, end_time, active, display_name) VALUES
  ('10eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '12:00:00', '13:00:00', true, 'Lunch (12:00 PM - 1:00 PM)'),
  ('20eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', '18:00:00', '19:00:00', true, 'Dinner (6:00 PM - 7:00 PM)'),
  ('30eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', '20:00:00', '21:00:00', true, 'Late Dinner (8:00 PM - 9:00 PM)');

-- ========================================
-- 3. VENDORS
-- ========================================

INSERT INTO vendors (id, name, description, image_url, active, rating, user_id) VALUES
  ('a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Biryani House', 'Authentic Hyderabadi Biryani and North Indian Cuisine', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', true, 4.5, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
  ('a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Dosa Corner', 'South Indian Breakfast and Snacks', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', true, 4.7, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'),
  ('a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'Burger Junction', 'American Fast Food and Burgers', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', true, 4.2, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22'),
  ('a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Pizza Paradise', 'Italian Pizzas and Pasta', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', true, 4.6, 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a33'),
  ('a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Thali Express', 'Complete North Indian Thali Meals', 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=400', true, 4.4, 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a22');

-- ========================================
-- 4. MENU ITEMS
-- ========================================

-- Biryani House
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg) VALUES
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a11', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Chicken Biryani', 'Aromatic basmati rice with tender chicken pieces', 180.0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200', true, 'Main Course', false),
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a12', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Veg Biryani', 'Fragrant rice with mixed vegetables', 150.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Main Course', true),
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a13', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Butter Chicken', 'Creamy tomato-based chicken curry', 200.0, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200', true, 'Main Course', false),
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a14', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Paneer Tikka Masala', 'Grilled cottage cheese in spicy gravy', 170.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Main Course', true),
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a15', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Naan', 'Traditional Indian flatbread', 30.0, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200', true, 'Breads', true),
  ('b1111111-1111-4ef8-bb6d-6bb9bd380a16', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', 'Raita', 'Yogurt with cucumber and spices', 40.0, 'https://images.unsplash.com/photo-1644542528556-e0d5f3e3c72a?w=200', true, 'Sides', true);

-- Dosa Corner
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg) VALUES
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a21', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Masala Dosa', 'Crispy rice crepe with potato filling', 80.0, 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200', true, 'Main Course', true),
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a22', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Plain Dosa', 'Traditional South Indian crepe', 60.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true),
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a23', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Idli Sambar', 'Steamed rice cakes with lentil curry (3 pcs)', 50.0, 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=200', true, 'Breakfast', true),
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a24', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Vada Sambar', 'Fried lentil donuts with curry (3 pcs)', 60.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Breakfast', true),
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a25', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Uttapam', 'Thick pancake with vegetables', 70.0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', true, 'Main Course', true),
  ('b2222222-2222-4ef8-bb6d-6bb9bd380a26', 'a2222222-2222-4ef8-bb6d-6bb9bd380a22', 'Filter Coffee', 'Traditional South Indian filter coffee', 30.0, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200', true, 'Beverages', true);

-- Burger Junction
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg) VALUES
  ('b3333333-3333-4ef8-bb6d-6bb9bd380a31', 'a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'Classic Burger', 'Beef patty with lettuce, tomato, cheese', 120.0, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', true, 'Burgers', false),
  ('b3333333-3333-4ef8-bb6d-6bb9bd380a32', 'a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'Veggie Burger', 'Plant-based patty with fresh vegetables', 100.0, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200', true, 'Burgers', true),
  ('b3333333-3333-4ef8-bb6d-6bb9bd380a33', 'a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'Chicken Burger', 'Grilled chicken breast with mayo', 130.0, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200', true, 'Burgers', false),
  ('b3333333-3333-4ef8-bb6d-6bb9bd380a34', 'a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'French Fries', 'Crispy golden fries', 60.0, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200', true, 'Sides', true),
  ('b3333333-3333-4ef8-bb6d-6bb9bd380a35', 'a3333333-3333-4ef8-bb6d-6bb9bd380a33', 'Coke', 'Chilled Coca-Cola', 40.0, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200', true, 'Beverages', true);

-- Pizza Paradise
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg) VALUES
  ('b4444444-4444-4ef8-bb6d-6bb9bd380a41', 'a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Margherita Pizza', 'Classic pizza with tomato and mozzarella', 200.0, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200', true, 'Pizza', true),
  ('b4444444-4444-4ef8-bb6d-6bb9bd380a42', 'a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Pepperoni Pizza', 'Spicy pepperoni with cheese', 250.0, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200', true, 'Pizza', false),
  ('b4444444-4444-4ef8-bb6d-6bb9bd380a43', 'a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Veggie Supreme', 'Loaded with fresh vegetables', 230.0, 'https://images.unsplash.com/photo-1571407970349-bc81e7e96a47?w=200', true, 'Pizza', true),
  ('b4444444-4444-4ef8-bb6d-6bb9bd380a44', 'a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Garlic Bread', 'Toasted bread with garlic butter', 80.0, 'https://images.unsplash.com/photo-1619985663573-f20c28a6a3f3?w=200', true, 'Sides', true),
  ('b4444444-4444-4ef8-bb6d-6bb9bd380a45', 'a4444444-4444-4ef8-bb6d-6bb9bd380a44', 'Pasta Alfredo', 'Creamy white sauce pasta', 180.0, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200', true, 'Pasta', true);

-- Thali Express
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg) VALUES
  ('b5555555-5555-4ef8-bb6d-6bb9bd380a51', 'a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Mini Thali', '2 Curries, Rice, Roti, Raita, Sweet', 120.0, 'https://images.unsplash.com/photo-1546833998-877b37c2e5c6?w=200', true, 'Thali', true),
  ('b5555555-5555-4ef8-bb6d-6bb9bd380a52', 'a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Regular Thali', '3 Curries, Rice, 2 Roti, Raita, Sweet', 150.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Thali', true),
  ('b5555555-5555-4ef8-bb6d-6bb9bd380a53', 'a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Special Thali', '4 Curries, Rice, 3 Roti, Raita, Papad, Sweet', 180.0, 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=200', true, 'Thali', true),
  ('b5555555-5555-4ef8-bb6d-6bb9bd380a54', 'a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Dal Tadka', 'Yellow lentils with tempering', 80.0, 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200', true, 'Curries', true),
  ('b5555555-5555-4ef8-bb6d-6bb9bd380a55', 'a5555555-5555-4ef8-bb6d-6bb9bd380a55', 'Gulab Jamun', 'Sweet fried dough balls (2 pcs)', 40.0, 'https://images.unsplash.com/photo-1589308078059-be1415eab70d?w=200', true, 'Desserts', true);

-- ========================================
-- 5. RIDERS
-- ========================================

INSERT INTO riders (id, user_id, vendor_id, available, vehicle_number) VALUES
  ('c1111111-1111-4ef8-bb6d-6bb9bd380a11', 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a55', 'a1111111-1111-4ef8-bb6d-6bb9bd380a11', true, 'TN-01-AB-1234');

-- ========================================
-- 6. SETTINGS
-- ========================================

INSERT INTO settings (setting_key, setting_value, description) VALUES
  ('platform_fee', '2.0', 'Platform fee charged per order (in INR)'),
  ('loyalty_points_rate', '0.05', 'Loyalty points earned per rupee spent (5%)'),
  ('min_order_value', '50.0', 'Minimum order value required (in INR)'),
  ('max_delivery_distance', '5.0', 'Maximum delivery distance in kilometers');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Verify data insertion
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'Vendors', COUNT(*) FROM vendors
UNION ALL
SELECT 'Menu Items', COUNT(*) FROM menu_items
UNION ALL
SELECT 'Delivery Slots', COUNT(*) FROM delivery_slots
UNION ALL
SELECT 'Riders', COUNT(*) FROM riders
UNION ALL
SELECT 'Settings', COUNT(*) FROM settings;

-- ========================================
-- TEST DATA SUMMARY
-- ========================================
-- 
-- Created:
-- - 6 Users (1 admin, 2 vendors, 2 customers, 1 rider)
-- - 5 Vendors (Biryani House, Dosa Corner, Burger Junction, Pizza Paradise, Thali Express)
-- - 26 Menu Items (distributed across vendors)
-- - 3 Delivery Slots
-- - 1 Rider
-- - 4 Settings
--
-- Default Password for all users: password
-- 
-- Test Accounts:
-- - customer / password (has ₹1000 wallet balance)
-- - vendor1 / password
-- - admin / password
-- - rider1 / password
--
