# User Management Backend API

A complete RESTful API built with Node.js, Express, and MongoDB for the User Management System.

## 🚀 Features

- ✅ **CRUD Operations** - Complete user management
- ✅ **MongoDB Integration** - Mongoose ODM
- ✅ **Password Hashing** - Bcrypt encryption
- ✅ **Validation** - Express-validator
- ✅ **Error Handling** - Centralized error handling
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Security** - Helmet.js security headers
- ✅ **Logging** - Morgan HTTP request logger
- ✅ **Pagination** - Efficient data loading
- ✅ **Search & Filter** - Advanced querying

## 📋 Prerequisites

- **Node.js** 18+ installed
- **MongoDB** installed and running
- **npm** or **yarn** package manager

## 🛠️ Installation

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

### Step 2: Configure Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env and set your values
```

**Environment Variables:**
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### Step 3: Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Step 4: Seed Database (Optional)

```bash
npm run seed
```

This creates 3 sample users:
- **john@example.com** (Admin) - Password: AdminPass123
- **jane@example.com** (User) - Password: UserPass123
- **bob@example.com** (Moderator) - Password: ModPass123

### Step 5: Start Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

Server will run on **http://localhost:5000**

## 📡 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users (with pagination & filters) |
| GET | `/users/:id` | Get single user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| PUT | `/users/:id/password` | Update user password |
| DELETE | `/users/:id` | Delete user |

## 📝 API Usage Examples

### 1. Get All Users

```bash
GET /api/users
```

**Query Parameters:**
- `search` - Search by name or email
- `role` - Filter by role (admin, moderator, user)
- `status` - Filter by status (active, inactive)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example:**
```bash
GET /api/users?search=john&role=admin&page=1&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10
  }
}
```

### 2. Get Single User

```bash
GET /api/users/:id
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin",
  "status": "active",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

### 3. Create User

```bash
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user",
  "status": "active"
}
```

**Response (201 Created):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "status": "active",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

### 4. Update User

```bash
PUT /api/users/:id
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "moderator",
  "status": "active"
}
```

### 5. Update Password

```bash
PUT /api/users/:id/password
Content-Type: application/json

{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

**Response:**
```json
{
  "message": "Password updated successfully"
}
```

### 6. Delete User

```bash
DELETE /api/users/:id
```

**Response:**
```json
{
  "message": "User deleted successfully"
}
```

## 🔐 Validation Rules

### Create User
- **name**: Required, min 2 characters
- **email**: Required, valid email format, unique
- **password**: Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number
- **role**: Optional, one of: admin, moderator, user
- **status**: Optional, one of: active, inactive

### Update User
- **name**: Optional, min 2 characters
- **email**: Optional, valid email format, unique
- **role**: Optional, one of: admin, moderator, user
- **status**: Optional, one of: active, inactive

### Update Password
- **currentPassword**: Required
- **newPassword**: Required, min 8 chars, 1 uppercase, 1 lowercase, 1 number
- **confirmPassword**: Required, must match newPassword

## 🗂️ Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   └── userController.js    # User business logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Error handling
│   │   └── validation.js        # Input validation
│   ├── models/
│   │   └── User.js              # User schema
│   ├── routes/
│   │   └── userRoutes.js        # API routes
│   ├── utils/
│   │   └── seed.js              # Database seeding
│   └── server.js                # Express app
├── .env.example                 # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🛡️ Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **Helmet.js**: Security headers
- **CORS**: Configured for frontend origin
- **Input Validation**: Express-validator
- **Error Handling**: No sensitive data in errors
- **MongoDB Injection**: Protected by Mongoose

## 🧪 Testing the API

### Using cURL

```bash
# Get all users
curl http://localhost:5000/api/users

# Create a user
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123",
    "role": "user",
    "status": "active"
  }'

# Update a user
curl -X PUT http://localhost:5000/api/users/USER_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'

# Delete a user
curl -X DELETE http://localhost:5000/api/users/USER_ID
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5000/api`
3. Test each endpoint with sample data

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify MongoDB is listening on port 27017

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env
PORT=5001
```

### Validation Errors

Check request body matches validation rules. All errors are returned with field names and messages.

## 📊 Database Schema

### User Model

```javascript
{
  name: String (required, min 2 chars),
  email: String (required, unique, valid email),
  password: String (required, min 8 chars, hashed),
  role: String (enum: admin, moderator, user),
  status: String (enum: active, inactive),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## 🚀 Deployment

### Environment Setup

1. Set NODE_ENV=production
2. Use strong JWT_SECRET
3. Configure production MongoDB URI
4. Enable HTTPS
5. Set proper CORS origins

### Recommended Platforms

- **Heroku**
- **Railway**
- **Render**
- **DigitalOcean**
- **AWS EC2**

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT authentication
- **cors**: CORS middleware
- **dotenv**: Environment variables
- **express-validator**: Input validation
- **helmet**: Security headers
- **morgan**: HTTP logger

## 🔄 Integration with Frontend

1. Update frontend `.env.local`:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

2. Start both servers:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

3. Frontend will connect to backend automatically

## 📝 Available Scripts

```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
npm run seed    # Seed database with sample data
```

## 🎯 Next Steps

1. ✅ Backend is ready
2. ✅ Connect frontend to backend
3. ✅ Test all CRUD operations
4. 🔄 Add authentication (JWT)
5. 🔄 Add role-based permissions
6. 🔄 Add unit tests
7. 🔄 Deploy to production

---

**Backend API is ready to use! 🚀**

Start the server with `npm run dev` and test at http://localhost:5000
