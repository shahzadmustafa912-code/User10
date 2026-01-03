# Installation & Testing Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Git**: For version control (optional)
- **Code Editor**: VS Code recommended

### Check Your Versions

```bash
node --version    # Should be v18.0.0 or higher
npm --version     # Should be 9.0.0 or higher
```

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd "c:/Users/Umer Iqbal/Desktop/nextjs/frontend"
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5.x
- Tailwind CSS 4.1.14
- And all other dependencies

**Expected Output:**
```
added XXX packages in XXs
```

### Step 3: Configure Environment (Optional)

If you want to connect to a backend API:

```bash
# Create environment file
copy env.example .env.local

# Edit .env.local and set your API URL
# NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Note:** The app works with mock data by default, so this step is optional for testing.

### Step 4: Start Development Server

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

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

## ✅ Verification Checklist

### Visual Verification

- [ ] Home page loads with hero section
- [ ] Navigation bar appears at the top
- [ ] "Get Started" and "View Dashboard" buttons are visible
- [ ] Feature cards display correctly
- [ ] Page is responsive (try resizing browser)

### Functional Testing

#### 1. Navigation Test
- [ ] Click "Users" in navbar → Should go to `/users`
- [ ] Click "Dashboard" in navbar → Should go to `/dashboard`
- [ ] Click "Home" in navbar → Should go to `/`
- [ ] Logo click → Should go to home page

#### 2. Users Page Test (`/users`)

**Initial Load:**
- [ ] Page displays "User Management" heading
- [ ] Search box is visible
- [ ] Filter dropdowns (Role, Status) are present
- [ ] "Add New User" button is visible
- [ ] User table shows 3 mock users (John Doe, Jane Smith, Bob Johnson)
- [ ] Each user row has edit, password, and delete icons

**Search Functionality:**
- [ ] Type "john" in search box
- [ ] Results filter after 300ms delay
- [ ] Clear search → All users appear again

**Filter Functionality:**
- [ ] Select "Admin" from Role filter → Shows only admin users
- [ ] Select "Active" from Status filter → Shows only active users
- [ ] Select "All Roles" → Shows all users
- [ ] Combine filters → Works correctly

**Create User:**
- [ ] Click "Add New User" button
- [ ] Modal opens with form
- [ ] Fill in form:
  - Name: Test User
  - Email: test@example.com
  - Password: TestPass123
  - Role: User
  - Status: Active
- [ ] Click "Create User"
- [ ] Success message appears
- [ ] Modal closes

**Edit User:**
- [ ] Click edit icon (pencil) on any user
- [ ] Modal opens with pre-filled form
- [ ] Change name to "Updated Name"
- [ ] Click "Update User"
- [ ] Success message appears
- [ ] Modal closes

**Update Password:**
- [ ] Click key icon on any user
- [ ] Password modal opens
- [ ] Fill in:
  - Current Password: OldPass123
  - New Password: NewPass456
  - Confirm Password: NewPass456
- [ ] Click "Update Password"
- [ ] Success message appears
- [ ] Modal closes

**Delete User:**
- [ ] Click delete icon (trash) on any user
- [ ] Confirmation modal appears
- [ ] Click "Delete User"
- [ ] Success message appears
- [ ] User removed from list

**Pagination:**
- [ ] If more than 10 users, pagination appears
- [ ] Click page numbers to navigate
- [ ] Previous/Next buttons work correctly

#### 3. Dashboard Test (`/dashboard`)

- [ ] Page displays "Dashboard" heading
- [ ] Four stat cards show:
  - Total Users
  - Active Users
  - Inactive Users
  - Admin Users
- [ ] Quick action cards are clickable
- [ ] Recent activity section displays

#### 4. Responsive Design Test

**Desktop (1920px):**
- [ ] Full layout displays correctly
- [ ] All features accessible

**Tablet (768px):**
- [ ] Layout adjusts appropriately
- [ ] Navigation remains functional
- [ ] Tables are scrollable

**Mobile (375px):**
- [ ] Mobile menu appears
- [ ] Content stacks vertically
- [ ] Buttons are touch-friendly
- [ ] Forms are usable

#### 5. Form Validation Test

**Name Validation:**
- [ ] Leave name empty → Error: "Name is required"
- [ ] Enter "A" → Error: "Name must be at least 2 characters"
- [ ] Enter "John Doe" → No error

**Email Validation:**
- [ ] Leave email empty → Error: "Email is required"
- [ ] Enter "invalid" → Error: "Invalid email address"
- [ ] Enter "test@example.com" → No error

**Password Validation:**
- [ ] Leave password empty → Error: "Password is required"
- [ ] Enter "short" → Error: "Password must be at least 8 characters"
- [ ] Enter "lowercase" → Error: "Must contain uppercase"
- [ ] Enter "UPPERCASE" → Error: "Must contain lowercase"
- [ ] Enter "NoNumbers" → Error: "Must contain number"
- [ ] Enter "ValidPass123" → No error

#### 6. Error Handling Test

**Network Error Simulation:**
- [ ] Disconnect internet
- [ ] Try to create user
- [ ] Error message displays
- [ ] App falls back to mock data
- [ ] No crashes occur

#### 7. Loading States Test

- [ ] Loading spinner appears during operations
- [ ] Buttons show "Loading..." text
- [ ] Buttons are disabled during loading
- [ ] UI remains responsive

## 🐛 Common Issues & Solutions

### Issue 1: Port 3000 Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution:**
```bash
# Option 1: Kill the process
npx kill-port 3000

