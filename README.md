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

| Signup | Login | Dashboard |
|--------|-------|-----------|
| ![Signup](/public/result/signup.png) | ![Login](/public/result/login.png) | ![Dashboard](/public/result/dashboard.png) |

| Add Product | Edit Product | Delete Confirmation |
|-------------|--------------|----------------------|
| ![Add](/public/result/add-product.png) | ![Edit](/public/result/edit-product.png) | ![Delete](/public/result/delete-confirm.png) |

---

## 🎥 Demo

▶️ Watch the app in action: [Demo Video](./public/result/demo.mkv)

---

## 📂 Backend Repository

🔗 [View Backend Code](https://github.com/your-username/backend-repo-name)

> Replace the URL above with your actual GitHub repository link.

---

## 📦 Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env   # Fill in PostgreSQL credentials
docker-compose up      # Runs Express + PostgreSQL
