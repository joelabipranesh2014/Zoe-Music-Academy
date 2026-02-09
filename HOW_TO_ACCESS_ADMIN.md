# How to Access Admin Panel

## 🎯 Quick Access Methods

### Method 1: Via Header Link (Recommended)
1. **Log in** with an admin account
2. Look for the **"Admin"** link in the header navigation (next to your name)
3. Click **"Admin"** to go to `/admin`

### Method 2: Direct URL
1. **Log in** with an admin account
2. Navigate directly to: `http://localhost:5173/admin`

### Method 3: From Dashboard
1. Log in and go to `/dashboard`
2. If you're an admin, you'll see admin options
3. Navigate to `/admin` from there

## 🔐 Admin Account Requirements

To access the admin panel, your user account must have:
- **Role**: `admin` (not `student`)
- **Valid authentication**: Must be logged in

## 🧪 Testing Admin Access (Development)

### Option 1: Manual localStorage Setup (For Testing)

Open browser console (F12) and run:

```javascript
// Set admin user in localStorage
localStorage.setItem('user', JSON.stringify({
  id: '1',
  name: 'Admin User',
  email: 'admin@zoemusicacademy.com',
  role: 'admin'
}));

// Set a dummy token
localStorage.setItem('token', 'test-token-123');

// Refresh the page
window.location.reload();
```

After this, you should see the "Admin" link in the header!

### Option 2: Create Admin Account via Backend

1. Register/login normally
2. In your backend database, update the user's role:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
   ```
3. Log out and log back in
4. The admin link will appear

### Option 3: Backend Admin Creation Endpoint

Create an admin user via your backend API:
```bash
POST /api/auth/register
{
  "name": "Admin",
  "email": "admin@zoemusicacademy.com",
  "password": "secure-password",
  "role": "admin"  // Set this in backend
}
```

## 📍 Admin Routes

Once you have admin access, you can navigate to:

- **Dashboard**: `/admin` - Overview and statistics
- **Courses**: `/admin/courses` - Manage courses
- **Lessons**: `/admin/lessons` - Manage lessons (coming soon)
- **Users**: `/admin/users` - Manage users (coming soon)
- **Payments**: `/admin/payments` - View payments (coming soon)
- **Testimonials**: `/admin/testimonials` - Manage testimonials (coming soon)

## 🔒 Security Notes

- Admin routes are protected - non-admin users are redirected to `/dashboard`
- Backend must verify admin role on all admin API endpoints
- Always use proper authentication in production

## 🐛 Troubleshooting

### "Admin" link not showing?
1. Check if you're logged in
2. Verify your user role is `admin`:
   ```javascript
   JSON.parse(localStorage.getItem('user')).role
   ```
3. Clear cache and refresh

### Redirected to dashboard?
- Your account doesn't have admin role
- Update your user role in the database or localStorage

### Can't access admin routes?
- Make sure you're logged in
- Verify your token is valid
- Check browser console for errors

## 💡 Quick Test Script

Run this in browser console to quickly test admin access:

```javascript
// Quick admin setup for testing
const adminUser = {
  id: 'admin-1',
  name: 'Test Admin',
  email: 'admin@test.com',
  role: 'admin',
  created_at: new Date().toISOString()
};

localStorage.setItem('user', JSON.stringify(adminUser));
localStorage.setItem('token', 'test-admin-token');
window.location.href = '/admin';
```

