# 🚀 Team Task Manager

A modern full-stack Team Task Management web application built using the **MERN Stack**.  
This platform helps teams manage projects, assign tasks, track progress, and monitor productivity using role-based authentication.

---

# 📌 Project Overview

The Team Task Manager allows users to:

- Create and manage projects
- Assign tasks to team members
- Track task progress
- Monitor overdue tasks
- Manage team workflow efficiently

The application includes secure JWT authentication and role-based access control for Admins and Members.

---

# ✨ Features

## 🔐 Authentication
- User Registration
- User Login
- JWT Token Authentication
- Protected Routes

---

## 👥 Role-Based Access
- Admin Access
- Member Access
- Secure APIs

---

## 📁 Project Management
- Create Projects
- View All Projects
- Set Deadlines
- Project Descriptions

---

## ✅ Task Management
- Create Tasks
- Assign Tasks to Users
- Update Task Status
- Delete Tasks
- Due Date Tracking

---

## 📊 Dashboard
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Overdue Tasks

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Axios
- React Router DOM

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# 📂 Folder Structure

```bash
TeamTaskManager/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│
├── server/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── controllers/
│   ├── server.js
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation & Setup

# 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/team-task-manager.git
```

---

# 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the server folder:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

Run Backend Server:

```bash
npm run dev
```

---

# 3️⃣ Frontend Setup

```bash
cd client
npm install
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔑 API Endpoints

# Authentication APIs

| Method | Endpoint |
|--------|-----------|
| POST | /api/auth/register |
| POST | /api/auth/login |
| GET | /api/auth/users |

---

# Project APIs

| Method | Endpoint |
|--------|-----------|
| POST | /api/projects/create |
| GET | /api/projects/all |

---

# Task APIs

| Method | Endpoint |
|--------|-----------|
| POST | /api/tasks/create |
| GET | /api/tasks/all |
| PUT | /api/tasks/update/:id |
| DELETE | /api/tasks/delete/:id |

---

# Dashboard APIs

| Method | Endpoint |
|--------|-----------|
| GET | /api/dashboard/stats |

---

# 📸 Application Screens

## 🔐 Login Page
Modern glassmorphism styled authentication page with secure JWT login system.

---

## 📊 Dashboard
Displays:
- Total Tasks
- Pending Tasks
- Completed Tasks
- Overdue Tasks

---

## 📁 Projects Section
- Create Projects
- Manage Team Projects
- Deadline Management

---

## ✅ Tasks Section
- Assign Tasks
- Update Task Status
- Delete Tasks
- Monitor Progress

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing using bcryptjs
- Protected APIs
- Role-Based Authorization

---

# 🌐 Deployment

## Backend Deployment
- Render

## Frontend Deployment
- Render

---

# 📹 Demo Video

The demo video includes:
- User Authentication
- Project Creation
- Task Assignment
- Dashboard Overview
- Status Updates

---

# 🚀 Future Improvements

- Real-time Notifications
- Team Chat Feature
- Drag & Drop Tasks
- File Upload Support
- Email Reminders
- Dark Mode
- Activity Logs

---

# 👨‍💻 Author

## Yogesh

Built for assignment and learning purposes using the MERN Stack.

---

# 📄 License

This project is developed for educational and assignment purposes only.
