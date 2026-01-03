# Full-Stack Setup Guide

Complete guide to run the User Management System with both frontend and backend.

## 🎯 Overview

This system consists of:
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ **Node.js** 18+ installed
- ✅ **MongoDB** installed and running
- ✅ **npm** or **yarn** package manager
- ✅ **Git** (optional)

### Check Versions

```bash
node --version    # Should be v18.0.0+
npm --version     # Should be 9.0.0+
mongod --version  # Should be 6.0.0+
```

## 🚀 Quick Start (5 Minutes)

### Step 1: Start MongoDB

```bash
# Windows
mongod

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Seed database with sample data
npm run seed

# Start backend server
npm run dev
```

Backend will run on **http://localhost:5000**

### Step 3: Setup Frontend

Open a **new terminal**:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.example .env.local

# Start frontend server
npm run dev
```

Frontend will run on **http://localhost:3000**

### Step 4: Open in Browser

Navigate to **http://localhost:3000**

## 📝 Detailed Setup

### Backend Setup

#### 1. Install Dependencies

```bash
cd backend
npm install
```

**Dependencies installed:**
- express (Web framework)
- mongoose (MongoDB ODM)
- bcryptjs (Password hashing)
- cors (CORS middleware)
- dotenv (Environment variables)
- express-validator (Validation)
- helmet (Security)
- morgan (Logging)

#### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

#### 3. Start MongoDB

Ensure MongoDB is running:

```bash
# Check if MongoDB is running
mongosh

# If not running, start it:
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### 4. Seed Database (Optional but Recommended)

```bash
npm run seed
```

This creates 3 sample users:
- **john@example.com** (Admin) - Password: AdminPass123
- **jane@example.com** (User) - Password: UserPass123
- **bob@example.com** (Moderator) - Password: ModPass123

#### 5. Start Backend

```bash
npm run dev
```

**Expected Output:**
```
🚀 Server running in development mode on port 5000
✅ MongoDB Connected: localhost
```

**Test Backend:**
```bash
curl http://localhost:5000/api/users
```

### Frontend Setup

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

**Dependencies installed:**
- next (Framework)
- react (UI library)
- typescript (Type safety)
- tailwindcss (Styling)

#### 2. Configure Environment

Create `.env.local` file:

```bash
cp env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 3. Start Frontend

```bash
npm run dev
```

**Expected Output:**
```
▲ Next.js 15.5.4
- Local:        http://localhost:3000
- Network:      http://192.168.x.x:3000

✓ Ready in 2.5s
```

#### 4. Open in Browser

Navigate to **http://localhost:3000**

## ✅ Verification Checklist

### Backend Verification

- [ ] MongoDB is running
- [ ] Backend server started on port 5000
- [ ] No errors in terminal
- [ ] Can access http://localhost:5000
- [ ] API returns user list: http://localhost:5000/api/users

### Frontend Verification

- [ ] Frontend server started on port 3000
- [ ] No errors in terminal
- [ ] Home page loads at http://localhost:3000
- [ ] Can navigate to /users page
- [ ] User table shows 3 sample users

### Integration Verification

- [ ] Frontend connects to backend
- [ ] Can create a new user
- [ ] Can edit existing user
- [ ] Can update password
- [ ] Can delete user
- [ ] Search works
- [ ] Filters work
- [ ] Pagination works

## 🧪 Testing the Integration

### 1. Create a User

1. Go to http://localhost:3000/users
2. Click "Add New User"
3. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: TestPass123
   - Role: User
   - Status: Active
4. Click "Create User"
5. User should appear in the table

### 2. Edit a User

1. Click the edit icon (pencil) on any user
2. Change the name
3. Click "Update User"
4. Changes should be reflected

### 3. Update Password

1. Click the key icon on any user
2. Enter:
   - Current Password: AdminPass123 (for John)
   - New Password: NewPass456
   - Confirm Password: NewPass456
3. Click "Update Password"
4. Success message should appear

### 4. Delete a User

1. Click the delete icon (trash) on any user
2. Confirm deletion
3. User should be removed from the table

### 5. Search and Filter

1. Type "john" in search box
2. Only John Doe should appear
3. Select "Admin" from role filter
4. Only admin users should appear
5. Clear filters to see all users

## 🗂️ Project Structure

```
nextjs/
├── frontend/                    # Next.js Frontend
│   ├── app/                    # Pages
│   ├── components/             # React components
│   ├── lib/                    # Utilities & API
│   ├── types/                  # TypeScript types
│   ├── .env.local              # Frontend environment
│   └── package.json
│
├── backend/                     # Express Backend
│   ├── src/
│   │   ├── config/            # Database config
│   │   ├── controllers/       # Business logic
│   │   ├── middleware/        # Validation & errors
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Utilities
│   │   └── server.js          # Express app
│   ├── .env                    # Backend environment
│   └── package.json
│
└── Documentation files
```

## 🔄 Development Workflow

### Running Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Making Changes

**Frontend Changes:**
- Edit files in `frontend/`
- Hot reload automatically updates browser
- No server restart needed

**Backend Changes:**
- Edit files in `backend/src/`
- Nodemon automatically restarts server
- Check terminal for errors

## 🐛 Common Issues & Solutions

### Issue 1: MongoDB Connection Failed

**Error:**
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
```bash
# Start MongoDB
mongod

