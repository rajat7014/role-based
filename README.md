Role-Based Authentication System

A full-stack role-based authentication system built using Next.js (Frontend) and Node.js + Express + MongoDB (Backend).

This project includes:

SignUp & login, JWT authentication, Role-based dashboards (Admin/User), CRUD operations with search, filters, update, delete, Pagination,
Full Admin panel, Form validation (Zod)
Deployed on Render (Backend) & Vercel (Frontend)

📌 Features
🔐 Authentication

User signup->User login, JWT-based authentication,Login-protected routes, Logout functionality

👤 Role-Based Dashboard, Single dashboard page, Dynamic UI based on user role, Admin sees advanced controls, User sees personal item manager

📦 CRUD Operations

Add item, Edit item, Delete item, Search items, Pagination, Filters (A–Z, Z–A, Latest)

🛠 Admin Panel (Admin Only)

View Admin Controls

System analytics section

Manage items globally (optional extension)

📱 UI/UX

Attractive gradient background

Glassmorphism UI

Smooth interactions

Responsive design

🏗 Tech Stack
Frontend (Next.js 14)

Next.js (App Router)

React.js

Tailwind CSS

Axios

React Hook Form

Zod validation

Jest + React Testing Library

Backend (Node.js + Express)

Express.js

MongoDB + Mongoose

JWT Authentication

bcrypt.js

CORS

Dotenv

Jest + Supertest

🚀 Live Demo
🔗 Frontend (Vercel)

👉 https://role-based-rjtech.vercel.app/

🔗 Backend (Render)

👉 https://role-based-backend-zy53.onrender.com/

📂 Project Structure
role-based/
│
├── frontend/ # Next.js App
│ ├── app/
│ ├── components/
│ ├── utils/api.ts
│ ├── package.json
│ └── ...
│
└── backend/ # Express API
├── src/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── config/db.js
│ └── server.js
├── .gitignore
├── package.json
└── ...

⚙️ Installation & Setup Instructions
🟦 Backend Setup (Node.js + Express)
1️⃣ Clone the repository
git clone https://github.com/rajat7014/role-based-backend.git
cd role-based-backend

2️⃣ Install dependencies
npm install

3️⃣ Create .env file
MONGO_URI=
JWT_SECRET=
PORT=5000

4️⃣ Run backend
npm run dev

Backend runs on:
👉 http://localhost:5000

🟩 Frontend Setup (Next.js)
1️⃣ Clone the repository
git clone https://github.com/rajat7014/role-based.git
cd role-based-frontend

2️⃣ Install dependencies
npm install

3️⃣ Create .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000

4️⃣ Run frontend
npm run dev

Frontend runs on:
👉 http://localhost:3000
