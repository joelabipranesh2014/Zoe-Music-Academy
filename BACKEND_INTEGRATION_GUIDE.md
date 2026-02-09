# Backend Integration Guide

## ✅ What's Been Implemented

### 1. API Configuration (`src/config/api.ts`)
- Centralized API base URL configuration
- All endpoint definitions
- Environment variable support (`VITE_API_BASE_URL`)

### 2. API Service Layer (`src/services/api.ts`)
- Complete API client with all endpoints
- JWT token management
- Error handling
- Type-safe API calls

### 3. Custom Hooks
- `useAuth` - Authentication state management
- `useCourses` - Course data fetching
- `useLessons` - Lesson data fetching

### 4. Updated Components
- ✅ Login page - Now uses API
- ✅ Register page - Now uses API
- ✅ Courses page - Fetches from API
- ✅ Course Detail page - Fetches from API

## 🚀 Quick Start

### 1. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

For production:
```env
VITE_API_BASE_URL=https://api.zoemusicacademy.com/api
```

### 2. Backend Requirements

Your backend should implement the endpoints documented in `BACKEND_API.md`.

Key endpoints needed:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/auth/me`
- `GET /api/courses`
- `GET /api/courses/:id`
- `GET /api/courses/:courseId/lessons`

### 3. Testing Without Backend

The frontend will fall back to showing errors if the backend is not available. To test:

1. Start your backend server
2. Set `VITE_API_BASE_URL` in `.env`
3. Restart the dev server: `npm run dev`

## 📝 API Response Format

All API responses should follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional message"
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🔐 Authentication Flow

1. User logs in → `POST /api/auth/login`
2. Backend returns `{ user, token }`
3. Token stored in localStorage
4. All subsequent requests include `Authorization: Bearer <token>`
5. Token refreshed automatically via `GET /api/auth/me`

## 📦 Files Created/Modified

### New Files:
- `src/config/api.ts` - API configuration
- `src/services/api.ts` - API client service
- `src/hooks/useAuth.ts` - Auth hook
- `src/hooks/useCourses.ts` - Courses hook
- `src/hooks/useLessons.ts` - Lessons hook
- `BACKEND_API.md` - Complete API documentation
- `.env.example` - Environment variables template

### Modified Files:
- `src/utils/auth.ts` - Updated to use API
- `src/pages/Login.tsx` - Uses API hook
- `src/pages/Register.tsx` - Uses API hook
- `src/pages/Courses.tsx` - Fetches from API
- `src/pages/CourseDetail.tsx` - Fetches from API

## 🎯 Next Steps

1. **Implement Backend**
   - Choose your stack (Node.js/Express, Python/Django, PHP/Laravel, etc.)
   - Implement endpoints from `BACKEND_API.md`
   - Set up database (PostgreSQL, MongoDB, MySQL)
   - Implement JWT authentication

2. **Update Remaining Pages**
   - Dashboard - Fetch user data
   - Lesson Player - Fetch lessons and progress
   - Contact - Submit form to API

3. **Add Features**
   - Payment gateway integration
   - File upload for course thumbnails
   - Video streaming integration
   - Email notifications

## 🔧 Development Tips

### Testing API Calls

You can test API calls in browser console:

```javascript
import { apiClient } from './src/services/api';

// Test login
apiClient.login('test@example.com', 'password123')
  .then(res => console.log(res));

// Test courses
apiClient.getCourses()
  .then(res => console.log(res));
```

### Mock Backend (Development)

For development, you can use tools like:
- [JSON Server](https://github.com/typicode/json-server)
- [Mock Service Worker](https://mswjs.io/)
- [Mirage JS](https://miragejs.com/)

## 📚 API Documentation

See `BACKEND_API.md` for complete API endpoint documentation.

## 🐛 Troubleshooting

### API calls not working?
1. Check `VITE_API_BASE_URL` in `.env`
2. Restart dev server after changing `.env`
3. Check browser console for errors
4. Verify CORS is enabled on backend

### Authentication issues?
1. Check token is being stored: `localStorage.getItem('token')`
2. Verify token format in Authorization header
3. Check backend JWT secret and expiration

### CORS errors?
Add CORS headers to your backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

