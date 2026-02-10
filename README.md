# Must Learn Music - Music Learning Platform

A modern, responsive music learning platform built with React, TypeScript, and Tailwind CSS, inspired by MustLearnMusic.com.

## 🎼 Features

### Phase 1 (MVP) ✅
- **Course Listing**: Browse courses by instrument type and level
- **Course Details**: View comprehensive course information, curriculum, and pricing
- **Student Authentication**: Login and registration system
- **Student Dashboard**: Track progress, view enrolled courses, and access lessons
- **Lesson Player**: Watch video lessons with progress tracking
- **Responsive Design**: Beautiful, modern UI that works on all devices

### Pages Included
- 🏠 **Home**: Hero section, featured courses, testimonials, stats
- 📚 **Courses**: Filterable course listing page
- 📖 **Course Detail**: Detailed course information with enrollment
- 🔐 **Login/Register**: Authentication pages
- 🎓 **Dashboard**: Student dashboard with course progress
- ▶️ **Lesson Player**: Video lesson player with sidebar navigation
- 📄 **About Us**: Information about the academy and instructor
- ❓ **FAQ**: Frequently asked questions
- 📧 **Contact**: Contact form and information
- 📥 **Free Resources**: Free course materials
- ⚖️ **Legal Pages**: Privacy Policy, Terms & Conditions, Refund Policy, Cancellation Policy

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd music-academy
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/       # Reusable components
│   └── Layout/      # Header, Footer, Layout components
├── pages/          # Page components
├── types/          # TypeScript type definitions
├── data/           # Mock data
├── utils/          # Utility functions (auth, etc.)
├── App.tsx         # Main app component with routing
└── main.tsx        # Entry point
```

## 🗄️ Database Schema

The project includes TypeScript interfaces for:
- Users
- Courses
- Lessons
- Enrollments
- Lesson Progress
- Payments
- Resources

## 🎨 Design Features

- Modern gradient designs
- Responsive mobile-first approach
- Smooth animations and transitions
- Accessible color schemes
- Clean, professional UI

## 🔐 Authentication

Currently uses localStorage for mock authentication. Replace with real backend API integration:
- Update `src/utils/auth.ts` with API calls
- Implement JWT token management
- Add protected routes middleware

## 📝 Next Steps

### Phase 2
- [ ] Backend API integration
- [ ] Payment gateway integration (Razorpay/Stripe)
- [ ] Video streaming integration
- [ ] Admin panel
- [ ] Email notifications
- [ ] Certificate generation

### Phase 3
- [ ] Multi-language support
- [ ] Community forum
- [ ] Live classes
- [ ] Mobile app
- [ ] Teacher onboarding

## 📄 License

Copyright © 2026. All rights reserved.

## 👨‍💻 Development

Built with ❤️ using React, TypeScript, and Tailwind CSS.
