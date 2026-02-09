# API Reference - Complete Request/Response Guide

This document contains all API endpoints with complete request and response examples.

## Base URL

```
http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User

**Endpoint:** `POST /api/auth/register`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+911234567890",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+911234567890",
      "role": "student",
      "profile_image": null,
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Email already exists"
}
```

---

### 2. Login User

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+911234567890",
      "role": "student",
      "is_admin": false,
      "profile_image": null,
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Admin User Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Admin User",
      "email": "admin@zoemusicacademy.com",
      "phone": "+911234567891",
      "role": "admin",
      "is_admin": true,
      "profile_image": null,
      "created_at": "2024-01-01T00:00:00Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Invalid email or password"
}
```

---

### 3. Logout User

**Endpoint:** `POST /api/auth/logout`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+911234567890",
    "role": "student",
    "profile_image": null,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 5. Refresh Token

**Endpoint:** `POST /api/auth/refresh`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

## 📚 Course Endpoints

### 6. Get All Courses

**Endpoint:** `GET /api/courses`

**Query Parameters (Optional):**
- `instrument_type`: `keyboard` | `guitar` | `vocal`
- `level`: `beginner` | `intermediate` | `advanced`

**Example:** `GET /api/courses?instrument_type=keyboard&level=beginner`

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "title": "Keyboard - Beginners (Tamil)",
      "instrument_type": "keyboard",
      "level": "beginner",
      "description": "Learn keyboard from scratch in Tamil language",
      "thumbnail_url": "https://example.com/thumbnails/keyboard-beginner.jpg",
      "price": 2999,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "title": "Guitar - Intermediate",
      "instrument_type": "guitar",
      "level": "intermediate",
      "description": "Advanced guitar techniques",
      "thumbnail_url": "https://example.com/thumbnails/guitar-intermediate.jpg",
      "price": 3999,
      "is_active": true,
      "created_at": "2024-01-02T00:00:00Z"
    }
  ]
}
```

---

### 7. Get Course Details

**Endpoint:** `GET /api/courses/:id`

**Example:** `GET /api/courses/550e8400-e29b-41d4-a716-446655440010`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Keyboard - Beginners (Tamil)",
    "instrument_type": "keyboard",
    "level": "beginner",
    "description": "Learn keyboard from scratch in Tamil language. This comprehensive course covers all the basics.",
    "thumbnail_url": "https://example.com/thumbnails/keyboard-beginner.jpg",
    "price": 2999,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Course not found"
}
```

---

### 8. Enroll in Course

**Endpoint:** `POST /api/courses/:id/enroll`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `POST /api/courses/550e8400-e29b-41d4-a716-446655440010/enroll`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440020",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "payment_id": "550e8400-e29b-41d4-a716-446655440030",
    "enrolled_at": "2024-01-15T10:30:00Z"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Already enrolled in this course"
}
```

---

## 🎓 Lesson Endpoints

### 9. Get Lessons by Course

**Endpoint:** `GET /api/courses/:courseId/lessons`

**Example:** `GET /api/courses/550e8400-e29b-41d4-a716-446655440010/lessons`

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "course_id": "550e8400-e29b-41d4-a716-446655440010",
      "title": "Introduction to Keyboard",
      "video_url": "https://example.com/videos/keyboard-intro.mp4",
      "duration": 1200,
      "order_number": 1,
      "is_free_trial": true
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440041",
      "course_id": "550e8400-e29b-41d4-a716-446655440010",
      "title": "Basic Notes and Scales",
      "video_url": "https://example.com/videos/keyboard-notes.mp4",
      "duration": 1800,
      "order_number": 2,
      "is_free_trial": false
    }
  ]
}
```

---

### 10. Get Lesson Details

**Endpoint:** `GET /api/lessons/:lessonId`

**Example:** `GET /api/lessons/550e8400-e29b-41d4-a716-446655440040`

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440040",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Introduction to Keyboard",
    "video_url": "https://example.com/videos/keyboard-intro.mp4",
    "duration": 1200,
    "order_number": 1,
    "is_free_trial": true
  }
}
```

---

### 11. Update Lesson Progress

**Endpoint:** `PUT /api/lessons/:lessonId/progress`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/lessons/550e8400-e29b-41d4-a716-446655440040/progress`

**Request:**
```json
{
  "is_completed": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440050",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "lesson_id": "550e8400-e29b-41d4-a716-446655440040",
    "is_completed": true,
    "completed_at": "2024-01-15T11:00:00Z"
  }
}
```

---

## 📝 Enrollment Endpoints

### 12. Get User Enrollments

**Endpoint:** `GET /api/enrollments`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440020",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "550e8400-e29b-41d4-a716-446655440010",
      "payment_id": "550e8400-e29b-41d4-a716-446655440030",
      "enrolled_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

## 💳 Payment Endpoints

### 13. Create Payment

**Endpoint:** `POST /api/payments/create`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "course_id": "550e8400-e29b-41d4-a716-446655440010",
  "amount": 2999
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 2999,
    "payment_method": "card",
    "payment_status": "pending",
    "transaction_id": null,
    "paid_at": null
  }
}
```

