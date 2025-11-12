# Code Walkthrough - Driving School Project

A complete guide to understanding every section of the codebase. This document explains the architecture, flow, and implementation details from scratch.

---

## Table of Contents
1. [Project Architecture Overview](#project-architecture-overview)
2. [Backend Structure](#backend-structure)
3. [Frontend Structure](#frontend-structure)
4. [Authentication Flow](#authentication-flow)
5. [Key Features Explained](#key-features-explained)
6. [Database Models](#database-models)
7. [API Routes & Endpoints](#api-routes--endpoints)

---

## Project Architecture Overview

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (React)                          │
│  - Pages: Home, Courses, Instructors, Booking, Profile      │
│  - Components: Navbar, Footer, Chatbot, ErrorBoundary      │
│  - Context: AuthContext (manages login state)              │
│  - Styling: styled-components (CSS-in-JS)                  │
└────────────────────────┬────────────────────────────────────┘
                         │
                    HTTP/AXIOS
                 API Calls (REST)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 SERVER (Express.js)                         │
│  - Routes: /auth, /users, /instructors, /courses, etc.     │
│  - Middleware: auth (JWT verification)                     │
│  - Middleware: upload (multer for file handling)           │
│  - Controllers/Logic: In route files                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                    MongoDB
                    Mongoose ODM
                         │
┌────────────────────────▼────────────────────────────────────┐
│               DATABASE (MongoDB Atlas)                      │
│  - Collections: users, instructors, courses, bookings      │
│  - Collections: auditleogs, chat messages                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Backend Structure

### 1. Server Entry Point: `server/index.js`

**What it does**: Initializes the Express server, connects to MongoDB, and sets up all middleware and routes.

- Loads environment variables via `dotenv`
- Configures CORS (allows frontend to communicate)
- Sets up Express middleware (JSON parsing, static files)
- Registers all API routes
- Connects to MongoDB with retry logic
- Starts the server on configured port

---

### 2. Authentication Middleware: `server/middleware/auth.js`

**What it does**: Verifies JWT tokens on protected routes.

```javascript
const token = req.header('Authorization')?.replace('Bearer ', '');
// Extracts token from "Bearer <token>" format
// Verifies it using JWT_SECRET
// If valid: continues to next handler with req.userId set
// If invalid: returns 401 error
```

---

### 3. Database Models

#### User Model: `server/models/User.js`
- firstName, lastName, email, password
- phone, dateOfBirth, address
- role (student/instructor/admin)
- licenseNumber, licenseExpiry (for instructors)
- Includes password hashing via bcrypt pre-save hook
- Method: `matchPassword()` to compare passwords during login

#### Instructor Model: `server/models/Instructor.js`
- References User model via `user` field
- licenseNumber, specializations, experience
- hourlyRate, bio, rating, profileImage

#### Course Model: `server/models/Course.js`
- name, description, duration, price, level
- instructor reference, enrolledStudents array
- curriculum, isActive

#### Booking Model: `server/models/Booking.js`
- student and instructor references
- bookingDate, duration, totalPrice
- status (pending/confirmed/completed/cancelled)
- paymentStatus (unpaid/paid/refunded)

#### AuditLog Model: `server/models/AuditLog.js`
- Logs user actions for security
- Tracks: register, login, logout, update, delete, book, payment
- Stores: user ID, action type, status, IP address, metadata

---

### 4. Authentication Route: `server/routes/auth.js`

#### POST /api/auth/register
1. Validates input fields (email format, password length, etc.)
2. Checks if email already exists
3. Creates new User (password auto-hashes)
4. Generates JWT token (valid 7 days)
5. Logs action to AuditLog
6. Returns token and user data

#### POST /api/auth/login
1. Validates email/password format
2. Finds user by email in database
3. Uses bcrypt to compare provided password with hashed password
4. If valid: generates JWT token
5. Logs successful login to AuditLog
6. Returns token to client

---

## Frontend Structure

### 1. App Entry Point: `client/src/App.js`

Sets up:
- React Router (client-side routing)
- AuthProvider (global auth state)
- Error boundary (catches React errors)
- Navbar and Footer (layout wrapper)
- Routes to all pages (Home, Courses, Instructors, Login, Register, Dashboard, Booking, Profile, Admin)
- ToastContainer (notification system)

---

### 2. Authentication Context: `client/src/context/AuthContext.js`

**Purpose**: Global state management for authentication using React Context + useReducer

**State**:
- `user`: Current logged-in user object
- `token`: JWT token from server
- `isAuthenticated`: Boolean flag
- `loading`: Loading indicator during auth operations
- `error`: Error message if auth fails

**Actions** (via reducer):
- `LOGIN_START`: Start login process (loading = true)
- `LOGIN_SUCCESS`: Login succeeded (store token + user)
- `LOGIN_FAILURE`: Login failed (show error)
- `LOGOUT`: User logged out (clear state)
- `UPDATE_USER`: Update user info
- `CLEAR_ERROR`: Clear error message

**Key functions**:
- `login(email, password)`: Calls POST /api/auth/login
- `register(userData)`: Calls POST /api/auth/register
- `logout()`: Clears token and state

**Side effects**:
1. When token changes: Set axios Authorization header and save to localStorage
2. On app load: Check localStorage for token and verify it with server

**Custom hook**:
```javascript
export const useAuth = () => {
  // Allows any component to access auth context
  const context = useContext(AuthContext);
  return context; // Returns: { user, token, isAuthenticated, login, logout, register, loading, error }
};
```

---

## Authentication Flow

### Complete Login Flow

```
User enters email/password
        ↓
Login page calls: auth.login(email, password)
        ↓
axios sends: POST /api/auth/login { email, password }
        ↓
Server receives request at POST /api/auth/login
        ↓
Server validates and finds user by email
        ↓
Server compares password using bcrypt
        ↓
If valid: Server generates JWT token
        ↓
Server returns: { token, user: { id, firstName, lastName, email, role } }
        ↓
AuthContext receives response
        ↓
Dispatch LOGIN_SUCCESS action
        ↓
Store token in localStorage
        ↓
Set axios default header: Authorization: Bearer <token>
        ↓
Auth context state updates → All components re-render
        ↓
Protected pages now accessible (Dashboard, Profile, etc.)
```

---

## Key Features Explained

### 1. Booking System

**Flow**:
1. Student views instructors (`/instructors`)
2. Clicks "Book with Instructor"
3. Redirected to `/booking/:instructorId`
4. Fills form: date, time, duration, notes
5. Clicks "Submit Booking"
6. Backend creates Booking with status `pending`
7. Displays success message
8. Redirects to payment or confirmation

**API**: `POST /api/bookings`
- Request: `{ instructorId, courseId, bookingDate, duration, notes }`
- Creates Booking document
- Calculates totalPrice from instructor hourlyRate
- Sets initial status: `pending`, paymentStatus: `unpaid`

---

### 2. Image Upload (Instructor Profiles)

**Process**:
1. Instructor selects image file from computer
2. Frontend creates FormData with file
3. Sends POST request: `/api/instructors/upload/:id` with multipart/form-data
4. Backend receives file via multer middleware
5. Multer saves file to `server/public/uploads/instructors/`
6. Returns path: `/uploads/instructors/timestamp-filename.jpg`
7. Backend stores path in instructor.profileImage
8. Frontend displays image

**Frontend code**:
```javascript
const [image, setImage] = useState(null);

const handleUpload = async () => {
  const formData = new FormData();
  formData.append('profileImage', image);
  
  await axios.post(`/api/instructors/upload/${instructorId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
```

**Backend middleware** (multer):
- Accepts only image files
- Max file size: 5MB
- Stores in: `server/public/uploads/instructors/`
- Accessible via: `http://localhost:5000/uploads/instructors/filename`

---

### 3. Payment Processing (Stripe)

**Flow**:
1. Student completes booking
2. Clicks "Pay Now"
3. Frontend calls: `POST /api/payments/create-payment-intent`
4. Backend creates Stripe PaymentIntent
5. Returns `clientSecret` to frontend
6. Stripe payment form displays (card entry)
7. Student confirms payment
8. Stripe webhook verifies payment
9. Backend updates booking: `status: confirmed`, `paymentStatus: paid`

---

## API Routes & Endpoints

### Authentication
- `POST /api/auth/register` → Register new user
- `POST /api/auth/login` → Login user
- `GET /api/auth/me` → Get current user (requires auth)

### Users
- `GET /api/users/profile` → Get profile (requires auth)
- `PUT /api/users/profile` → Update profile (requires auth)

### Instructors
- `GET /api/instructors` → Get all instructors
- `GET /api/instructors/:id` → Get specific instructor
- `POST /api/instructors/upload/:id` → Upload image (requires auth)

### Courses
- `GET /api/courses` → Get all courses
- `GET /api/courses/:id` → Get specific course

### Bookings
- `GET /api/bookings` → Get user's bookings (requires auth)
- `POST /api/bookings` → Create booking (requires auth)
- `PUT /api/bookings/:id` → Update booking (requires auth)
- `DELETE /api/bookings/:id` → Cancel booking (requires auth)

### Payments
- `POST /api/payments/create-payment-intent` → Create Stripe payment (requires auth)

### Admin
- `GET /api/admin/stats` → Dashboard stats (admin only)
- `GET /api/admin/users` → Manage users (admin only)
- `GET /api/admin/bookings` → View all bookings (admin only)

---

## Environment Variables (`server/.env`)

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-key-change-in-production
PORT=5000
NODE_ENV=development
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## Data Flow Example: Complete Booking

```
1. User navigates to /instructors
   → React fetches GET /api/instructors
   → Displays list of instructors

2. User clicks "Book with Instructor"
   → React Router redirects to /booking/:instructorId
   → Booking page component mounts

3. User fills booking form (date, time, duration)
   → User clicks "Submit"
   → React calls POST /api/bookings
   → Headers: { Authorization: Bearer <token> }

4. Server receives request
   → auth middleware verifies token
   → Extracts req.userId from token
   → Creates Booking document:
     {
       student: userId,
       instructor: instructorId,
       bookingDate: selectedDate,
       duration: 2,
       status: 'pending',
       paymentStatus: 'unpaid'
     }
   → Saves to MongoDB
   → Returns booking ID

5. Frontend receives booking
   → Shows success toast
   → Redirects to payment page

6. User enters payment info
   → Clicks "Pay Now"
   → Stripe processes payment
   → Webhook confirms payment
   → Backend updates: status = confirmed, paymentStatus = paid

7. User sees confirmed booking in dashboard
```

---

## Error Handling

### Frontend
```javascript
try {
  const response = await axios.post('/api/endpoint', data);
  toast.success('Success!');
} catch (error) {
  if (error.response?.status === 401) {
    // Unauthorized: redirect to login
    navigate('/login');
  } else if (error.response?.status === 400) {
    // Bad request: show validation error
    toast.error(error.response.data.message);
  } else {
    // Other error
    toast.error('Something went wrong');
  }
}
```

### Backend
```javascript
try {
  // Validate input
  if (!req.body.email) {
    return res.status(400).json({ message: 'Email required' });
  }

  // Database operation
  const result = await Model.findById(id);
  if (!result) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.json(result);
} catch (error) {
  res.status(500).json({ message: 'Server error' });
}
```

---

## Summary

**Frontend** (React):
- Renders UI pages and forms
- Makes API calls via axios
- Manages auth state with Context
- Uses styled-components for styling
- Uses React Router for navigation
- Displays notifications with react-toastify

**Backend** (Express):
- Receives HTTP requests
- Validates input data
- Authenticates requests via JWT middleware
- Queries MongoDB via Mongoose
- Returns JSON responses

**Database** (MongoDB):
- Stores users, instructors, courses, bookings
- Relationships via object references
- Indexed fields for fast queries

**Flow**: User actions → React form → axios HTTP request → Express route → MongoDB query → Response back to React → UI update

This project is a complete full-stack application demonstrating modern web development best practices!