# Or check if it's running
mongosh
```

### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE :::5000
```

**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in backend/.env
PORT=5001
```

### Issue 3: CORS Error

**Error:**
```
Access to fetch blocked by CORS policy
```

**Solution:**
- Check `FRONTEND_URL` in `backend/.env`
- Should be: `http://localhost:3000`
- Restart backend server

### Issue 4: API Not Found

**Error:**
```
Failed to fetch users
```

**Solution:**
- Check backend is running on port 5000
- Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Should be: `http://localhost:5000/api`
- Restart frontend server

### Issue 5: Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (paginated) |
| GET | `/api/users/:id` | Get single user |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| PUT | `/api/users/:id/password` | Update password |
| DELETE | `/api/users/:id` | Delete user |

## 🔐 Sample User Credentials

After running `npm run seed`:

| Email | Password | Role | Status |
|-------|----------|------|--------|
| john@example.com | AdminPass123 | Admin | Active |
| jane@example.com | UserPass123 | User | Active |
| bob@example.com | ModPass123 | Moderator | Inactive |

## 📝 Available Scripts

### Backend

```bash
npm start       # Start production server
npm run dev     # Start development server
npm run seed    # Seed database
```

### Frontend

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

## 🚀 Production Deployment

### Backend Deployment

1. **Set environment variables:**
   - `NODE_ENV=production`
   - `MONGODB_URI=<production-mongodb-uri>`
   - `JWT_SECRET=<strong-secret>`
   - `FRONTEND_URL=<production-frontend-url>`

2. **Deploy to:**
   - Heroku
   - Railway
   - Render
   - DigitalOcean

### Frontend Deployment

1. **Set environment variable:**
   - `NEXT_PUBLIC_API_URL=<production-api-url>`

2. **Deploy to:**
   - Vercel (Recommended)
   - Netlify
   - AWS Amplify

## 🎯 Next Steps

1. ✅ Both servers running
2. ✅ Test all CRUD operations
3. ✅ Verify search and filters
4. 🔄 Add authentication (JWT)
5. 🔄 Add role-based permissions
6. 🔄 Add unit tests
7. 🔄 Deploy to production

## 📚 Documentation

- **README.md** - Main project overview
- **frontend/GETTING_STARTED.md** - Frontend guide
- **backend/README.md** - Backend API docs
- **API_DOCUMENTATION.md** - API specifications
- **ARCHITECTURE.md** - Technical architecture
- **FULLSTACK_SETUP.md** - This file

## 💡 Tips

- Keep both terminals open while developing
- Check backend terminal for API errors
- Check frontend terminal for build errors
- Use browser DevTools to debug
- MongoDB Compass for database visualization

## 🆘 Getting Help

1. Check this setup guide
2. Review backend/frontend README files
3. Check terminal for error messages
4. Verify environment variables
5. Ensure MongoDB is running
6. Test backend API directly with cURL/Postman

---

**Full-Stack System Ready! 🎉**

You now have a complete user management system running!

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API: http://localhost:5000/api/users