---

### 14. Verify Payment

**Endpoint:** `POST /api/payments/verify`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "payment_id": "550e8400-e29b-41d4-a716-446655440030",
  "transaction_id": "txn_1234567890"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "amount": 2999,
    "payment_method": "card",
    "payment_status": "completed",
    "transaction_id": "txn_1234567890",
    "paid_at": "2024-01-15T10:35:00Z"
  }
}
```

---

### 15. Get Payment History

**Endpoint:** `GET /api/payments/history`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440030",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "course_id": "550e8400-e29b-41d4-a716-446655440010",
      "amount": 2999,
      "payment_method": "card",
      "payment_status": "completed",
      "transaction_id": "txn_1234567890",
      "paid_at": "2024-01-15T10:35:00Z"
    }
  ]
}
```

---

## 👤 User Endpoints

### 16. Get User Profile

**Endpoint:** `GET /api/user/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+911234567890",
    "role": "student",
    "profile_image": "https://example.com/profiles/john.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 17. Update User Profile

**Endpoint:** `PUT /api/user/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "John Updated",
  "phone": "+911234567891",
  "profile_image": "https://example.com/profiles/john-new.jpg"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+911234567891",
    "role": "student",
    "profile_image": "https://example.com/profiles/john-new.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 18. Get User Dashboard

**Endpoint:** `GET /api/user/dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "enrollments": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440020",
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "course_id": "550e8400-e29b-41d4-a716-446655440010",
        "payment_id": "550e8400-e29b-41d4-a716-446655440030",
        "enrolled_at": "2024-01-15T10:30:00Z"
      }
    ],
    "progress": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440050",
        "user_id": "550e8400-e29b-41d4-a716-446655440000",
        "lesson_id": "550e8400-e29b-41d4-a716-446655440040",
        "is_completed": true,
        "completed_at": "2024-01-15T11:00:00Z"
      }
    ],
    "stats": {
      "totalCourses": 2,
      "completedLessons": 12,
      "hoursWatched": 8.5
    }
  }
}
```

---

## ⭐ Testimonial Endpoints

### 19. Get All Testimonials

**Endpoint:** `GET /api/testimonials`

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440060",
      "name": "Rajesh Kumar",
      "location": "Chennai",
      "text": "Excellent course! Learned so much about keyboard.",
      "rating": 5
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440061",
      "name": "Priya Sharma",
      "location": "Mumbai",
      "text": "Great teaching methodology. Highly recommended!",
      "rating": 5
    }
  ]
}
```

---

## 📧 Contact Endpoints

### 20. Submit Contact Form

**Endpoint:** `POST /api/contact`

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+911234567890",
  "message": "I would like to know more about your courses."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully"
}
```

---

## 🔧 Admin Endpoints

### 21. Get Admin Dashboard

**Endpoint:** `GET /api/admin/dashboard`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "stats": {
      "totalUsers": 150,
      "totalCourses": 12,
      "totalRevenue": 450000,
      "totalEnrollments": 320
    },
    "recentActivity": [
      {
        "type": "enrollment",
        "user": "John Doe",
        "course": "Keyboard - Beginners",
        "timestamp": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

---

### 22. Create Course (Admin)

**Endpoint:** `POST /api/admin/courses`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Guitar - Advanced Techniques",
  "instrument_type": "guitar",
  "level": "advanced",
  "description": "Master advanced guitar techniques",
  "thumbnail_url": "https://example.com/thumbnails/guitar-advanced.jpg",
  "price": 4999,
  "is_active": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440012",
    "title": "Guitar - Advanced Techniques",
    "instrument_type": "guitar",
    "level": "advanced",
    "description": "Master advanced guitar techniques",
    "thumbnail_url": "https://example.com/thumbnails/guitar-advanced.jpg",
    "price": 4999,
    "is_active": true,
    "created_at": "2024-01-16T00:00:00Z"
  }
}
```

---

### 23. Update Course (Admin)

**Endpoint:** `PUT /api/admin/courses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/admin/courses/550e8400-e29b-41d4-a716-446655440012`

**Request:**
```json
{
  "title": "Guitar - Advanced Techniques (Updated)",
  "price": 5499,
  "is_active": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440012",
    "title": "Guitar - Advanced Techniques (Updated)",
    "instrument_type": "guitar",
    "level": "advanced",
    "description": "Master advanced guitar techniques",
    "thumbnail_url": "https://example.com/thumbnails/guitar-advanced.jpg",
    "price": 5499,
    "is_active": true,
    "created_at": "2024-01-16T00:00:00Z"
  }
}
```

---

### 24. Delete Course (Admin)

**Endpoint:** `DELETE /api/admin/courses/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `DELETE /api/admin/courses/550e8400-e29b-41d4-a716-446655440012`

