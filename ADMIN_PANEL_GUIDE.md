# Admin Panel Guide

## 🎯 Overview

The admin panel allows administrators to manage all aspects of the music academy platform including courses, lessons, users, payments, and testimonials.

## 🔐 Access Control

- Only users with `role: 'admin'` can access admin routes
- Admin routes are protected by `AdminRoute` component
- Regular users are redirected to `/dashboard` if they try to access admin routes

## 📋 Admin Features

### 1. Admin Dashboard (`/admin`)
- Overview statistics (users, courses, revenue, enrollments)
- Recent activity feed
- Quick access to all management sections

### 2. Course Management (`/admin/courses`)
- **View all courses** in a table format
- **Create new courses** with full details
- **Edit existing courses**
- **Delete courses**
- **Toggle course active/inactive status**
- Filter and search capabilities

### 3. Lesson Management (`/admin/lessons`)
- Manage lessons for each course
- Create, edit, delete lessons
- Set lesson order
- Mark lessons as free trial
- Upload video URLs

### 4. User Management (`/admin/users`)
- View all registered users
- Edit user details
- Deactivate/activate users
- View user enrollments

### 5. Payment Management (`/admin/payments`)
- View all payments
- Filter by status (pending, completed, failed)
- View payment history
- Generate reports

### 6. Testimonial Management (`/admin/testimonials`)
- Add/edit/delete testimonials
- Manage testimonial visibility
- Control which testimonials appear on homepage

## 🛠️ Implementation Status

### ✅ Completed
- Admin route protection
- Admin layout with sidebar navigation
- Admin dashboard with stats
- Course management UI
- Course form (create/edit)

### 🚧 To Be Implemented
- Lesson management page
- User management page
- Payment management page
- Testimonial management page
- File upload for course thumbnails
- Video upload/management

## 📡 API Endpoints Required

Your backend needs to implement these admin endpoints:

### Admin Dashboard
- `GET /api/admin/dashboard` - Get dashboard statistics

### Courses
- `GET /api/admin/courses` - List all courses (admin view)
- `POST /api/admin/courses` - Create new course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course

### Lessons
- `GET /api/admin/lessons` - List all lessons
- `POST /api/admin/lessons` - Create new lesson
- `PUT /api/admin/lessons/:id` - Update lesson
- `DELETE /api/admin/lessons/:id` - Delete lesson

### Users
- `GET /api/admin/users` - List all users
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user

### Testimonials
- `GET /api/admin/testimonials` - List all testimonials
- `POST /api/admin/testimonials` - Create testimonial
- `PUT /api/admin/testimonials/:id` - Update testimonial
- `DELETE /api/admin/testimonials/:id` - Delete testimonial

## 🔒 Security Considerations

1. **Role-based access**: Backend must verify admin role on all admin endpoints
2. **JWT validation**: All admin requests require valid JWT token
3. **Input validation**: Validate all form inputs on backend
4. **File upload security**: Implement proper file validation and storage
5. **Rate limiting**: Implement rate limiting on admin endpoints

## 📝 Usage Example

### Creating a Course

1. Navigate to `/admin/courses`
2. Click "Add New Course"
3. Fill in the form:
   - Title
   - Instrument type
   - Level
   - Description
   - Thumbnail URL
   - Price
   - Active status
4. Click "Create Course"

### Editing a Course

1. Navigate to `/admin/courses`
2. Click the edit icon (pencil) next to the course
3. Modify the fields
4. Click "Update Course"

### Toggling Course Status

1. Navigate to `/admin/courses`
2. Click the status badge (Active/Inactive)
3. Course visibility will toggle

## 🎨 UI Components

### AdminLayout
- Sidebar navigation
- User info display
- Logout functionality
- Responsive mobile menu

### CourseForm
- Modal form for creating/editing courses
- Form validation
- Loading states
- Error handling

## 🚀 Next Steps

1. Implement remaining admin pages (lessons, users, payments, testimonials)
2. Add file upload functionality
3. Implement bulk operations (delete multiple, etc.)
4. Add search and filtering
5. Add export functionality (CSV, PDF reports)
6. Implement activity logging
7. Add admin notifications

## 📚 Related Files

- `src/components/Admin/AdminLayout.tsx` - Admin layout component
- `src/components/Admin/AdminRoute.tsx` - Admin route protection
- `src/components/Admin/CourseForm.tsx` - Course form component
- `src/pages/Admin/AdminDashboard.tsx` - Admin dashboard
- `src/pages/Admin/CourseManagement.tsx` - Course management page
- `src/utils/admin.ts` - Admin utility functions
- `src/config/api.ts` - Admin API endpoints

