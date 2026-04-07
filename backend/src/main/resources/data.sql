-- ============================================
-- Slurp Restaurant and Menu Data Migration
-- Generated from DataInitializer.java
-- ============================================

-- Insert Vendors
-- ============================================

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('a66df724-8552-464a-9b29-d9856dcae72f', 'Biryani House', 'Authentic Hyderabadi Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Dosa Corner', 'South Indian Delicacies', 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Burger Junction', 'American Fast Food', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('6705f13d-71ab-4d63-9275-695d258e9179', 'Pizza Paradise', 'Italian Pizzas', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Thali Express', 'North Indian Thali', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('fd42e951-05f4-49f0-816c-78473dcf2b69', 'Roll Junction', 'Delicious Rolls & Wraps', 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('a99a42e1-caa8-4638-a061-de3e18a43f01', 'Ice Cream Parlor', 'Premium Ice Creams', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO vendors (id, name, description, image_url, active, rating, created_at, updated_at)
VALUES ('931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Dessert House', 'Sweet Delights', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', true, 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- Insert Menu Items
-- ============================================

-- Menu items for Biryani House
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('e2838fc8-8164-40ac-8ee6-890b052948c2', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Chicken Biryani', 'Delicious chicken biryani', 180.0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b003e80a-09b5-4517-86bd-380cfbc6fbf0', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Mutton Biryani', 'Tender mutton biryani', 220.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c4e94d7a-de43-4be7-b0da-4fe4fd257842', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Veg Biryani', 'Flavorful vegetable biryani', 150.0, 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('646cf468-ed14-48dd-8b88-ac947f84d09d', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Raita', 'Cucumber raita', 40.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c070554e-16bc-4c8b-90fd-1ec0496512f0', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Gulab Jamun', 'Sweet gulab jamun', 50.0, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4f39b395-9575-4140-8bce-e6c9a970c7e2', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Chicken 65', 'Spicy fried chicken', 160.0, 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200', true, 'Starter', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('64dec581-c67e-4a65-abf7-e8dfc2050e15', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Egg Biryani', 'Boiled egg biryani', 120.0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('f47f62b8-d6db-4ee5-91ea-9821071a625c', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Paneer Biryani', 'Cottage cheese biryani', 140.0, 'https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('40b15a46-1655-43c3-9169-d2227ecac172', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Plain Rice', 'Steamed basmati rice', 60.0, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4d1f4d6c-6f41-408d-b8b6-502e2e50b1da', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Chicken Kebab', 'Grilled chicken kebabs', 140.0, 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=200', true, 'Starter', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d1deefaa-f503-41f3-b593-d5b8607ff62a', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Papad', 'Crispy papad (2 pcs)', 20.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4abdc964-cd63-464a-b1f9-4e949c00f020', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Mirchi Ka Salan', 'Spicy chili curry', 80.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('90d39dff-bf42-44d3-b77f-09a977e8ecac', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Buttermilk', 'Cool spiced buttermilk', 30.0, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('19ec4b0c-7b7f-49eb-9cdc-f52a83df8ae1', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Double Ka Meetha', 'Bread pudding', 70.0, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('7d335ee6-0d29-4da7-957b-348482785b42', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Onion Salad', 'Fresh onion rings', 25.0, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('68b652be-fb06-49b9-8535-e8d9af64e1f5', 'a66df724-8552-464a-9b29-d9856dcae72f', 'Chicken Fry', 'Andhra style chicken fry', 160.0, 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=200', true, 'Starter', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Dosa Corner
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('bb0346be-8010-4e27-9646-1e8cbe9e3679', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Masala Dosa', 'Crispy masala dosa', 100.0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('e3ab2145-8a0a-4b3f-ac2a-52f26812baa0', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Plain Dosa', 'Simple plain dosa', 80.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('db6f17c7-282d-49a0-a126-2c0a83b249bd', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Idli Sambar', 'Soft idlis with sambar', 70.0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('63aabe63-7e0c-46c9-a25e-c943b096e825', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Vada Sambar', 'Crispy vadas', 80.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b73fbbe9-51be-4af9-9088-fc45c8443b75', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Filter Coffee', 'Traditional filter coffee', 30.0, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('8a9f0394-f417-4ff0-b7bc-501e7be34162', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Uttapam', 'Thick uttapam', 90.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('641de301-e88f-40b6-99f2-1fa277bae156', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Onion Dosa', 'Dosa with onion topping', 85.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d3b9f789-b270-496d-a905-4d99b6f31077', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Rava Dosa', 'Semolina crispy dosa', 90.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4d11512d-2f2f-4dd6-943d-4d5da4c7700b', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Pongal', 'Rice and lentil dish', 75.0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4519f42e-bd0a-47ee-8561-c7b9c001da04', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Upma', 'Semolina breakfast dish', 60.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('bead8776-5387-46e3-acee-8dc86cb9fb9e', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Medu Vada', 'Fried lentil donuts (3 pcs)', 70.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Starter', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('9a957515-3c67-4adc-86df-289940f16c36', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Coconut Chutney', 'Fresh coconut chutney', 20.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('e5f390b6-cf37-4e60-af29-6de5886077fc', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Sambar (Bowl)', 'Lentil vegetable stew', 40.0, 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('83c13537-6f07-44c3-b236-06508c69c59d', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Mysore Masala Dosa', 'Spicy red chutney dosa', 95.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('64be8456-d42a-45a4-86d6-ed72126395c6', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Ghee Dosa', 'Dosa with clarified butter', 90.0, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('29c747d5-661e-4097-87d9-5e50eb4aef58', '02cd5ab2-1b54-487d-a1cb-db5f202cb23a', 'Tea', 'South Indian masala tea', 25.0, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Burger Junction
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('0e4f2d06-efff-482a-91f2-e890c6a5cc2b', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Classic Burger', 'Juicy beef burger', 120.0, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('6204b29b-9d29-4c04-a390-6413b35584be', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Cheese Burger', 'Burger with extra cheese', 140.0, 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('6fb075e7-4c7f-4971-8765-11a9d40e69b4', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Chicken Burger', 'Grilled chicken burger', 130.0, 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('fd914c47-8ae1-4aa9-ae44-622c2fdda346', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Veg Burger', 'Delicious veggie patty burger', 110.0, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('09b06186-7603-4cbc-a794-2dd22f1ea45f', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'French Fries', 'Crispy fries', 60.0, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('662ad689-46af-43e6-aad5-8ea6afb902d2', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Coke', 'Chilled coke', 40.0, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b2ad3b7a-07d3-4c4d-94e4-e6014bf7899e', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Chicken Wings', 'Spicy wings', 150.0, 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=200', true, 'Starter', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4685aad4-4b75-4465-a283-dae59e1a28d4', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Aloo Tikki Burger', 'Potato patty burger', 80.0, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('455c24a1-9dd2-4aec-a906-f1d1bc00266c', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Peri Peri Fries', 'Spicy seasoned fries', 70.0, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('251af38e-31ba-4d50-8913-5d722473f1f2', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Onion Rings', 'Crispy battered onion rings', 80.0, 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('125ba741-0330-43bf-b9bb-801c81fba1fe', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Chicken Nuggets', 'Crispy chicken nuggets (6 pcs)', 90.0, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=200', true, 'Starter', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('049c7929-3538-42fa-a7ad-751ed528398d', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Paneer Burger', 'Indian cottage cheese burger', 95.0, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('8bf0d92c-fda7-4d93-9356-e78b93c34702', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Corn & Cheese Burger', 'Sweet corn burger', 85.0, 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('aabb4064-9e4a-48db-b04c-71dcbd5be87e', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Pepsi', 'Chilled pepsi', 40.0, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('dfed423f-f056-44c2-b2c1-6e6f28d3bc9c', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Sprite', 'Chilled lemon soda', 40.0, 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('793f0c67-1563-43b6-b49c-d52bf9f2f998', '592bd82c-eb7b-4587-a683-c0b8dd0b797b', 'Coleslaw', 'Creamy cabbage salad', 50.0, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Pizza Paradise
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('210f71ba-d9d3-46bc-aa92-4d2c089dbbe0', '6705f13d-71ab-4d63-9275-695d258e9179', 'Margherita Pizza', 'Classic margherita', 200.0, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c3337b34-9b3a-41be-863c-8b47fa2a5a7c', '6705f13d-71ab-4d63-9275-695d258e9179', 'Pepperoni Pizza', 'Loaded pepperoni', 250.0, 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b8da982f-0479-41bf-99bc-4ed832eac796', '6705f13d-71ab-4d63-9275-695d258e9179', 'Veggie Pizza', 'Fresh vegetable pizza', 220.0, 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('f05f5658-dab4-47f4-8cb6-ce273d9e503e', '6705f13d-71ab-4d63-9275-695d258e9179', 'Garlic Bread', 'Cheesy garlic bread', 80.0, 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('caf4eb06-c0df-4457-839f-c9d86a6ce573', '6705f13d-71ab-4d63-9275-695d258e9179', 'Pasta Alfredo', 'Creamy pasta', 180.0, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('9dcac323-cd60-49fd-af83-6bb74a2cabc6', '6705f13d-71ab-4d63-9275-695d258e9179', 'Tiramisu', 'Italian dessert', 100.0, 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b9ccbc1c-d029-43f1-901d-24aa8bf912fe', '6705f13d-71ab-4d63-9275-695d258e9179', 'Farmhouse Pizza', 'Loaded veggie pizza', 240.0, 'https://images.unsplash.com/photo-1511689660979-10d2b1aada49?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('753688f7-1362-433d-9da8-b2dbf80f21a9', '6705f13d-71ab-4d63-9275-695d258e9179', 'Corn Pizza', 'Sweet corn pizza', 180.0, 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('71fd6d06-7fe9-4baa-8a98-0742c7f84253', '6705f13d-71ab-4d63-9275-695d258e9179', 'Paneer Tikka Pizza', 'Indian style pizza', 230.0, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('19c0f5c0-9ec4-4ff1-aa19-dc6469e3088e', '6705f13d-71ab-4d63-9275-695d258e9179', 'Garlic Breadsticks', 'Crispy breadsticks (4 pcs)', 60.0, 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('de33f458-9e21-43b5-9eb0-dfb3301d3be1', '6705f13d-71ab-4d63-9275-695d258e9179', 'Pasta Arrabbiata', 'Spicy tomato pasta', 150.0, 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('45c1b6af-05c1-426f-8d6d-0c1c49e05571', '6705f13d-71ab-4d63-9275-695d258e9179', 'Cheese Dip', 'Creamy cheese dip', 50.0, 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('ab9f2e65-4576-45b1-afe0-0834b4eba235', '6705f13d-71ab-4d63-9275-695d258e9179', 'Garlic Dip', 'Tangy garlic sauce', 40.0, 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('1739158b-7ca2-4a24-86a7-1c61ffb8075c', '6705f13d-71ab-4d63-9275-695d258e9179', 'Cold Coffee', 'Iced coffee shake', 80.0, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('65299142-3a45-4262-b099-78bf72f16f07', '6705f13d-71ab-4d63-9275-695d258e9179', 'Bruschetta', 'Tomato basil toast', 90.0, 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200', true, 'Starter', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c92f0a9d-2d74-4fe7-b4a3-8aafe4d84ece', '6705f13d-71ab-4d63-9275-695d258e9179', 'Pizza Pocket', 'Stuffed pizza pocket', 70.0, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200', true, 'Snacks', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Thali Express
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('2a340037-cbe8-455b-b899-d8cea6e6ae1d', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Veg Thali', 'Complete veg meal', 150.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('8e26631b-c454-434f-85f8-3e30a7803a06', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Non-Veg Thali', 'Complete non-veg meal', 180.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('08487f5f-cf0e-4224-a51f-c1c586e44fce', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Paneer Butter Masala', 'Creamy paneer curry', 160.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('360b8e1e-0dcd-4e9c-88f8-975ef6ffec36', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Dal Makhani', 'Black lentil curry', 120.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('7b4de085-af56-45a6-97e9-a12d9424de0b', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Roti (5 pcs)', 'Wheat flatbread', 30.0, 'https://images.unsplash.com/photo-1626776876729-bab4cbaebdaf?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('e1fde456-6192-47e1-b781-f39d7c68b382', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Lassi', 'Sweet yogurt drink', 50.0, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('903d174d-3772-4c0c-b5ae-127a4645acf3', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Dal Tadka', 'Yellow lentil curry', 100.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('32a53c98-dfa1-4c78-ad54-b2c6440e0654', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Aloo Gobi', 'Potato cauliflower curry', 110.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('4db3cb09-d3ee-4f41-95c0-34310e27e121', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Chole Bhature', 'Chickpea curry with fried bread', 100.0, 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('9c5e7e16-0c5b-4851-b4d5-fb7d8b09d90c', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Palak Paneer', 'Spinach cottage cheese curry', 140.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('6fa726d0-b5a1-45c8-b63d-c1cfa672cea8', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Jeera Rice', 'Cumin flavored rice', 80.0, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('398f7d4c-18ba-4c6a-8c94-6f99b68594a9', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Naan (2 pcs)', 'Leavened flatbread', 40.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('056ddcc7-1e9e-4879-b686-05c79e2cbe0d', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Mixed Veg Curry', 'Assorted vegetable curry', 120.0, 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c92cba17-b0ad-4a3c-a6d3-326030763e9e', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Mango Lassi', 'Mango yogurt drink', 60.0, 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('ecb4f493-a879-49ca-82bc-1ca0d274d3b2', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Papad Roasted', 'Roasted papad (2 pcs)', 25.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('37f38d8d-025a-402c-9052-fdca5ad1b612', 'f4741faf-d9f4-4cb9-ab6e-c82efa1fe711', 'Pickle', 'Mixed Indian pickle', 15.0, 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Roll Junction
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('197c4976-bfe2-4a15-92af-e8ee6b9bcfba', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Paneer Roll', 'Spicy paneer wrap', 90.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('71ac55d8-ddf1-4569-b35a-5529d36e4d12', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Chicken Tikka Roll', 'Tandoori chicken wrap', 120.0, 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('21f8c674-095b-49ae-aabb-3b6c6f0ffb99', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Egg Roll', 'Classic egg roll', 80.0, 'https://images.unsplash.com/photo-1612240498434-0b7b9073e07e?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('78bc3ef5-c58b-44b6-9c48-a2a642778a0c', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Veg Manchurian Roll', 'Indo-Chinese veggie roll', 85.0, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('12289d8f-7b62-490f-a220-bfe2c8e484fd', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Mutton Seekh Roll', 'Spiced mutton seekh wrap', 140.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('3d130266-4421-4910-a5ab-bd055007666f', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Aloo Tikki Roll', 'Potato patty wrap', 70.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('90735f58-e7ce-4d22-89c6-6cff1a81d2c9', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Schezwan Paneer Roll', 'Spicy paneer roll', 95.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('0d6c657c-090d-485d-a3da-ab4f98a0af08', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Chicken Seekh Roll', 'Minced chicken roll', 110.0, 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('3f9c152b-67d9-4241-900d-6b07978c6c87', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Falafel Roll', 'Middle eastern chickpea roll', 85.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b662b012-b76e-4578-9e2b-fd247b47e2db', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Mushroom Roll', 'Spiced mushroom wrap', 90.0, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('22b68fbc-2061-4cc3-a762-9d2eceecbff4', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Double Egg Roll', 'Extra egg roll', 95.0, 'https://images.unsplash.com/photo-1612240498434-0b7b9073e07e?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d1038721-18d2-4e68-9111-63e2dd8c79ec', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Cheese Roll', 'Cheesy veggie roll', 80.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d99040cc-0b7b-4d96-8d05-bdb1e3b8fd38', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Spring Roll (3 pcs)', 'Crispy vegetable rolls', 70.0, 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200', true, 'Starter', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('a0a3de55-066e-44ea-814b-0659f870a026', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Chicken Malai Roll', 'Creamy chicken roll', 125.0, 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=200', true, 'Main Course', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('0cd6098a-894e-4331-8560-5be51a83251a', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Veg Frankie', 'Mumbai style veggie wrap', 75.0, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=200', true, 'Main Course', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('51d7052d-61f2-49b2-a5ba-10f2395909bf', 'fd42e951-05f4-49f0-816c-78473dcf2b69', 'Mint Chutney', 'Fresh mint sauce', 20.0, 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200', true, 'Sides', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Ice Cream Parlor
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('db5a9478-232f-4197-b5a5-172f7638890f', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Vanilla Scoop', 'Classic vanilla ice cream', 60.0, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d6c5d039-df96-46fb-8b31-750d0ccd331b', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Chocolate Scoop', 'Rich chocolate ice cream', 60.0, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('6914d6cc-b479-4ab0-9330-5a76b3477701', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Strawberry Scoop', 'Fresh strawberry ice cream', 70.0, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('30928afb-58f6-4c33-86cb-cd6b6a698d19', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Mango Scoop', 'Tropical mango ice cream', 70.0, 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('7be4901a-e8e7-4c33-ae00-38a34952c45d', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Butterscotch Scoop', 'Crunchy butterscotch ice cream', 65.0, 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('e21ee158-27f8-4d7d-bc4a-979c74e45d76', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Sundae Special', 'Ice cream with toppings', 120.0, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b4468a7f-2238-469e-8d5a-826c8f235849', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Pista Scoop', 'Pistachio ice cream', 75.0, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('df848179-a653-413f-8053-b888004ca305', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Kulfi', 'Traditional Indian ice cream', 50.0, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c768a178-e2a2-485d-b38e-09281a515507', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Black Current Scoop', 'Tangy black current', 70.0, 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('ec665a34-8a7d-49aa-a74c-7509d03e19a9', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Chocolate Chip Scoop', 'Chocolate chip ice cream', 70.0, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('60aa5c05-98e1-463b-835b-126254358719', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Coffee Scoop', 'Rich coffee ice cream', 65.0, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('04ffcb83-9b1c-4fb3-9479-25e594d93a03', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Ice Cream Shake', 'Thick ice cream milkshake', 90.0, 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=200', true, 'Beverage', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c6cbb4c3-a9a4-4218-a3a7-b8701230149c', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Fruit Salad with Ice Cream', 'Fresh fruits with ice cream', 100.0, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('9ad01c2c-4476-432e-bf39-e9a36502490c', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Choco Bar', 'Chocolate coated ice cream bar', 40.0, 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('597c762a-6e1f-4ba0-8d13-273519ce2296', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Cone Ice Cream', 'Classic cone ice cream', 50.0, 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('9b2edcb9-0c39-4686-a5c9-c8dbd18708bf', 'a99a42e1-caa8-4638-a061-de3e18a43f01', 'Brownie Sundae', 'Brownie with ice cream', 110.0, 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Menu items for Dessert House
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('05c4b134-999f-4fde-9033-604bb0746f4f', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Brownie', 'Chocolate fudge brownie', 80.0, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('8a2c62b4-c5aa-4cdc-b2c1-5d8a0be8ceef', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Cheesecake', 'New York style cheesecake', 150.0, 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d6c72eb7-24c7-40e6-a535-d249b6f96f55', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Rasmalai', 'Traditional Indian sweet', 90.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('839fb0ee-0fc0-45bb-a8d1-0913f9ff38f1', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Gajar Halwa', 'Carrot pudding', 70.0, 'https://images.unsplash.com/photo-1644888937245-cc97b5994d9e?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c3b3bcf0-611e-4459-b159-5660dd6eacba', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Chocolate Mousse', 'Light chocolate mousse', 110.0, 'https://images.unsplash.com/photo-1541599540903-216a46934c0b?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('d6371e0e-3040-41cb-bc90-5b6c278b39a6', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Fruit Custard', 'Mixed fruit custard', 80.0, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('dce8e01c-edc8-4881-9248-84ea151e1746', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Jalebi', 'Crispy sweet spirals', 60.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('39312e26-c98d-4e13-826a-6dd847458d74', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Ras Gulla', 'Soft cheese balls in syrup (4 pcs)', 70.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('1dec982a-aebc-478d-91b7-37d806774ff4', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Kheer', 'Rice pudding', 65.0, 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('b95df96a-55ec-4b4f-8cf4-ec4b8d42de93', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Chocolate Pastry', 'Rich chocolate pastry', 90.0, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('8f02bdf9-33d4-4d2b-a7ca-843af5911807', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Black Forest Pastry', 'Classic black forest', 100.0, 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('69d70942-eef6-4b32-8caf-df2fcfa29a17', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Vanilla Pastry', 'Light vanilla sponge', 85.0, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('c1deb31d-75e4-405a-b0be-18ff756614d9', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Mango Pastry', 'Tropical mango pastry', 95.0, 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('01f1671a-effa-40f7-945d-f436ef87c4f5', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Gulab Jamun (4 pcs)', 'Sweet milk dumplings', 60.0, 'https://images.unsplash.com/photo-1607920591413-4ec007e70023?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('667ffcac-8c89-4793-b462-4eaaadfdc8ba', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Kalakand', 'Milk cake', 75.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO menu_items (id, vendor_id, name, description, price, image_url, available, category, is_veg, created_at, updated_at)
VALUES ('04245d36-67c3-4fcf-aa09-ba8703ce7aa3', '931cc178-835b-477b-9e9d-dd02d5c02a7f', 'Peda (6 pcs)', 'Traditional milk sweet', 70.0, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200', true, 'Dessert', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