# Option 2: Use different port
npm run dev -- -p 3001
```

### Issue 2: Module Not Found

**Error:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

### Issue 3: TypeScript Errors

**Error:**
```
Type 'X' is not assignable to type 'Y'
```

**Solution:**
```bash
# Check TypeScript version
npm list typescript

# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### Issue 4: Styles Not Loading

**Error:**
Tailwind classes not applying

**Solution:**
```bash
# Verify Tailwind is installed
npm list tailwindcss

# Clear Next.js cache
rm -rf .next
npm run dev
```

### Issue 5: API Connection Failed

**Error:**
```
Failed to fetch users
```

**Solution:**
- Check if backend is running
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors
- App will use mock data as fallback

## 🧪 Testing Scenarios

### Scenario 1: New User Onboarding

1. Open `/users`
2. Click "Add New User"
3. Create user with valid data
4. Verify user appears in list
5. Edit the new user
6. Update password
7. Delete the user

**Expected:** All operations complete successfully

### Scenario 2: Search & Filter

1. Open `/users`
2. Search for "john"
3. Verify only matching users show
4. Clear search
5. Filter by "Admin" role
6. Filter by "Active" status
7. Clear all filters

**Expected:** Filters work independently and together

### Scenario 3: Form Validation

1. Click "Add New User"
2. Try to submit empty form
3. Verify all validation errors appear
4. Fill form with invalid data
5. Verify specific field errors
6. Fix all errors
7. Submit successfully

**Expected:** Validation prevents invalid submissions

### Scenario 4: Responsive Behavior

1. Open `/users` on desktop
2. Resize to tablet width
3. Verify layout adapts
4. Resize to mobile width
5. Test mobile menu
6. Test all features on mobile

**Expected:** Full functionality on all screen sizes

## 📊 Performance Benchmarks

### Expected Performance

- **Initial Load**: < 3 seconds
- **Page Navigation**: < 500ms
- **Search Response**: 300ms debounce
- **Modal Open**: Instant
- **Form Submit**: < 1 second

### Check Performance

```bash
# Build for production
npm run build

# Analyze bundle
npm run build -- --analyze
```

## 🔍 Browser Console Checks

Open browser DevTools (F12) and verify:

### Console Tab
- [ ] No error messages
- [ ] No warning messages
- [ ] API calls logged (if verbose mode)

### Network Tab
- [ ] All resources load successfully
- [ ] No 404 errors
- [ ] API calls return expected responses

### Performance Tab
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] No layout shifts

## ✨ Success Criteria

Your installation is successful if:

1. ✅ All pages load without errors
2. ✅ Navigation works correctly
3. ✅ All CRUD operations function
4. ✅ Search and filters work
5. ✅ Forms validate properly
6. ✅ Modals open and close
7. ✅ Responsive design works
8. ✅ No console errors
9. ✅ Mock data displays
10. ✅ UI is visually correct

## 🎉 Next Steps

After successful installation and testing:

1. **Customize**: Modify components to match your brand
2. **Integrate**: Connect to your backend API
3. **Extend**: Add new features
4. **Deploy**: Build and deploy to production
5. **Monitor**: Set up error tracking and analytics

## 📚 Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## 🆘 Getting Help

If you encounter issues:

1. Check this installation guide
2. Review the README.md
3. Check browser console for errors
4. Verify all prerequisites are met
5. Try clearing cache and reinstalling

---

**Installation Complete! 🚀**

Your user management system is ready to use!
