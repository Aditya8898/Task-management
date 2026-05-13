# Deployment Guide

## Prerequisites
- MongoDB Atlas cluster (already configured in `.env`)
- GitHub repository (already pushed)

---

## 1. Backend — Deploy on Render

### Steps

1. Go to https://dashboard.render.com and sign in with GitHub
2. Click **New +** → **Web Service**
3. Connect your `Task-management` repository
4. Fill in:
   - **Name**: `task-management-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Click **Advanced** and add these environment variables:

```
NODE_ENV=production
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<your JWT secret>
ADMIN_INVITE_TOKEN=<your admin token>
CLIENT_URL=https://<your-frontend-url>.vercel.app
PORT=8000
```

6. Click **Create Web Service**
7. Once deployed, copy the URL (e.g. `https://task-management-api.onrender.com`)

> **Warning**: Free tier spins down after 15 mins of inactivity. Add a UptimeRobot ping to keep it warm.

---

## 2. Frontend — Deploy on Vercel

### Update API URL for production

Change `apiPaths.js:1` to read from an environment variable:

<｜｜DSML｜｜tool_calls>
<｜｜DSML｜｜invoke name="edit">
<｜｜DSML｜｜parameter name="filePath" string="true">C:\Users\aditya\OneDrive\Desktop\Task Management backup\frontend\Task-Manager\src\utils\apiPaths.js