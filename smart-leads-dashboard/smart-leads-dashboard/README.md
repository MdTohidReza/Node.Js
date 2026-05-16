# 🚀 Smart Leads Dashboard

A production-grade full-stack Lead Management Dashboard built with the **MERN stack + TypeScript**.

![Tech Stack](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js) ![MongoDB](https://img.shields.io/badge/MongoDB-7-47A248?logo=mongodb)

---

## 📋 Features

### Core
- ✅ **JWT Authentication** — Register, Login, Protected Routes, bcrypt password hashing
- ✅ **Leads CRUD** — Create, Read, Update, Delete with full validation
- ✅ **Advanced Filtering** — Filter by Status, Source; Search by Name/Email; Sort Latest/Oldest
- ✅ **Pagination** — Backend-driven with metadata (skip/limit)
- ✅ **Role-Based Access Control** — Admin (full access) & Sales (no delete)
- ✅ **Debounced Search** — 400ms debounce on all search inputs
- ✅ **CSV Export** — Export filtered leads as downloadable CSV
- ✅ **Dark Mode** — Full dark theme with persistent preference
- ✅ **Responsive Design** — Mobile-first layout

### Technical
- Strict TypeScript throughout (no `any`)
- Proper interfaces/types for all data shapes
- Centralized error handling (frontend & backend)
- Request validation with `express-validator`
- React Query for server state + caching
- Zustand for global auth/UI state
- React Hook Form for form validation
- Docker + Docker Compose setup

---

## 🗂 Project Structure

```
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/          # Database connection
│   │   ├── controllers/     # authController, leadsController
│   │   ├── middleware/       # auth, errorHandler, validators
│   │   ├── models/          # User, Lead (Mongoose schemas)
│   │   ├── routes/          # auth.ts, leads.ts
│   │   ├── types/           # Shared TypeScript interfaces & enums
│   │   ├── utils/           # response helpers, jwt helper
│   │   └── index.ts         # Express app entry point
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/      # Layout, ProtectedRoute
│   │   │   ├── leads/       # LeadTable, LeadForm, LeadFiltersBar
│   │   │   └── ui/          # Spinner, StatusBadge, Modal, Pagination, etc.
│   │   ├── hooks/           # useLeads, useDebounce
│   │   ├── pages/           # LoginPage, RegisterPage, DashboardPage, LeadsPage
│   │   ├── services/        # apiClient, authService, leadsService
│   │   ├── store/           # authStore (Zustand)
│   │   ├── types/           # TypeScript types/enums (mirrored from backend)
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css        # Tailwind + custom component classes
│   ├── Dockerfile
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.ts
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js ≥ 20
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-leads-dashboard.git
cd smart-leads-dashboard
```

### 2. Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI and a strong JWT_SECRET
npm install
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🐳 Docker Setup

The entire stack (MongoDB + Backend + Frontend) can be run with a single command:

```bash
# From the project root
cp .env.example .env
# Set a strong JWT_SECRET in .env

docker-compose up --build
```

| Service  | URL                        |
|----------|----------------------------|
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:5000      |
| MongoDB  | mongodb://localhost:27017  |

To stop:
```bash
docker-compose down
# To also remove the database volume:
docker-compose down -v
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable       | Description                          | Example                        |
|----------------|--------------------------------------|--------------------------------|
| `NODE_ENV`     | Environment mode                     | `development`                  |
| `PORT`         | Server port                          | `5000`                         |
| `MONGODB_URI`  | MongoDB connection string            | `mongodb://localhost:27017/smart-leads` |
| `JWT_SECRET`   | Secret key for JWT signing           | `a-very-long-random-string`    |
| `JWT_EXPIRES_IN` | Token expiry                       | `7d`                           |
| `FRONTEND_URL` | CORS allowed origin                  | `http://localhost:5173`        |

### Frontend (`frontend/.env`)

| Variable       | Description                          | Example                        |
|----------------|--------------------------------------|--------------------------------|
| `VITE_API_URL` | Backend API base URL                 | `http://localhost:5000/api`    |

---

## 👥 User Roles

| Permission          | Admin | Sales |
|---------------------|:-----:|:-----:|
| View leads          | ✅    | ✅    |
| Create leads        | ✅    | ✅    |
| Edit leads          | ✅    | ✅    |
| Delete leads        | ✅    | ❌    |
| Export CSV          | ✅    | ✅    |

---

## 📡 API Documentation

See [API_DOCS.md](./API_DOCS.md) for the full API reference.

Base URL: `http://localhost:5000/api`

---

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| TypeScript 5 | Type safety |
| TailwindCSS 3 | Styling |
| React Router 6 | Client-side routing |
| TanStack Query 5 | Server state management |
| Zustand 4 | Global client state |
| React Hook Form 7 | Form handling + validation |
| Axios | HTTP client |
| React Hot Toast | Toast notifications |
| Lucide React | Icons |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js 20 | Runtime |
| Express 4 | Web framework |
| TypeScript 5 | Type safety |
| MongoDB + Mongoose | Database + ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| express-validator | Request validation |
| Helmet | Security headers |
| CORS | Cross-origin support |
| Morgan | HTTP logging |
| express-rate-limit | Rate limiting |

---

## 🔑 Git Commit Convention

```
feat: add CSV export functionality
fix: correct pagination skip calculation
chore: update dependencies
refactor: extract reusable LeadForm component
docs: update API documentation
style: fix TypeScript strict mode errors
```

---

## 📝 Scripts

### Backend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Compile TypeScript to JS |
| `npm start` | Run compiled production build |

### Frontend
| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
