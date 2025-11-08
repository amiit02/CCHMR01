# DrivePro Academy - Driving School Website

A comprehensive driving school management website built with React, Node.js, and MongoDB. This full-stack application provides a complete solution for driving schools to manage students, instructors, courses, and bookings.

## 🚗 Features

### For Students
- **User Registration & Authentication** - Secure signup and login system
- **Course Browsing** - Browse available driving courses by category
- **Instructor Discovery** - Find and view instructor profiles with ratings and specialties
- **Lesson Booking** - Book driving lessons with preferred instructors
- **Dashboard** - Track progress, view bookings, and manage account
- **Profile Management** - Update personal information and emergency contacts

### For Instructors
- **Profile Management** - Create and manage instructor profiles
- **Availability Scheduling** - Set available time slots
- **Student Management** - View and manage student bookings
- **Rating System** - Receive feedback from students

### For Administrators
- **User Management** - Manage students and instructors
- **Course Management** - Create and update course offerings
- **Booking Management** - Oversee all bookings and schedules
- **Payment Processing** - Handle payments and refunds

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **React Router** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Form handling and validation
- **React DatePicker** - Date selection components
- **React Icons** - Icon library
- **Axios** - HTTP client for API calls
- **React Toastify** - Notification system

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **Express Validator** - Input validation
- **Multer** - File upload handling
- **Nodemailer** - Email functionality
- **Stripe** - Payment processing

## 📁 Project Structure

```
driving-school-website/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   └── App.js
│   └── package.json
├── server/                 # Node.js backend
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── index.js
└── package.json          # Root package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd driving-school-website
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/driving-school
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=5000
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   STRIPE_SECRET_KEY=your-stripe-secret-key
   STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the React frontend (port 3000) and Node.js backend (port 5000).

### Alternative Setup

**Start servers separately:**

Backend:
```bash
cd server
npm install
npm run dev
```

Frontend:
```bash
cd client
npm install
npm start
```

## 📱 Pages & Features

### Public Pages
- **Home** - Landing page with hero section and features
- **About** - Information about the driving school
- **Courses** - Browse available driving courses
- **Instructors** - View instructor profiles
- **Login/Register** - Authentication pages

### Protected Pages
- **Dashboard** - Student dashboard with stats and quick actions
- **Booking** - Book lessons with instructors
- **Profile** - Manage personal information

## 🔐 Authentication

The application uses JWT-based authentication with the following features:
- Secure password hashing with bcrypt
- Token-based session management
- Protected routes and API endpoints
- User role management (Student, Instructor, Admin)

## 💳 Payment Integration

- Stripe integration for secure payments
- Payment intent creation and confirmation
- Booking status management
- Refund handling

## 🎨 UI/UX Features

- **Responsive Design** - Works on all device sizes
- **Modern UI** - Clean, professional design
- **Smooth Animations** - Framer Motion animations
- **Interactive Components** - Hover effects and transitions
- **Form Validation** - Real-time form validation
- **Loading States** - User feedback during operations

## 🗄️ Database Schema

### User Model
- Personal information (name, email, phone, DOB)
- Address and emergency contact
- Role-based access control
- Profile management

### Instructor Model
- Professional information
- Specializations and experience
- Availability and pricing
- Rating and reviews

### Course Model
- Course details and curriculum
- Pricing and duration
- Prerequisites and requirements
- Instructor assignment

### Booking Model
- Student and instructor references
- Date, time, and duration
- Payment status and pricing
- Location and notes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Instructors
- `GET /api/instructors` - Get all instructors
- `GET /api/instructors/:id` - Get instructor by ID
- `POST /api/instructors` - Create instructor (Admin)
- `PUT /api/instructors/:id` - Update instructor

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course (Admin)
- `PUT /api/courses/:id` - Update course (Admin)

### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id/cancel` - Cancel booking

### Payments
- `POST /api/payments/create-payment-intent` - Create payment
- `POST /api/payments/confirm` - Confirm payment

## 🚀 Deployment

### Frontend (React)
- Build the React app: `npm run build`
- Deploy to platforms like Vercel, Netlify, or AWS S3

### Backend (Node.js)
- Deploy to platforms like Heroku, AWS EC2, or DigitalOcean
- Set up MongoDB Atlas for cloud database
- Configure environment variables

### Database
- Use MongoDB Atlas for cloud hosting
- Set up proper security and access controls

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔮 Future Enhancements

- **Mobile App** - React Native mobile application
- **Video Lessons** - Online video content
- **Progress Tracking** - Detailed learning analytics
- **Social Features** - Student community and reviews
- **Advanced Scheduling** - Recurring lesson bookings
- **Multi-language Support** - Internationalization
- **Advanced Reporting** - Business intelligence dashboard

---

**DrivePro Academy** - Learn to drive with confidence! 🚗✨
