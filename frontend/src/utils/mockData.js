export const VENDORS = [
  {
    id: 'v1',
    name: 'Spice Garden',
    description: 'Authentic Indian cuisine with a wide variety of vegetarian and non-vegetarian options',
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
    rating: 4.5,
    active: true,
  },
  {
    id: 'v2',
    name: 'The Burger Joint',
    description: 'Juicy burgers, crispy fries, and refreshing shakes for the ultimate comfort food experience',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
    rating: 4.3,
    active: true,
  },
  {
    id: 'v3',
    name: 'Wok & Roll',
    description: 'Pan-Asian delights featuring Chinese, Thai, and Japanese inspired dishes',
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400',
    rating: 4.1,
    active: true,
  },
  {
    id: 'v4',
    name: 'Pizza Palace',
    description: 'Wood-fired pizzas with fresh toppings and homemade sauces',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400',
    rating: 4.4,
    active: true,
  },
];

export const MENU_ITEMS = [
  // Spice Garden (v1)
  { id: 'm1', vendorId: 'v1', name: 'Paneer Butter Masala', description: 'Creamy tomato-based curry with soft paneer cubes', price: 120, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', isVeg: true },
  { id: 'm2', vendorId: 'v1', name: 'Dal Tadka', description: 'Yellow lentils tempered with aromatic spices', price: 80, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', isVeg: true },
  { id: 'm3', vendorId: 'v1', name: 'Chicken Biryani', description: 'Fragrant basmati rice cooked with tender chicken and spices', price: 160, imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', isVeg: false },
  { id: 'm4', vendorId: 'v1', name: 'Veg Thali', description: 'Complete meal with rice, roti, dal, sabzi, and dessert', price: 100, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', isVeg: true },
  { id: 'm5', vendorId: 'v1', name: 'Mutton Rogan Josh', description: 'Slow-cooked mutton in a rich Kashmiri spice blend', price: 200, imageUrl: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400', isVeg: false },
  // The Burger Joint (v2)
  { id: 'm6', vendorId: 'v2', name: 'Classic Cheese Burger', description: 'Juicy beef patty with melted cheddar, lettuce and tomato', price: 150, imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', isVeg: false },
  { id: 'm7', vendorId: 'v2', name: 'Veggie Delight Burger', description: 'Grilled veggie patty with fresh veggies and house sauce', price: 120, imageUrl: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400', isVeg: true },
  { id: 'm8', vendorId: 'v2', name: 'Crispy Chicken Burger', description: 'Crispy fried chicken with coleslaw and spicy mayo', price: 160, imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400', isVeg: false },
  { id: 'm9', vendorId: 'v2', name: 'Loaded Fries', description: 'Crispy fries topped with cheese sauce and jalapeños', price: 90, imageUrl: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400', isVeg: true },
  { id: 'm10', vendorId: 'v2', name: 'Chocolate Shake', description: 'Thick and creamy chocolate milkshake', price: 80, imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400', isVeg: true },
  // Wok & Roll (v3)
  { id: 'm11', vendorId: 'v3', name: 'Veg Fried Rice', description: 'Wok-tossed rice with fresh vegetables and soy sauce', price: 100, imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', isVeg: true },
  { id: 'm12', vendorId: 'v3', name: 'Chicken Noodles', description: 'Stir-fried noodles with chicken and vegetables', price: 130, imageUrl: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=400', isVeg: false },
  { id: 'm13', vendorId: 'v3', name: 'Spring Rolls (4 pcs)', description: 'Crispy rolls filled with vegetables and glass noodles', price: 80, imageUrl: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400', isVeg: true },
  { id: 'm14', vendorId: 'v3', name: 'Thai Green Curry', description: 'Aromatic Thai curry with vegetables in coconut milk', price: 140, imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400', isVeg: true },
  { id: 'm15', vendorId: 'v3', name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts and dried chilies', price: 160, imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400', isVeg: false },
  // Pizza Palace (v4)
  { id: 'm16', vendorId: 'v4', name: 'Margherita Pizza', description: 'Classic tomato sauce with fresh mozzarella and basil', price: 180, imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400', isVeg: true },
  { id: 'm17', vendorId: 'v4', name: 'Pepperoni Pizza', description: 'Loaded with premium pepperoni on rich tomato sauce', price: 220, imageUrl: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400', isVeg: false },
  { id: 'm18', vendorId: 'v4', name: 'BBQ Chicken Pizza', description: 'Smoky BBQ sauce with grilled chicken and red onions', price: 240, imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', isVeg: false },
  { id: 'm19', vendorId: 'v4', name: 'Veggie Supreme Pizza', description: 'Bell peppers, mushrooms, olives, and onions on garlic sauce', price: 200, imageUrl: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400', isVeg: true },
  { id: 'm20', vendorId: 'v4', name: 'Garlic Bread (6 pcs)', description: 'Toasted bread with garlic butter and herbs', price: 80, imageUrl: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=400', isVeg: true },
];

export const DELIVERY_SLOTS = [
  { id: 's1', displayName: '11:00 AM – 12:00 PM', startTime: '11:00', endTime: '12:00' },
  { id: 's2', displayName: '12:00 PM – 1:00 PM', startTime: '12:00', endTime: '13:00' },
  { id: 's3', displayName: '1:00 PM – 2:00 PM', startTime: '13:00', endTime: '14:00' },
  { id: 's4', displayName: '5:00 PM – 6:00 PM', startTime: '17:00', endTime: '18:00' },
  { id: 's5', displayName: '6:00 PM – 7:00 PM', startTime: '18:00', endTime: '19:00' },
];

export const SEED_USERS = [
  {
    id: 'u_admin',
    username: 'admin',
    email: 'admin@slurp.app',
    password: 'admin123',
    fullName: 'Admin User',
    phone: '9999999999',
    address: 'Admin Office, Java Canteen',
    role: 'ADMIN',
  },
];
