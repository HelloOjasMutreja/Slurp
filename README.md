# Slurp — Campus Food Delivery Platform

[![Build and Test](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/build.yml/badge.svg)](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/build.yml)
[![Deploy to GitHub Pages](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/deploy.yml/badge.svg)](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/deploy.yml)

**Live demo:** https://helloojasmutreja.github.io/Slurp/

Slurp is a food delivery platform for SRM students to order from Java Canteen vendors. The frontend runs entirely in **mock mode** using `localStorage` — no backend or database is required to use the app.

---

## Quick Start (no backend needed)

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**

That's it. All data is stored in your browser's `localStorage`.

---

## Test Credentials

### Admin account (pre-seeded)

| Field    | Value              |
|----------|--------------------|
| Username | `admin`            |
| Password | `admin123`         |
| Email    | `admin@slurp.app`  |
| Role     | `ADMIN`            |

The admin account has access to the Admin Dashboard at `/admin`.

### Customer accounts

No customer accounts are pre-seeded. Use the **Register** page to create one — pick any username, email, and password. Every new customer account starts with:

- Wallet balance: **₹100**
- Loyalty points: **0**

---

## Seed Data Reference

All of the following data is loaded from `frontend/src/utils/mockData.js` and served by the `localStorage` mock in `frontend/src/utils/api.js`. This is what you'll see in the app on first load.

### Vendors

| ID   | Name              | Rating | Description |
|------|-------------------|--------|-------------|
| `v1` | Spice Garden      | 4.5    | Authentic Indian cuisine with vegetarian and non-vegetarian options |
| `v2` | The Burger Joint  | 4.3    | Juicy burgers, crispy fries, and refreshing shakes |
| `v3` | Wok & Roll        | 4.1    | Pan-Asian dishes: Chinese, Thai, and Japanese inspired |
| `v4` | Pizza Palace      | 4.4    | Wood-fired pizzas with fresh toppings and homemade sauces |

### Menu Items

#### Spice Garden (`v1`)

| ID    | Item                | Price  | Veg? |
|-------|---------------------|--------|------|
| `m1`  | Paneer Butter Masala | ₹120  | Yes  |
| `m2`  | Dal Tadka           | ₹80    | Yes  |
| `m3`  | Chicken Biryani     | ₹160   | No   |
| `m4`  | Veg Thali           | ₹100   | Yes  |
| `m5`  | Mutton Rogan Josh   | ₹200   | No   |

#### The Burger Joint (`v2`)

| ID    | Item                  | Price  | Veg? |
|-------|-----------------------|--------|------|
| `m6`  | Classic Cheese Burger | ₹150   | No   |
| `m7`  | Veggie Delight Burger | ₹120   | Yes  |
| `m8`  | Crispy Chicken Burger | ₹160   | No   |
| `m9`  | Loaded Fries          | ₹90    | Yes  |
| `m10` | Chocolate Shake       | ₹80    | Yes  |

#### Wok & Roll (`v3`)

| ID    | Item                  | Price  | Veg? |
|-------|-----------------------|--------|------|
| `m11` | Veg Fried Rice        | ₹100   | Yes  |
| `m12` | Chicken Noodles       | ₹130   | No   |
| `m13` | Spring Rolls (4 pcs)  | ₹80    | Yes  |
| `m14` | Thai Green Curry      | ₹140   | Yes  |
| `m15` | Kung Pao Chicken      | ₹160   | No   |

#### Pizza Palace (`v4`)

| ID    | Item                  | Price  | Veg? |
|-------|-----------------------|--------|------|
| `m16` | Margherita Pizza      | ₹180   | Yes  |
| `m17` | Pepperoni Pizza       | ₹220   | No   |
| `m18` | BBQ Chicken Pizza     | ₹240   | No   |
| `m19` | Veggie Supreme Pizza  | ₹200   | Yes  |
| `m20` | Garlic Bread (6 pcs)  | ₹80    | Yes  |

### Delivery Slots

| ID   | Display Name          | Start | End   |
|------|-----------------------|-------|-------|
| `s1` | 11:00 AM – 12:00 PM  | 11:00 | 12:00 |
| `s2` | 12:00 PM – 1:00 PM   | 12:00 | 13:00 |
| `s3` | 1:00 PM – 2:00 PM    | 13:00 | 14:00 |
| `s4` | 5:00 PM – 6:00 PM    | 17:00 | 18:00 |
| `s5` | 6:00 PM – 7:00 PM    | 18:00 | 19:00 |

---

## Pricing & Wallet Rules

| Rule                   | Value                                       |
|------------------------|---------------------------------------------|
| Platform fee           | ₹2 on every order                           |
| Delivery fee           | ₹10 if order subtotal < ₹100; free otherwise |
| Starting wallet balance | ₹100 for every new account                 |
| Loyalty points earned  | `subtotal × 0.005` pts per order            |
| Loyalty redemption     | 1 pt = ₹1 off; capped at the order total    |

