# User Management System

A complete full-stack user management system built with Next.js frontend and designed to integrate with a Node.js + Express + MongoDB backend.

## Features

### Core Functionality
- ✅ **CRUD Operations**: Create, Read, Update, and Delete users
- ✅ **User Authentication**: Secure password management with validation
- ✅ **Role-Based Access**: Support for Admin, Moderator, and User roles
- ✅ **Status Management**: Active/Inactive user status tracking

### Advanced Features
- 🔍 **Search & Filter**: Real-time search by name/email with role and status filters
- 📄 **Pagination**: Efficient data loading with customizable page sizes
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- ⚡ **Performance**: Optimized with debounced search and efficient state management
- 🔐 **Password Security**: Strong password validation and secure update flow
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **State Management**: React Hooks (useState, useEffect, useCallback)

### Backend (API Integration Ready)
- **Framework**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Validation**: express-validator

## Project Structure

```
nextjs/
├── frontend/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Dashboard with stats
│   │   ├── users/
│   │   │   └── page.tsx          # Main user management page
│   │   ├── layout.tsx            # Root layout with navbar
│   │   ├── page.tsx              # Home page
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── Button.tsx            # Reusable button component
│   │   ├── Input.tsx             # Form input component
│   │   ├── Select.tsx            # Dropdown select component
│   │   ├── Modal.tsx             # Modal dialog component
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── UserForm.tsx          # User create/edit form
│   │   ├── UserTable.tsx         # User list table
│   │   ├── UserFilters.tsx       # Search and filter controls
│   │   ├── Pagination.tsx        # Pagination component
│   │   └── PasswordUpdateModal.tsx # Password update modal
│   ├── lib/
│   │   ├── api.ts                # API service layer
│   │   ├── utils.ts              # Utility functions
│   │   └── validators.ts         # Form validation logic
│   ├── types/
│   │   └── user.ts               # TypeScript interfaces
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   cd nextjs/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example env file
   cp env.example .env.local
   
   # Edit .env.local and set your API URL
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## API Integration

The frontend is designed to integrate with a REST API. The expected API endpoints are:

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (with pagination & filters) |
| GET | `/api/users/:id` | Get single user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| PUT | `/api/users/:id/password` | Update user password |
| DELETE | `/api/users/:id` | Delete user |

### Query Parameters for GET `/api/users`
- `search` - Search by name or email
- `role` - Filter by role (admin, moderator, user)
- `status` - Filter by status (active, inactive)
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

### Request/Response Examples

**Create User (POST /api/users)**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "user",
  "status": "active"
}
```

**Update User (PUT /api/users/:id)**
```json
{
  "name": "John Doe Updated",
  "email": "john.updated@example.com",
  "role": "moderator",
  "status": "active"
}
```

**Update Password (PUT /api/users/:id/password)**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewSecurePass123",
  "confirmPassword": "NewSecurePass123"
}
```

**Paginated Response**
```json
{
  "data": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
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

## Features in Detail

### User Management Page (`/users`)
- **Create User**: Modal form with validation for creating new users
- **Edit User**: Update user information (name, email, role, status)
- **Delete User**: Confirmation modal before deletion
- **Update Password**: Secure password update with current password verification
- **Search**: Real-time search with debouncing (300ms delay)
- **Filters**: Filter by role and status
- **Pagination**: Navigate through pages with customizable page size

### Dashboard Page (`/dashboard`)
- User statistics overview
- Quick action cards
- Recent activity feed

### Validation Rules
- **Name**: Minimum 2 characters
- **Email**: Valid email format
- **Password**: 
  - Minimum 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 number

## Component Architecture

### Reusable Components
- **Button**: Variants (primary, secondary, danger, ghost), sizes, loading states
- **Input**: Labels, errors, helper text, validation
- **Select**: Dropdown with options, labels, errors
- **Modal**: Customizable size, backdrop, close handlers

### Smart Components
- **UserForm**: Handles both create and edit modes with validation
- **UserTable**: Displays users with action buttons
- **UserFilters**: Manages search and filter state
- **Pagination**: Handles page navigation logic

## State Management

The application uses React Hooks for state management:
- `useState` for local component state
- `useEffect` for side effects and data fetching
- `useCallback` for memoized callbacks (debouncing)

## Error Handling

- API errors are caught and displayed to users
- Form validation errors shown inline
- Fallback to mock data if API is unavailable
- Loading states for async operations

## Styling

Built with Tailwind CSS featuring:
- Utility-first approach
- Responsive design (mobile-first)
- Custom color palette
- Smooth transitions and animations
- Consistent spacing and typography

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- [ ] Bulk user operations
- [ ] Export users to CSV/Excel
- [ ] Advanced role permissions
- [ ] User profile pictures
- [ ] Email notifications
- [ ] Activity logs
- [ ] Dark mode support
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please open an issue on the repository.

---

**Built with ❤️ using Next.js and TypeScript**
