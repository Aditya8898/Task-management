# Deployment Guide

## Prerequisites
- MongoDB Atlas cluster (already configured in `.env`)
- GitHub repository (already pushed)

---

## 1. Backend — Deploy on Koyeb (free, no spin-down)

Koyeb's free tier gives $5.10/month credit — a small Node.js app costs ~$2.32/month, so it's effectively free.

### Steps

1. Go to https://app.koyeb.com and sign in with GitHub
2. Click **Create Web Service**
3. Connect your `Task-management` repository
4. Fill in:
   - **Builder**: `Buildpack`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Run Command**: `npm start`
   - **App type**: `Web Service`
   - **Port**: `8000`
5. Under **Environment Variables**, add:

```
NODE_ENV=production
MONGO_URI=<your MongoDB Atlas connection string>
JWT_SECRET=<your JWT secret>
ADMIN_INVITE_TOKEN=<your admin token>
CLIENT_URL=https://<your-frontend-url>.vercel.app
PORT=8000
```

6. Click **Create Web Service**
7. Wait for deploy. Copy your Koyeb URL (e.g. `https://task-management-api.koyeb.app`)

---

## 2. Frontend — Deploy on Vercel (free, never sleeps)

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New** → **Project**
3. Import your `Task-management` repo
4. Set:
   - **Root Directory**: `frontend/Task-Manager`
   - **Framework Preset**: `Vite`
5. Add environment variable:
   - `VITE_API_URL` = `https://task-management-api.koyeb.app`
6. Click **Deploy**
7. Vercel will give you a URL like `https://task-management.vercel.app`

---

## 3. Environment Variables Summary

| Platform | Variable | Value |
|---|---|---|
| Koyeb | `MONGO_URI` | Your Atlas connection string |
| Koyeb | `JWT_SECRET` | Your JWT secret |
| Koyeb | `ADMIN_INVITE_TOKEN` | Your admin token |
| Koyeb | `CLIENT_URL` | `https://task-management.vercel.app` |
| Koyeb | `PORT` | `8000` |
| Vercel | `VITE_API_URL` | `https://task-management-api.koyeb.app` |

---

## 4. File Uploads

Koyeb, like most free tiers, does not persist uploaded images across restarts. To handle profile photos in production:

**Option A: Cloudinary (free tier — 25GB storage)**
1. Create a free Cloudinary account
2. Replace the multer upload logic to upload to Cloudinary instead

**Option B: Base64 in the database**
Simpler but increases DB size. Currently profileImageUrl stores a path; you can store a base64 data URI instead.

---

## 5. Post-Deployment Checklist

- [ ] Register an admin account with the invite token
- [ ] Login and verify redirect to admin dashboard
- [ ] Create a task with todo checklist items
- [ ] Assign task to a member
- [ ] Login as member, verify task appears in My Tasks
- [ ] Toggle todo checkboxes
- [ ] Verify dashboard charts load
- [ ] Check browser console for CORS errors

---

## 6. Updating After Deployment

Push changes to GitHub — Koyeb and Vercel auto-deploy from the main branch.
