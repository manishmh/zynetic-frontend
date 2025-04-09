# 🛠️ Product Management Web App

A full-stack application for managing products with secure user authentication, filtering, pagination, and CRUD operations.

---

## 🚀 Features

### ✅ User Authentication
- Signup / Login / Logout (JWT-based)
- Protected routes using JWT

### ✅ Product Management
- Create / View / Edit / Delete products
- Filter by category, price range, and rating
- Search by name or description
- Pagination

### ⚙️ Backend
- Express.js + TypeScript
- PostgreSQL on NeonDB
- Prisma ORM
- Dockerized API

### 💻 Frontend
- Next.js (React)
- Tailwind CSS
- Client-side routing with protected pages
- Responsive and clean UI

---

## 📸 Screenshots

| registert | Login | Dashboard |
|--------|-------|-----------|
| ![Signup](/public/result/register.png) | ![Login](/public/result/login.png) | ![Dashboard](/public/result/home.png) |

| Add Product | Edit Product | Logout |
|-------------|--------------|----------------------|
| ![Add](/public/result/add-product.png) | ![Edit](/public/result/edit.png) | ![Delete](/public/result/logout.png) |

---

## 🎥 Demo

▶️ Watch the app in action: [Demo Video](./public/result/demo.mkv)

---

## 📂 Backend Repository

🔗 [View Backend Code](https://github.com/manishmh/zynetic-backend)
---

## 📦 Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in PostgreSQL credentials
docker-compose up      # Runs Express + PostgreSQL