**Response (Success):**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

---

### 25. Create Lesson (Admin)

**Endpoint:** `POST /api/admin/lessons`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "course_id": "550e8400-e29b-41d4-a716-446655440010",
  "title": "Advanced Chords",
  "video_url": "https://example.com/videos/advanced-chords.mp4",
  "duration": 2400,
  "order_number": 5,
  "is_free_trial": false
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440042",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Advanced Chords",
    "video_url": "https://example.com/videos/advanced-chords.mp4",
    "duration": 2400,
    "order_number": 5,
    "is_free_trial": false
  }
}
```

---

### 26. Update Lesson (Admin)

**Endpoint:** `PUT /api/admin/lessons/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/admin/lessons/550e8400-e29b-41d4-a716-446655440042`

**Request:**
```json
{
  "title": "Advanced Chords (Updated)",
  "duration": 2500,
  "is_free_trial": true
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440042",
    "course_id": "550e8400-e29b-41d4-a716-446655440010",
    "title": "Advanced Chords (Updated)",
    "video_url": "https://example.com/videos/advanced-chords.mp4",
    "duration": 2500,
    "order_number": 5,
    "is_free_trial": true
  }
}
```

---

### 27. Delete Lesson (Admin)

**Endpoint:** `DELETE /api/admin/lessons/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `DELETE /api/admin/lessons/550e8400-e29b-41d4-a716-446655440042`

**Response (Success):**
```json
{
  "success": true,
  "message": "Lesson deleted successfully"
}
```

---

### 28. Get All Users (Admin)

**Endpoint:** `GET /api/admin/users`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (Success):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+911234567890",
      "role": "student",
      "profile_image": null,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "name": "Admin User",
      "email": "admin@zoemusicacademy.com",
      "phone": "+911234567891",
      "role": "admin",
      "profile_image": null,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

---

### 29. Update User (Admin)

**Endpoint:** `PUT /api/admin/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/admin/users/550e8400-e29b-41d4-a716-446655440000`

**Request:**
```json
{
  "name": "John Updated",
  "role": "admin"
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Updated",
    "email": "john@example.com",
    "phone": "+911234567890",
    "role": "admin",
    "profile_image": null,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 30. Delete User (Admin)

**Endpoint:** `DELETE /api/admin/users/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `DELETE /api/admin/users/550e8400-e29b-41d4-a716-446655440000`

**Response (Success):**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

### 31. Create Testimonial (Admin)

**Endpoint:** `POST /api/admin/testimonials`

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "name": "Suresh Kumar",
  "location": "Bangalore",
  "text": "Amazing course! Highly recommended.",
  "rating": 5
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440062",
    "name": "Suresh Kumar",
    "location": "Bangalore",
    "text": "Amazing course! Highly recommended.",
    "rating": 5
  }
}
```

---

### 32. Update Testimonial (Admin)

**Endpoint:** `PUT /api/admin/testimonials/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `PUT /api/admin/testimonials/550e8400-e29b-41d4-a716-446655440062`

**Request:**
```json
{
  "text": "Amazing course! Highly recommended. Best investment ever!",
  "rating": 5
}
```

**Response (Success):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440062",
    "name": "Suresh Kumar",
    "location": "Bangalore",
    "text": "Amazing course! Highly recommended. Best investment ever!",
    "rating": 5
  }
}
```

---

### 33. Delete Testimonial (Admin)

**Endpoint:** `DELETE /api/admin/testimonials/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Example:** `DELETE /api/admin/testimonials/550e8400-e29b-41d4-a716-446655440062`

**Response (Success):**
```json
{
  "success": true,
  "message": "Testimonial deleted successfully"
}
```

---

## ❌ Error Responses

All endpoints return errors in this format:

**400 Bad Request:**
```json
{
  "success": false,
  "error": "Invalid request data"
}
```

**401 Unauthorized:**
```json
{
  "success": false,
  "error": "Unauthorized. Please login."
}
```

**403 Forbidden:**
```json
{
  "success": false,
  "error": "Access denied. Admin privileges required."
}
```

**404 Not Found:**
```json
{
  "success": false,
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

---

## 📋 Common Response Format

All successful responses follow this format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

All error responses follow this format:
```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 🔑 Authentication Notes

1. **Token Storage**: Tokens should be stored securely (localStorage/sessionStorage)
2. **Token Expiry**: Tokens may expire - use refresh token endpoint to get new token
3. **Admin Access**: Admin endpoints require `role: "admin"` or `is_admin: true` in user object
4. **Protected Routes**: All endpoints except login, register, and public endpoints require authentication

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- All IDs are UUIDs (v4 format)
- Amounts are in the smallest currency unit (e.g., paise for INR)
- Duration is in seconds
- File URLs should be publicly accessible
- Pagination may be added to list endpoints in the future

