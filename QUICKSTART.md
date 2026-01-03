# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment (Optional)
```bash
# Copy environment file
cp env.example .env.local

# The default API URL is http://localhost:5000/api
# Edit .env.local if you need a different API endpoint
```

### Step 3: Run the Application
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to **http://localhost:3000**

## 📱 What You'll See

### Home Page (/)
- Beautiful landing page with feature overview
- Quick navigation to Users and Dashboard

### Users Page (/users)
- Complete user management interface
- Create, edit, delete users
- Search and filter functionality
- Pagination
- Password management

### Dashboard (/dashboard)
- User statistics
- Quick actions
- Recent activity

## 🎯 Try These Features

### 1. Create a New User
1. Go to `/users`
2. Click "Add New User" button
3. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Password: SecurePass123
   - Role: User
   - Status: Active
4. Click "Create User"

### 2. Search Users
1. Type in the search box
2. Results update automatically (debounced)

### 3. Filter Users
1. Select a role from dropdown (Admin, Moderator, User)
2. Select a status (Active, Inactive)
3. Filters apply immediately

### 4. Edit User
1. Click the edit icon (pencil) on any user row
2. Modify user details
3. Click "Update User"

### 5. Update Password
1. Click the key icon on any user row
2. Enter current and new password
3. Click "Update Password"

### 6. Delete User
1. Click the delete icon (trash) on any user row
2. Confirm deletion in the modal

## 🔧 API Integration

The frontend includes mock data for demonstration. To connect to a real backend:

1. **Set up your backend API** (Node.js + Express + MongoDB)
2. **Update the API URL** in `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://your-api-url/api
   ```
3. **Ensure your API implements these endpoints**:
   - `GET /api/users` - List users with pagination
   - `POST /api/users` - Create user
   - `PUT /api/users/:id` - Update user
   - `PUT /api/users/:id/password` - Update password
   - `DELETE /api/users/:id` - Delete user

## 📦 Project Structure

```
frontend/
├── app/
│   ├── users/page.tsx       # Main user management
│   ├── dashboard/page.tsx   # Dashboard
│   └── page.tsx             # Home page
├── components/              # Reusable UI components
├── lib/
│   ├── api.ts              # API integration
│   ├── utils.ts            # Helper functions
│   └── validators.ts       # Form validation
└── types/
    └── user.ts             # TypeScript types
```

## 🎨 Key Features Implemented

✅ **CRUD Operations** - Full create, read, update, delete
✅ **Search** - Real-time search with debouncing
✅ **Filters** - Role and status filtering
✅ **Pagination** - Efficient data loading
✅ **Password Management** - Secure password updates
✅ **Form Validation** - Client-side validation
✅ **Responsive Design** - Mobile-friendly
✅ **Modern UI** - Tailwind CSS styling
✅ **TypeScript** - Type-safe code
✅ **Error Handling** - User-friendly error messages

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill the process using port 3000
npx kill-port 3000

# Or use a different port
npm run dev -- -p 3001
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify your backend is running
- Check browser console for CORS errors
- The app will use mock data if API is unavailable

## 📚 Next Steps

1. **Customize the UI** - Edit components in `/components`
2. **Add Features** - Extend functionality in `/app/users/page.tsx`
3. **Connect Backend** - Integrate with your API
4. **Deploy** - Build and deploy to Vercel, Netlify, etc.

## 🚢 Production Build

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 💡 Tips

- Use the search to quickly find users
- Combine search with filters for precise results
- Password must have 8+ chars, uppercase, lowercase, and number
- Mock data is provided for testing without a backend
- All forms have real-time validation

---

**Need Help?** Check the main README.md for detailed documentation.
