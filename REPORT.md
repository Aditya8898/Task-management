# Task Management System — Project Report

## Overview
A full-stack task management application with role-based access control (Admin/Member), real-time progress tracking via todo checklists, and data analytics dashboards. Built with the MERN stack (MongoDB, Express, React, Node.js).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, Tailwind CSS 4, Recharts 3, React Router 7 |
| Backend | Node.js, Express 5, Mongoose 9 |
| Database | MongoDB (Atlas) |
| Auth | JWT (jsonwebtoken) + bcryptjs |
| File Upload | Multer |
| Reports | ExcelJS |
| HTTP Client | Axios |
| Date Formatting | moment.js |

---

## System Architecture

```
┌─────────────┐         ┌──────────────┐         ┌──────────┐
│  React SPA  │ ──HTTP──▶  Express API  │ ────▶   │ MongoDB  │
│  (Vite)     │ ◀──JSON──│  (Node.js)   │ ◀────   │  (Atlas) │
└─────────────┘         └──────────────┘         └──────────┘
     │                        │
  JWT Token              JWT Verify
  localStorage           + Role Check
```

- **Port**: Backend `8000`, Frontend `5173` (Vite default)
- **Auth Flow**: Login → JWT stored in localStorage → Axios interceptor attaches `Bearer` token → Backend middleware verifies and attaches `req.user`

---

## Database Models

### User
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| email | String | required, unique |
| password | String | hashed with bcryptjs |
| profileImageUrl | String | nullable |
| role | String | `"admin"` \| `"member"`, defaults to `"member"` |

### Task
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| description | String | |
| priority | String | `"Low"` \| `"Medium"` \| `"High"` |
| status | String | `"Pending"` \| `"In Progress"` \| `"Completed"` |
| dueDate | Date | required |
| assignedTo | [ObjectId] | ref: User |
| createdBy | ObjectId | ref: User |
| attachments | [String] | URL strings |
| todoChecklist | [{ text, completed }] | Sub-document array |
| progress | Number | 0–100, auto-calculated |

---

## API Endpoints

### Auth (`/api/auth`)
| Method | Route | Access | Purpose |
|---|---|---|---|
| POST | /register | Public | Register (admin via invite token) |
| POST | /login | Public | Login, returns JWT |
| GET | /profile | Private | Get profile |
| PUT | /profile | Private | Update profile |
| POST | /upload-image | Private | Upload profile photo |

### Tasks (`/api/tasks`)
| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | /dashboard-data | Admin | Dashboard stats + charts |
| GET | /user-dashboard-data | Private | User-scoped dashboard |
| GET | / | Private | List tasks (status filter) |
| GET | /:id | Private | Get task details |
| POST | / | Admin | Create task |
| PUT | /:id | Private | Update task |
| DELETE | /:id | Admin | Delete task |
| PUT | /:id/status | Private | Update status |
| PUT | /:id/todo | Private | Toggle todo checklist |

### Users (`/api/users`)
| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | / | Admin | List members with task counts |
| GET | /:id | Private | Get user by ID |

### Reports (`/api/reports`)
| Method | Route | Access | Purpose |
|---|---|---|---|
| GET | /export/tasks | Admin | Download tasks Excel |
| GET | /export/users | Admin | Download user-task Excel |

---

## Frontend Pages & Routing

| Route | Page | Role | Purpose |
|---|---|---|---|
| `/login` | Login | Public | Email/password sign-in |
| `/signup` | SignUp | Public | Registration with photo upload |
| `/admin/dashboard` | Dashboard | Admin | Analytics, charts, recent tasks |
| `/admin/tasks` | ManageTasks | Admin | All tasks grid, status filter |
| `/admin/create-task` | CreateTask | Admin | Create/edit task form |
| `/admin/users` | ManageUsers | Admin | Member list with stats |
| `/user/dashboard` | UserDashboard | Member | Personal analytics |
| `/user/tasks` | MyTasks | Member | Assigned tasks grid |
| `/user/task-details/:id` | ViewTaskDetails | Member | Task detail + todo checklist |

---

## Key Features

### Role-Based Access
- Two roles: `admin` (full access) and `member` (assigned tasks only)
- Admin registration protected by invite token in `.env`

### Todo Checklist with Auto-Progress
- Each task has a dynamic checklist
- Checking/unchecking items auto-calculates progress percentage
- Status auto-updates: 100% → Completed, >0% → In Progress, 0% → Pending
- Setting task to Completed auto-checks all todos

### Dashboard & Analytics
- Admin dashboard: global task statistics, pie chart (status distribution), bar chart (priority distribution), recent tasks table
- User dashboard: same visuals scoped to assigned tasks

### Reporting
- Excel export of all tasks
- Excel export of user-task summary

### Security
- JWT with 7-day expiry
- Password hashing (bcryptjs, 10 salt rounds)
- Backend middleware: `protect` (auth) + `adminOnly` (role gate)
- Frontend: PrivateRoute component, Axios 401 interceptor

### UI/UX
- Responsive layout (sidebar collapses to hamburger on mobile)
- Color-coded status/priority badges
- Time-based greeting on dashboards
- Toast notifications for all CRUD operations
- Avatar groups with overflow count

---

## Project Structure

```
Task Management backup/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/              # Route handlers
│   │   ├── authController.js     # Auth logic
│   │   ├── taskController.js     # Task CRUD + checklist
│   │   ├── userController.js     # User listing
│   │   └── reportController.js   # Excel export
│   ├── middleware/                # Express middleware
│   │   └── authMiddleware.js     # JWT protect + adminOnly
│   ├── models/
│   │   ├── Task.js               # Task schema
│   │   └── User.js               # User schema
│   ├── routes/                   # Express routers
│   ├── scripts/migrateStatus.js  # DB migration script
│   ├── Uploads/                  # Profile images
│   ├── server.js                 # Entry point
│   └── .env                      # Config
├── frontend/
│   ├── Task-Manager/
│   │   ├── src/
│   │   │   ├── pages/            # Auth/, Admin/, User/
│   │   │   ├── components/       # Cards/, Charts/, inputs/, layouts/
│   │   │   ├── context/          # AuthContext, userContext
│   │   │   ├── hooks/            # useUserAuth
│   │   │   ├── routes/           # PrivateRoute
│   │   │   ├── utils/            # apiPaths, axiosInstance, helper
│   │   │   ├── App.jsx           # Root router
│   │   │   └── main.jsx          # Entry point
│   │   └── vite.config.js
│   └── merge.mjs                 # Image merge utility
└── Task_Management_API.postman_collection.json
```

---

## Running the Project

### Backend
```bash
cd backend
npm install
npm run dev          # nodemon server.js on port 8000
```

### Frontend
```bash
cd frontend/Task-Manager
npm install
npm run dev          # Vite dev server on port 5173
```

### Environment Variables (backend/.env)
```
PORT=8000
MONGO_URI=<MongoDB connection string>
JWT_SECRET=<JWT signing secret>
ADMIN_INVITE_TOKEN=<token for admin registration>
```

---

## Known Issues

1. **Duplicate middleware directory**: Both `middleware/` and `middlewares/` exist with nearly identical auth middleware. Only `middleware/` (singular) is imported by routes.
2. **ReportController dead field**: `userTaskMap` initializes `tasksCount` but writes to `taskCount` — the field is never read by the worksheet, so it has no visible impact but should be cleaned up.
3. **Status color inconsistency**: TaskCard uses indigo for "Completed" status, while other components use lime/green.
