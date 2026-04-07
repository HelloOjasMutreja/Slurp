-- ========================================
-- Slurp Supabase PostgreSQL Schema
-- ========================================
-- Run this script in your Supabase SQL Editor
-- This creates all tables with UUID primary keys, proper relationships,
-- timestamps, indexes, and Row Level Security (RLS)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. USERS TABLE
-- ========================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    role VARCHAR(50) NOT NULL CHECK (role IN ('CUSTOMER', 'VENDOR', 'ADMIN', 'RIDER')),
    enabled BOOLEAN NOT NULL DEFAULT true,
    wallet_balance DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    loyalty_points DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for users
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ========================================
-- 2. VENDORS TABLE
-- ========================================
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    rating DECIMAL(3, 2) DEFAULT 0.0,
    user_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_vendor_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Indexes for vendors
CREATE INDEX idx_vendors_active ON vendors(active);
CREATE INDEX idx_vendors_user_id ON vendors(user_id);

-- ========================================
-- 3. MENU ITEMS TABLE
-- ========================================
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vendor_id UUID NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    available BOOLEAN NOT NULL DEFAULT true,
    category VARCHAR(100),
    is_veg BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_menuitem_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE
);

-- Indexes for menu items
CREATE INDEX idx_menuitems_vendor_id ON menu_items(vendor_id);
CREATE INDEX idx_menuitems_available ON menu_items(available);
CREATE INDEX idx_menuitems_category ON menu_items(category);

-- ========================================
-- 4. DELIVERY SLOTS TABLE
-- ========================================
CREATE TABLE delivery_slots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    active BOOLEAN NOT NULL DEFAULT true,
    display_name VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for delivery slots
CREATE INDEX idx_deliveryslots_active ON delivery_slots(active);

-- ========================================
-- 5. RIDERS TABLE
-- ========================================
CREATE TABLE riders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    vendor_id UUID,
    available BOOLEAN NOT NULL DEFAULT true,
    vehicle_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_rider_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_rider_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE SET NULL
);

-- Indexes for riders
CREATE INDEX idx_riders_user_id ON riders(user_id);
CREATE INDEX idx_riders_vendor_id ON riders(vendor_id);
CREATE INDEX idx_riders_available ON riders(available);

-- ========================================
-- 6. ORDERS TABLE
-- ========================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL,
    vendor_id UUID NOT NULL,
    slot_id UUID NOT NULL,
    rider_id UUID,
    subtotal DECIMAL(10, 2) NOT NULL,
    delivery_fee DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    platform_fee DECIMAL(10, 2) NOT NULL DEFAULT 2.0,
    total DECIMAL(10, 2) NOT NULL,
    loyalty_points_used DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    loyalty_points_earned DECIMAL(10, 2) NOT NULL DEFAULT 0.0,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
    delivery_address TEXT,
    customer_phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_order_customer FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_vendor FOREIGN KEY (vendor_id) REFERENCES vendors(id) ON DELETE CASCADE,
    CONSTRAINT fk_order_slot FOREIGN KEY (slot_id) REFERENCES delivery_slots(id) ON DELETE RESTRICT,
    CONSTRAINT fk_order_rider FOREIGN KEY (rider_id) REFERENCES riders(id) ON DELETE SET NULL
);

-- Indexes for orders
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX idx_orders_rider_id ON orders(rider_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- ========================================
-- 7. ORDER ITEMS TABLE
-- ========================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL,
    menu_item_id UUID NOT NULL,
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_orderitem_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    CONSTRAINT fk_orderitem_menuitem FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
);

-- Indexes for order items
CREATE INDEX idx_orderitems_order_id ON order_items(order_id);
CREATE INDEX idx_orderitems_menuitem_id ON order_items(menu_item_id);

-- ========================================
-- 8. PAYMENT TRANSACTIONS TABLE
-- ========================================
CREATE TABLE payment_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'REFUNDED')),
    provider VARCHAR(50) DEFAULT 'MOCK',
    provider_order_id VARCHAR(255),
    provider_payment_id VARCHAR(255),
    provider_signature VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- Indexes for payment transactions
