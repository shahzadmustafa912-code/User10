# Quick Reference Card

## 🚀 Start Commands

### Backend
```bash
cd backend
npm install          # First time only
npm run seed         # First time only
npm run dev          # Start server
```
**Runs on**: http://localhost:5000

### Frontend
```bash
cd frontend
npm install          # First time only
npm run dev          # Start server
```
**Runs on**: http://localhost:3000

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get user |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| PUT | `/api/users/:id/password` | Update password |
| DELETE | `/api/users/:id` | Delete user |

## 🔑 Sample Credentials

| Email | Password | Role |
|-------|----------|------|
| john@example.com | AdminPass123 | Admin |
| jane@example.com | UserPass123 | User |
| bob@example.com | ModPass123 | Moderator |

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🐛 Common Issues

### MongoDB not running
```bash
mongod
```

### Port in use
```bash
npx kill-port 5000
npx kill-port 3000
```

### Module not found
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📁 Key Files

### Frontend
- `app/users/page.tsx` - Main user page
- `components/UserForm.tsx` - User form
- `components/UserTable.tsx` - User table
- `lib/api.ts` - API service

### Backend
- `src/server.js` - Express app
- `src/controllers/userController.js` - Logic
- `src/models/User.js` - User model
- `src/routes/userRoutes.js` - Routes

## 🧪 Test URLs

- Home: http://localhost:3000
- Users: http://localhost:3000/users
- Dashboard: http://localhost:3000/dashboard
- API: http://localhost:5000/api/users

## 📚 Documentation

1. **FULLSTACK_SETUP.md** - Complete setup guide
2. **README.md** - Project overview
3. **backend/README.md** - Backend docs
4. **frontend/GETTING_STARTED.md** - Frontend guide

## ⚡ Quick Commands

```bash
# Start both servers (2 terminals)
Terminal 1: cd backend && npm run dev
Terminal 2: cd frontend && npm run dev

# Seed database
cd backend && npm run seed

# Build for production
cd frontend && npm run build
cd backend && npm start

# Kill ports
npx kill-port 3000 5000
```

## 🎯 Features Checklist

- ✅ Create user
- ✅ Edit user
- ✅ Delete user
- ✅ Update password
- ✅ Search users
- ✅ Filter by role
- ✅ Filter by status
- ✅ Pagination

---

**Keep this card handy for quick reference!**
