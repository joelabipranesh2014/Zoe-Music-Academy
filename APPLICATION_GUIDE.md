# Music Academy Application Guide

## Overview

This is a comprehensive music learning platform (Zoe Music Academy) that allows students to enroll in music courses, watch video lessons, track their progress, and download learning materials. Administrators can manage courses, lessons, users, payments, and testimonials through a dedicated admin panel.

---

## Table of Contents

1. [User Perspective](#user-perspective)
2. [Admin Perspective](#admin-perspective)
3. [Authentication & Access](#authentication--access)
4. [Key Features](#key-features)

---

## User Perspective

### Getting Started

#### 1. **Homepage (`/`)**
- **Purpose**: Landing page showcasing the academy
- **Features**:
  - Hero section with call-to-action buttons
  - Statistics display (students graduated, videos uploaded, instructors)
  - "What We Offer" section explaining the academy's mission
  - Featured courses grid (displays first 4 courses)
  - Testimonials section
  - Free resources section (Keyboard and Guitar beginner courses)
  - Call-to-action to watch free videos

#### 2. **Browsing Courses (`/courses`)**
- **Purpose**: View and filter available music courses
- **Features**:
  - Filter courses by:
    - Instrument type (Keyboard, Guitar, Vocal)
    - Level (Beginner, Intermediate, Advanced)
  - Course cards showing:
    - Course title and description
    - Price
    - Instrument type and level badges
    - "View Details" button
  - Clicking a course navigates to course detail page

#### 3. **Course Details (`/courses/:id`)**
- **Purpose**: View comprehensive information about a specific course
- **Features**:
  - Course banner with title, description, and badges
  - "What You'll Learn" section (learning outcomes)
  - Curriculum section listing all lessons:
    - Lesson numbers and titles
    - Duration for each lesson
    - Free trial indicators
  - Sidebar with:
    - Course price
    - "Enroll Now" button
    - "Free Trial" button
    - Course includes list (videos, materials, access duration, support)
    - Instructor information

#### 4. **Registration & Login**
- **Registration (`/register`)**:
  - Create new account with:
    - Name
    - Email
    - Phone (optional)
    - Password
  - After registration, user is automatically logged in
  
- **Login (`/login`)**:
  - Login with email and password
  - Authentication token stored in localStorage
  - Redirects to dashboard after successful login

### Student Dashboard (`/dashboard`)

**Access**: Requires authentication (logged-in users only)

#### Features:

1. **Welcome Section**
   - Personalized greeting with student name
   - Quick overview message

2. **Statistics Cards**
   - **Enrolled Courses**: Total number of courses student is enrolled in
   - **Lessons Completed**: Total completed lessons across all courses
   - **Hours Watched**: Total time spent watching lessons

3. **My Courses Section**
   - Grid display of enrolled courses
   - Each course card shows:
     - Course title and level badge
     - Progress bar (percentage completed)
     - Number of lessons completed vs total
     - Total course duration
     - "Continue Learning" button
   - "Browse All Courses" link to explore more courses

4. **Recent Activity**
   - Timeline of recent learning activities:
     - Lesson completions
     - Course names
     - Timestamps

5. **Downloads Section**
   - List of downloadable materials:
     - PDF files (sheet music, notes)
     - Audio files (practice tracks)
     - File type and size information
     - Download buttons

### Learning Experience (`/courses/:courseId/learn`)

**Access**: Requires authentication and course enrollment

#### Features:

1. **Video Player Section**
   - Large video player area (currently placeholder for video embedding)
   - Displays current lesson title
   - Video URL information

2. **Lesson Information**
   - Current lesson title
   - Lesson duration
   - Free trial badge (if applicable)
   - "Mark Complete" button (toggles completion status)

3. **Course Content Sidebar**
   - List of all lessons in the course:
     - Lesson numbers and titles
     - Duration for each lesson
     - Completion indicators (checkmarks for completed)
     - Free trial badges
     - Click any lesson to switch to it
   - Course statistics (total lessons, total duration)
   - Active lesson highlighted

4. **Download Materials**
   - Practice sheet music (PDF)
   - Audio practice tracks
   - Lesson notes (PDF)
   - Download buttons for each material

### Additional User Pages

- **About Us (`/about`)**: Information about the academy and instructors
- **FAQ (`/faq`)**: Frequently asked questions
- **Contact (`/contact`)**: Contact form and academy information
- **Free Resources (`/free-resources`)**: Access to free course materials
- **Legal Pages**:
  - Privacy Policy (`/privacy`)
  - Terms & Conditions (`/terms`)
  - Refund Policy (`/refund`)
  - Cancellation Policy (`/cancellation`)

---

## Admin Perspective

### Access Control

- **Admin Routes**: Protected routes accessible only to users with `role: 'admin'`
- **Route Protection**: `AdminRoute` component checks user role
- **Access**: Regular users are redirected to `/dashboard` if they try to access admin routes
- **Authentication**: Admin must be logged in with valid JWT token

### Admin Dashboard (`/admin`)

**Access**: Admin users only

#### Overview Statistics:

1. **Total Users**
   - Count of all registered users
   - Growth percentage from last month

2. **Total Courses**
   - Count of all courses in the system
   - Number of new courses added

3. **Total Revenue**
   - Sum of all payments received
   - Revenue growth percentage

4. **Enrollments**
   - Total number of course enrollments
   - Enrollment growth percentage

#### Recent Activity Feed:
- New enrollments (user name, course name, timestamp)
- Payment received notifications (user, amount, timestamp)
- Course creation events (course name, timestamp)

### Course Management (`/admin/courses`)

**Access**: Admin users only

#### Features:

1. **View All Courses**
   - Table display of all courses with columns:
     - Course name and description
     - Instrument type and level badges
     - Price
     - Active/Inactive status
     - Action buttons (Edit, Delete)

2. **Create New Course**
   - Click "Add New Course" button
   - Fill form with:
     - Title
     - Instrument type (Keyboard, Guitar, Vocal)
     - Level (Beginner, Intermediate, Advanced)
     - Description
     - Thumbnail URL
     - Price
     - Active status toggle
   - Submit to create course

3. **Edit Course**
   - Click edit icon (pencil) next to course
   - Modify course details in form
   - Update course information

4. **Delete Course**
   - Click delete icon (trash) next to course
   - Confirm deletion
   - Course removed from system

5. **Toggle Course Status**
   - Click Active/Inactive badge
   - Toggles course visibility:
     - **Active**: Course visible to students
     - **Inactive**: Course hidden from public view

### Planned Admin Features (To Be Implemented)

1. **Lesson Management (`/admin/lessons`)**
   - Create, edit, delete lessons
   - Set lesson order within courses
   - Mark lessons as free trial
   - Upload/manage video URLs
   - Set lesson duration

2. **User Management (`/admin/users`)**
   - View all registered users
   - Edit user details (name, email, phone)
   - Deactivate/activate user accounts
   - View user enrollments
   - View user progress

3. **Payment Management (`/admin/payments`)**
   - View all payment transactions
   - Filter by status (pending, completed, failed)
   - View payment history
   - Generate revenue reports
   - Export payment data

4. **Testimonial Management (`/admin/testimonials`)**
   - Add new testimonials
   - Edit existing testimonials
   - Delete testimonials
   - Control visibility on homepage
   - Manage testimonial order

---

## Authentication & Access

### User Roles

1. **Student** (`role: 'student'`)
   - Default role for registered users
   - Can browse courses, enroll, watch lessons
   - Access to dashboard and learning features
   - Cannot access admin routes

2. **Admin** (`role: 'admin'`)
   - Full access to admin panel
   - Can manage courses, lessons, users, payments
   - Access to admin dashboard and all management pages

### Authentication Flow

1. **Registration**:
   ```
   User fills registration form → API call to /api/auth/register
   → Backend creates user account → Returns user data + JWT token
   → Token stored in localStorage → User redirected to dashboard
   ```

2. **Login**:
   ```
   User enters credentials → API call to /api/auth/login
   → Backend validates credentials → Returns user data + JWT token
   → Token stored in localStorage → User redirected to dashboard
   ```

3. **Protected Routes**:
   ```
   User navigates to protected route → Check localStorage for token
   → If no token → Redirect to /login
   → If token exists → Verify token validity → Allow access
   ```

4. **Admin Routes**:
   ```
   User navigates to admin route → Check authentication
   → Check user role → If role !== 'admin' → Redirect to /dashboard
   → If role === 'admin' → Allow access
   ```

### Token Management

- **Storage**: JWT tokens stored in `localStorage`
- **Token Expiry**: Handled by backend (frontend checks token validity)
- **Logout**: Clears token and user data from localStorage
- **API Requests**: Token sent in `Authorization: Bearer <token>` header

---

## Key Features

### Course Enrollment Flow

1. **Browse Courses**: User views available courses on `/courses`
2. **View Details**: Click course to see full details
3. **Enroll**: Click "Enroll Now" button
4. **Payment**: Create payment (if course is paid)
5. **Payment Verification**: Verify payment transaction
6. **Access Granted**: Course appears in dashboard
7. **Start Learning**: Click "Continue Learning" to access lessons

### Course Access Rules

**Important**: Each course requires **separate enrollment and payment**. Enrollment in one course does NOT grant access to other courses, even if they share:
- The same instrument type (e.g., Keyboard)
- The same level (e.g., Advanced)
- Similar content but different language (e.g., Tamil vs English)

**Example**:
- If a user enrolls in "Keyboard - Advanced (Tamil)", they **cannot** access "Keyboard - Advanced (English)" without enrolling separately
- Each course has a unique course ID and is treated as an independent product
- Users must enroll and pay for each course individually to gain access to its lessons and materials

### Lesson Progress Tracking

- **Completion Status**: Users can mark lessons as complete
- **Progress Calculation**: Based on completed lessons vs total lessons
- **Visual Indicators**: Progress bars, checkmarks, completion percentages
- **Recent Activity**: Tracks when lessons were completed

### Free Trial System

- **Free Trial Lessons**: Some lessons marked as free trial
- **Access**: Free trial lessons accessible without enrollment
- **Indicators**: Green badges showing "Free Trial" or "Free"
- **Purpose**: Allow users to preview course content before purchasing

### Responsive Design

- **Mobile**: Fully responsive layout for mobile devices
- **Tablet**: Optimized for tablet screens
- **Desktop**: Full-featured desktop experience
- **Navigation**: Mobile-friendly navigation menu

### Search & Filter

- **Course Filtering**: Filter by instrument type and level
- **Search**: (Planned) Search courses by title/keywords
- **Sorting**: (Planned) Sort courses by price, popularity, date

---

## Technical Implementation

### Frontend Stack

- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React hooks (useState, useEffect)

### API Integration

- **Base URL**: Configurable via `VITE_API_BASE_URL` environment variable
- **Authentication**: JWT tokens in Authorization header
- **Error Handling**: Standardized error response format
- **API Client**: Centralized API client in `src/services/api.ts`

### Data Flow

1. **User Actions** → API Calls → Backend Processing → Response → UI Update
2. **Protected Routes** → Auth Check → Token Validation → Route Access
3. **Admin Actions** → Role Check → Admin API → Database Update → UI Refresh

---

## User Journey Examples

### Example 1: New Student Enrolling in Course

1. Visit homepage → Browse featured courses
2. Click "View Details" on a course
3. Read course description and curriculum
4. Click "Register" (if not logged in)
5. Create account → Auto-login → Redirected to dashboard
6. Return to course detail page
7. Click "Enroll Now"
8. Complete payment (if required)
9. Course appears in dashboard
10. Click "Continue Learning"
11. Watch lessons and track progress

### Example 2: Admin Creating a New Course

1. Login as admin → Access admin dashboard
2. Navigate to "Course Management"
3. Click "Add New Course"
4. Fill course form:
   - Title: "Keyboard - Advanced (Tamil)"
   - Instrument: Keyboard
   - Level: Advanced
   - Description: "Advanced keyboard techniques..."
   - Price: ₹4,999
   - Status: Active
5. Submit form
6. Course appears in course list
7. Course visible to students on `/courses` page

### Example 3: Student Watching Lessons

1. Login → Access dashboard
2. View enrolled courses
3. Click "Continue Learning" on a course
4. Lesson player opens
5. Select lesson from sidebar
6. Video plays (when integrated)
7. Mark lesson as complete
8. Progress updates automatically
9. Download practice materials
10. Move to next lesson

---

## Notes

- **Video Integration**: Video player currently shows placeholder. Integrate with video hosting service (YouTube, Vimeo, or custom streaming)
- **Payment Gateway**: Payment flow structure ready, needs integration with payment provider (Razorpay/Stripe)
- **File Uploads**: Course thumbnails and video uploads need backend implementation
- **Email Notifications**: (Planned) Email notifications for enrollments, payments, etc.
- **Real-time Updates**: (Planned) Real-time progress updates and notifications

---

## Support & Contact

For technical support or questions:
- Check FAQ page (`/faq`)
- Contact form (`/contact`)
- Review legal pages for policies

---

*Last Updated: 2026*