CREATE INDEX idx_payments_order_id ON payment_transactions(order_id);
CREATE INDEX idx_payments_status ON payment_transactions(status);

-- ========================================
-- 9. WALLET TRANSACTIONS TABLE
-- ========================================
CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('CREDIT', 'DEBIT')),
    description TEXT,
    balance_after DECIMAL(10, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    CONSTRAINT fk_wallet_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for wallet transactions
CREATE INDEX idx_wallettxn_user_id ON wallet_transactions(user_id);
CREATE INDEX idx_wallettxn_created_at ON wallet_transactions(created_at DESC);

-- ========================================
-- 10. SETTINGS TABLE
-- ========================================
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes for settings
CREATE INDEX idx_settings_key ON settings(setting_key);

-- ========================================
-- UPDATED_AT TRIGGER FUNCTION
-- ========================================
-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menuitems_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deliveryslots_updated_at BEFORE UPDATE ON delivery_slots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_riders_updated_at BEFORE UPDATE ON riders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payment_transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================

-- Enable RLS on user-specific tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY users_view_own ON users
    FOR SELECT
    USING (auth.uid()::text = id::text);

-- Users can update their own non-sensitive data
CREATE POLICY users_update_own ON users
    FOR UPDATE
    USING (auth.uid()::text = id::text)
    WITH CHECK (auth.uid()::text = id::text);

-- Customers can view their own orders
CREATE POLICY orders_view_own ON orders
    FOR SELECT
    USING (
        auth.uid()::text = customer_id::text OR
        -- Vendors can see orders for their restaurant
        EXISTS (SELECT 1 FROM vendors WHERE vendors.id = orders.vendor_id AND vendors.user_id::text = auth.uid()::text) OR
        -- Riders can see orders assigned to them
        EXISTS (SELECT 1 FROM riders WHERE riders.id = orders.rider_id AND riders.user_id::text = auth.uid()::text)
    );

-- Customers can create orders
CREATE POLICY orders_create_own ON orders
    FOR INSERT
    WITH CHECK (auth.uid()::text = customer_id::text);

-- Users can view their own wallet transactions
CREATE POLICY wallet_view_own ON wallet_transactions
    FOR SELECT
    USING (auth.uid()::text = user_id::text);

-- Allow service role to bypass RLS (for backend operations)
CREATE POLICY service_role_all_users ON users
    FOR ALL
    USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

CREATE POLICY service_role_all_orders ON orders
    FOR ALL
    USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

CREATE POLICY service_role_all_wallet ON wallet_transactions
    FOR ALL
    USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- Public read access for vendors, menu items, and delivery slots (authenticated users)
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
CREATE POLICY vendors_public_read ON vendors FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY vendors_service_role ON vendors FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY menuitems_public_read ON menu_items FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY menuitems_service_role ON menu_items FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

ALTER TABLE delivery_slots ENABLE ROW LEVEL SECURITY;
CREATE POLICY deliveryslots_public_read ON delivery_slots FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY deliveryslots_service_role ON delivery_slots FOR ALL USING (current_setting('request.jwt.claims', true)::json->>'role' = 'service_role');

-- ========================================
-- INITIAL DATA (Optional - for testing)
-- ========================================
-- You can add seed data here if needed
-- Example:
-- INSERT INTO settings (setting_key, setting_value, description) VALUES
--     ('platform_fee', '2.0', 'Platform fee per order'),
--     ('loyalty_points_rate', '0.05', 'Loyalty points earned per rupee spent');

-- ========================================
-- SCHEMA COMPLETE
-- ========================================
-- Next steps:
-- 1. Replace placeholders in application-supabase.properties with your Supabase credentials
-- 2. Update entity classes to use UUID instead of Long
-- 3. Set active Spring profile to 'supabase'
-- 4. Test the connection
