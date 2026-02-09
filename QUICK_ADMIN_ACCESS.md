# 🚀 Quick Admin Access Guide

## Fastest Way to Access Admin Panel

### Step 1: Open Browser Console
Press `F12` or `Right-click → Inspect → Console`

### Step 2: Run This Command
```javascript
setTestAdmin()
```

### Step 3: Navigate to Admin
- Click the **"Admin"** link in the header, OR
- Go directly to: `http://localhost:5173/admin`

## ✅ That's It!

You now have admin access. The admin panel includes:
- 📊 Dashboard with statistics
- 📚 Course Management
- 👥 User Management (coming soon)
- 💰 Payment Management (coming soon)
- ⭐ Testimonial Management (coming soon)

## 🔄 Remove Admin Access

To remove test admin access:
```javascript
removeTestAdmin()
```

## 📝 Notes

- This is a **development helper** - it only works in dev mode
- For production, use proper backend authentication
- The admin user created is: `admin@zoemusicacademy.com`

## 🎯 Alternative: Direct URL

If you're already logged in as admin:
1. Just go to: `http://localhost:5173/admin`
2. If redirected, your account doesn't have admin role

