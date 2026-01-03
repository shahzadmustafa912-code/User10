# API Documentation

This document describes the expected API endpoints for the User Management System frontend.

## Base URL

```
http://localhost:5000/api
```

Configure this in your `.env.local` file:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Authentication

Currently, the frontend does not implement authentication headers. You can extend the API service in `lib/api.ts` to add JWT tokens:

```typescript
headers: {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`,
  ...options.headers,
}
```

## Endpoints

### 1. Get All Users (with Pagination & Filters)

**Endpoint:** `GET /api/users`

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search by name or email |
| role | string | No | Filter by role: `admin`, `moderator`, `user` |
| status | string | No | Filter by status: `active`, `inactive` |
| page | number | No | Page number (default: 1) |
| limit | number | No | Items per page (default: 10) |

**Example Request:**
```
GET /api/users?search=john&role=admin&status=active&page=1&limit=10
```

**Response (200 OK):**
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

---

### 2. Get Single User

**Endpoint:** `GET /api/users/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

**Example Request:**
```
GET /api/users/507f1f77bcf86cd799439011
```

**Response (200 OK):**
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

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### 3. Create User

**Endpoint:** `POST /api/users`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user",
  "status": "active"
}
```

**Field Validation:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | Min 2 characters |
| email | string | Yes | Valid email format, unique |
| password | string | Yes | Min 8 chars, 1 uppercase, 1 lowercase, 1 number |
| role | string | Yes | One of: `admin`, `moderator`, `user` |
| status | string | Yes | One of: `active`, `inactive` |

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

**Error Response (400 Bad Request):**
```json
{
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email already exists"
    }
  ]
}
```

---

### 4. Update User

**Endpoint:** `PUT /api/users/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

**Request Body:**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "moderator",
  "status": "active"
}
```

**Field Validation:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | No | Min 2 characters |
| email | string | No | Valid email format, unique |
| role | string | No | One of: `admin`, `moderator`, `user` |
| status | string | No | One of: `active`, `inactive` |

**Note:** Password cannot be updated through this endpoint. Use the password update endpoint instead.

**Response (200 OK):**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "moderator",
  "status": "active",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T12:45:00.000Z"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### 5. Update User Password

**Endpoint:** `PUT /api/users/:id/password`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

**Request Body:**
```json
{
  "currentPassword": "OldSecurePass123",
  "newPassword": "NewSecurePass456",
  "confirmPassword": "NewSecurePass456"
}
```

**Field Validation:**
| Field | Type | Required | Validation |
|-------|------|----------|------------|
| currentPassword | string | Yes | Must match existing password |
| newPassword | string | Yes | Min 8 chars, 1 uppercase, 1 lowercase, 1 number |
| confirmPassword | string | Yes | Must match newPassword |

**Response (200 OK):**
```json
{
  "message": "Password updated successfully"
}
```

**Error Response (400 Bad Request):**
```json
{
  "message": "Current password is incorrect"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

### 6. Delete User

**Endpoint:** `DELETE /api/users/:id`

**URL Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| id | string | Yes | User ID |

**Example Request:**
```
DELETE /api/users/507f1f77bcf86cd799439011
```

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "message": "User not found"
}
```

---

## Error Handling

All endpoints should return appropriate HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation errors) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

**Standard Error Response Format:**
```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

## CORS Configuration

Your backend should allow requests from the frontend origin:

```javascript
// Express CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Data Types

### User Object
```typescript
interface User {
  id: string;                    // MongoDB ObjectId as string
  name: string;                  // User's full name
  email: string;                 // Unique email address
  role: 'admin' | 'user' | 'moderator';  // User role
  status: 'active' | 'inactive'; // Account status
  createdAt: string;             // ISO 8601 date string
  updatedAt: string;             // ISO 8601 date string
}
```

### Pagination Object
```typescript
interface Pagination {
  currentPage: number;    // Current page number
  totalPages: number;     // Total number of pages
  totalItems: number;     // Total number of items
  itemsPerPage: number;   // Items per page
}
```

## Testing the API

### Using cURL

**Get all users:**
```bash
curl http://localhost:5000/api/users
```

**Create a user:**
```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123",
    "role": "user",
    "status": "active"
  }'
```

**Update a user:**
```bash
curl -X PUT http://localhost:5000/api/users/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "role": "moderator"
  }'
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:5000/api/users/507f1f77bcf86cd799439011
```

### Using Postman

1. Import the endpoints into Postman
2. Set the base URL to `http://localhost:5000/api`
3. Create a collection for User Management
4. Test each endpoint with sample data

## Implementation Notes

### Backend Implementation Checklist

- [ ] Set up Express server with MongoDB
- [ ] Create User model with Mongoose
- [ ] Implement password hashing (bcrypt)
- [ ] Add input validation (express-validator)
- [ ] Implement pagination logic
- [ ] Add search functionality (regex on name/email)
- [ ] Add filtering by role and status
- [ ] Implement error handling middleware
- [ ] Configure CORS
- [ ] Add request logging
- [ ] Test all endpoints

### Security Considerations

1. **Password Storage**: Always hash passwords using bcrypt
2. **Input Validation**: Validate and sanitize all inputs
3. **SQL Injection**: Use parameterized queries (MongoDB is safe by default)
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **HTTPS**: Use HTTPS in production
6. **Authentication**: Add JWT authentication for protected routes
7. **Authorization**: Implement role-based access control

## Frontend Integration

The frontend API service is located at `frontend/lib/api.ts`. It includes:

- Type-safe API calls
- Error handling
- Request/response transformation
- Centralized API configuration

To modify the API integration:

1. Update `NEXT_PUBLIC_API_URL` in `.env.local`
2. Modify `lib/api.ts` to add authentication headers
3. Update types in `types/user.ts` if API response changes
4. Handle additional error cases in components

---

**Last Updated:** 2025-01-15
