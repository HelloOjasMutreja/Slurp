# Slurp - Campus Food Delivery Platform

[![Build and Test](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/build.yml/badge.svg)](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/build.yml)
[![Deploy to GitHub Pages](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/deploy.yml/badge.svg)](https://github.com/HelloOjasMutreja/Slurp/actions/workflows/deploy.yml)

🌐 **Live demo:** https://helloojasmutreja.github.io/Slurp/

Slurp is a full-stack food delivery website designed for SRM students to order food online from Java Canteen vendors and get it delivered to their doorstep.

## 🚀 Quick Start (Run Locally)

### Prerequisites

Make sure you have the following installed:
- **Java 17+** — [Download from adoptium.net](https://adoptium.net/)
- **Maven 3.6+** — Typically included with Java; verify with `mvn -v`
- **Node.js 18+ and npm** — [Download from nodejs.org](https://nodejs.org/)

---

### Step 1 — Start the Backend

```bash
cd backend
mvn spring-boot:run
```

The backend starts at **http://localhost:8080**

> Tables and seed data are automatically created on startup — no manual SQL needed.

**H2 Database Console (dev only):** http://localhost:8080/h2-console  
- JDBC URL: `jdbc:h2:mem:testdb`  
- Username: `sa`  
- Password: *(leave empty)*

---

### Step 2 — Start the Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**

---

### Step 3 — Log In

| Role     | Username   | Password   |
|----------|------------|------------|
| Customer | `customer` | `password` |
| Admin    | `admin`    | `password` |
| Vendor   | `vendor1`  | `password` |

---

## 🌐 GitHub Pages Deployment

The frontend is automatically deployed to **https://helloojasmutreja.github.io/Slurp/** on every push to `main` via the `deploy.yml` workflow.

### One-time setup (do this once in the repo settings)

1. Go to **Settings → Pages** and set Source to **GitHub Actions**.
2. *(Optional)* Go to **Settings → Variables → Actions** and add a repository variable:
   - Name: `VITE_API_URL`
   - Value: URL of your deployed backend, e.g. `https://your-backend.onrender.com/api`
   
   If this variable is not set, the frontend will try to call `http://localhost:8080/api` (works only for local testing).

> **Note:** The backend is a Spring Boot server and cannot run on GitHub Pages. Deploy it separately (Render, Railway, Fly.io, etc.) and point `VITE_API_URL` at it.

---

## 🎯 Features

- **User Authentication** — JWT-based login with roles: Customer, Vendor, Admin, Rider
- **Vendor Browsing** — Browse available food vendors with ratings and descriptions
- **Shopping Cart** — Add items, adjust quantities, and review your order
- **Smart Pricing** — ₹10 delivery fee for orders under ₹100; ₹2 platform fee always applied
- **Payment Options** — Wallet balance or mock card/UPI payment; Cash on Delivery
- **Digital Wallet** — Add funds and pay directly from your wallet
- **Loyalty Points** — Earn 0.5 pts per ₹100 spent; redeem 1 pt = ₹1 off
- **Time-Gated Ordering** — Orders accepted 11 AM – 7 PM only
- **Order Tracking** — Live delivery map with animated rider movement
- **Admin Dashboard** — View platform stats, manage orders and vendors
- **Dark Mode** — Full dark/light theme toggle

---

## 🏗️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Java 17, Spring Boot 3.2, Spring Security (JWT), Spring Data JPA |
| Database  | H2 (dev) / PostgreSQL via Supabase (prod) |
| Build     | Maven                               |
| Frontend  | React 18, React Router, Axios       |
| Styling   | Tailwind CSS v4                     |
| Dev Build | Vite                                |

---

## 📁 Project Structure

```
SRMiggy/
├── backend/
│   └── src/main/
│       ├── java/com/srmiggy/
│       │   ├── config/        # Security, CORS, JWT config
│       │   ├── controller/    # REST API controllers
│       │   ├── dto/           # Request/response DTOs
│       │   ├── model/         # JPA entities
│       │   ├── repository/    # Spring Data repositories
│       │   ├── security/      # JWT filter and utils
│       │   └── service/       # Business logic
│       └── resources/
│           ├── application.properties
│           └── data.sql       # Auto-seeded dev data
└── frontend/
    └── src/
        ├── components/        # Shared UI components (Navbar, etc.)
        ├── context/           # React context (Auth, Cart, Theme)
        ├── pages/             # Page-level components
        └── utils/             # API client (Axios)
```

---

## 🔐 API Reference

| Method | Endpoint                              | Description               |
|--------|---------------------------------------|---------------------------|
| POST   | `/api/auth/register`                  | Register a new user       |
| POST   | `/api/auth/login`                     | Login and get JWT token   |
| GET    | `/api/vendors`                        | List all active vendors   |
| GET    | `/api/menu/vendor/{id}`               | Get a vendor's menu       |
| POST   | `/api/orders`                         | Place an order            |
| GET    | `/api/orders`                         | Get current user's orders |
| POST   | `/api/payments/pay-with-wallet`       | Pay via wallet            |
| GET    | `/api/wallet/balance`                 | Get wallet balance        |
| POST   | `/api/wallet/add-money`               | Top up wallet             |
| GET    | `/api/wallet/loyalty-points`          | Get loyalty points        |
| GET    | `/api/admin/stats`                    | Platform stats (Admin)    |

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend lint check
cd frontend
npm run lint
```

---

## 📦 Building for Production

### Backend

```bash
cd backend
mvn clean package -DskipTests
java -jar target/srmiggy-backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/
```

Deploy `dist/` to Vercel, Netlify, or any static host. Set `VITE_API_URL` in `.env.production` to point to your backend:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

---

## 🗄️ Production Database (Supabase)

To use Supabase PostgreSQL instead of H2:

1. Create a project at [supabase.com](https://supabase.com)
2. Run `backend/src/main/resources/supabase-schema.sql` in the SQL Editor
3. Run `backend/src/main/resources/supabase-seed-data.sql` for initial data
4. Fill in your credentials in `backend/src/main/resources/application-supabase.properties`
5. Start the backend with the Supabase profile:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=supabase
```

---

## 🐛 Troubleshooting

| Problem | Fix |
|---|---|
| Port 8080 in use | Change `server.port` in `application.properties` |
| Frontend can't reach backend | Make sure backend is running on port 8080 |
| CORS errors | Check `cors.allowed-origins` in `application.properties` |
| Build fails | Delete `node_modules/` and re-run `npm install` |
| Blank page after deploy | Configure hosting to redirect all routes to `index.html` |
| Data missing after restart | H2 is in-memory; data resets on each restart (expected in dev) |

---

## 👥 Contributors

Built as a campus food delivery solution for SRM University students.

## 📄 License

This project is for educational purposes.