### Payment methods available at checkout

| Method    | How it works in mock mode |
|-----------|---------------------------|
| Wallet    | Deducted immediately from `localStorage` wallet; order is confirmed |
| Card / UPI | Mock payment flow — always succeeds; loyalty points awarded on verification |
| Cash on Delivery | No deduction; loyalty points awarded on COD confirmation |

---

## localStorage Keys

The mock API stores everything in the following keys (visible in DevTools → Application → Local Storage):

| Key                         | Contents                                     |
|-----------------------------|----------------------------------------------|
| `slurp_users`               | Array of all registered users (including passwords) |
| `slurp_orders`              | Array of all placed orders                   |
| `slurp_wallet_<userId>`     | `{ balance, loyaltyPoints, transactions[] }` for each user |
| `user`                      | Currently logged-in user object              |
| `token`                     | Mock auth token for the current session      |

To reset all data to its initial state, open DevTools and clear `localStorage`, then reload the page.

---

## Features

- **Authentication** — Register / login with role-based access (Customer, Admin)
- **Vendor Browsing** — Browse 4 active vendors with ratings and descriptions
- **Menu Filtering** — Filter items by Veg / Non-Veg
- **Shopping Cart** — Add items across one vendor, adjust quantities
- **Smart Pricing** — Automatic delivery fee and platform fee at checkout
- **Delivery Slot Selection** — Choose from 5 pre-set time slots
- **Digital Wallet** — Add funds and pay from wallet balance
- **Loyalty Points** — Earned per order, redeemable at checkout
- **Order History** — See all past orders with status and details
- **Admin Dashboard** — Platform stats, order list with status updates, vendor list
- **Dark Mode** — Full dark/light theme toggle, saved per session

---

## Tech Stack

| Layer     | Technology                               |
|-----------|------------------------------------------|
| Frontend  | React 19, React Router 7, Axios          |
| Styling   | Tailwind CSS v4, custom design system    |
| Dev Build | Vite (rolldown-vite)                     |
| Data      | `localStorage` mock (no backend needed)  |

---

## Project Structure

```
Slurp/
└── frontend/
    └── src/
        ├── components/        # Shared UI (Navbar, Welcome, ProtectedRoute)
        ├── context/           # React context (Auth, Cart, Theme)
        ├── design-system.jsx  # Design tokens, icons, and component atoms
        ├── pages/             # Page-level components
        └── utils/
            ├── api.js         # localStorage mock API (no backend)
            └── mockData.js    # Seed vendors, menu items, slots, admin user
```

---

## Running the Frontend Linter

```bash
cd frontend
npm run lint
```

---

## Building for Production

```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/
```

Deploy the `dist/` folder to any static host (GitHub Pages, Vercel, Netlify, etc.). No backend configuration is required.

---

## Optional: Backend (Spring Boot)

A Spring Boot backend exists in `backend/` for production deployments with a real database. It is **not needed** to run or test the app locally.

### Start the backend (requires Java 17+ and Maven 3.6+)

```bash
cd backend
mvn spring-boot:run
```

Backend starts at `http://localhost:8080`. To connect the frontend to it, set:

```env
VITE_API_URL=http://localhost:8080/api
```

**H2 in-memory console (dev only):** http://localhost:8080/h2-console  
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: *(leave empty)*

### Production database (Supabase PostgreSQL)

1. Create a project at [supabase.com](https://supabase.com)
2. Run `backend/src/main/resources/supabase-schema.sql` in the SQL Editor
3. Run `backend/src/main/resources/supabase-seed-data.sql` for initial data
4. Fill in credentials in `backend/src/main/resources/application-supabase.properties`
5. Start with the Supabase profile:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=supabase
```

---

## GitHub Pages Deployment

The frontend is automatically deployed to **https://helloojasmutreja.github.io/Slurp/** on every push to `main` via the `deploy.yml` workflow.

One-time setup in repo settings:

1. Go to **Settings → Pages** and set Source to **GitHub Actions**.
2. *(Optional)* Add a repository variable under **Settings → Variables → Actions**:
   - Name: `VITE_API_URL`
   - Value: URL of your deployed backend, e.g. `https://your-backend.onrender.com/api`

   If not set, the deployed app runs fully in mock mode.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| App shows blank page | Clear `localStorage` in DevTools and reload |
| Login fails | Use `admin` / `admin123`, or register a new customer account |
| Cart is empty after reload | Cart is in React state — it resets on page reload (expected) |
| Build fails | Delete `node_modules/` and re-run `npm install` |
| Blank page after deploy | Configure hosting to redirect all routes to `index.html` |
| Backend port 8080 in use | Change `server.port` in `application.properties` |

---

## Contributors

Built as a campus food delivery solution for SRM University students.

## License

This project is for educational purposes.
