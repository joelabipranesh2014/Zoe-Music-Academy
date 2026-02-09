# Backend API Integration Guide

This document outlines the API endpoints that your backend should implement to integrate with the frontend.

## Base URL

The API base URL is configured in `src/config/api.ts`. Set it via environment variable:
```bash
VITE_API_BASE_URL=http://localhost:3000/api
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

#### POST `/api/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+911234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
Login user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/logout`
Logout user (requires auth).

#### GET `/api/auth/me`
Get current user (requires auth).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

### Courses

#### GET `/api/courses`
Get all courses with optional filters.

**Query Parameters:**
- `instrument_type` (optional): keyboard, guitar, vocal
- `level` (optional): beginner, intermediate, advanced

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title": "Keyboard - Beginners (Tamil)",
      "instrument_type": "keyboard",
      "level": "beginner",
      "description": "...",
      "thumbnail_url": "https://...",
      "price": 2999,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/api/courses/:id`
Get course details.

#### POST `/api/courses/:id/enroll`
Enroll in a course (requires auth).

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user_id": "uuid",
    "course_id": "uuid",
    "enrolled_at": "2024-01-01T00:00:00Z"
  }
}
```

### Lessons

#### GET `/api/courses/:courseId/lessons`
Get all lessons for a course.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "course_id": "uuid",
      "title": "Introduction to Keyboard",
      "video_url": "https://...",
      "duration": 1200,
      "order_number": 1,
      "is_free_trial": true
    }
  ]
}
```

#### GET `/api/lessons/:lessonId`
Get lesson details.

#### PUT `/api/lessons/:lessonId/progress`
Update lesson progress (requires auth).

**Request Body:**
```json
{
  "is_completed": true
}
```

### Enrollments

#### GET `/api/enrollments`
Get user's enrollments (requires auth).

### Payments

#### POST `/api/payments/create`
Create a payment (requires auth).

**Request Body:**
```json
{
  "course_id": "uuid",
  "amount": 2999
}
```

#### POST `/api/payments/verify`
Verify payment (requires auth).

**Request Body:**
```json
{
  "payment_id": "uuid",
  "transaction_id": "txn_123"
}
```

#### GET `/api/payments/history`
Get payment history (requires auth).

### User Dashboard

#### GET `/api/user/dashboard`
Get dashboard data (requires auth).

**Response:**
```json
{
  "success": true,
  "data": {
    "enrollments": [...],
    "progress": [...],
    "stats": {
      "totalCourses": 2,
      "completedLessons": 12,
      "hoursWatched": 8.5
    }
  }
}
```

### Testimonials

#### GET `/api/testimonials`
Get all testimonials.

### Contact

#### POST `/api/contact`
Submit contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+911234567890",
  "message": "Hello..."
}
```

## Error Responses

All endpoints should return errors in this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

## Backend Implementation Suggestions

### Node.js/Express Example

```javascript
// Example route handler
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate and authenticate
    const user = await User.findOne({ email });
    // ... authentication logic
    const token = generateJWT(user);
    
    res.json({
      success: true,
      data: {
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});
```

### Python/Django Example

```python
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    # ... authentication logic
    return Response({
        'success': True,
        'data': {
            'user': {...},
            'token': token
        }
    })
```

## Environment Variables

Create a `.env` file in the root:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production:
```env
VITE_API_BASE_URL=https://api.zoemusicacademy.com/api
```

## Testing

You can test the API integration by:

1. Starting your backend server
2. Setting `VITE_API_BASE_URL` in `.env`
3. Running the frontend: `npm run dev`
4. The frontend will automatically use the API endpoints

## Next Steps

1. Implement backend API endpoints
2. Set up database (PostgreSQL, MongoDB, etc.)
3. Implement JWT authentication
4. Add payment gateway integration (Razorpay/Stripe)
5. Set up file upload for course thumbnails and videos
6. Implement email notifications

