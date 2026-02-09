// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  // Courses
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    ENROLL: (id: string) => `/courses/${id}/enroll`,
  },
  // Lessons
  LESSONS: {
    BY_COURSE: (courseId: string) => `/courses/${courseId}/lessons`,
    DETAIL: (lessonId: string) => `/lessons/${lessonId}`,
    PROGRESS: (lessonId: string) => `/lessons/${lessonId}/progress`,
  },
  // Enrollments
  ENROLLMENTS: {
    LIST: '/enrollments',
    DETAIL: (id: string) => `/enrollments/${id}`,
  },
  // Payments
  PAYMENTS: {
    CREATE: '/payments/create',
    VERIFY: '/payments/verify',
    HISTORY: '/payments/history',
  },
  // User
  USER: {
    PROFILE: '/user/profile',
    UPDATE: '/user/profile',
    DASHBOARD: '/user/dashboard',
  },
  // Resources
  RESOURCES: {
    BY_LESSON: (lessonId: string) => `/lessons/${lessonId}/resources`,
    DOWNLOAD: (resourceId: string) => `/resources/${resourceId}/download`,
  },
  // Testimonials
  TESTIMONIALS: {
    LIST: '/testimonials',
  },
  // Contact
  CONTACT: {
    SUBMIT: '/contact',
  },
  // Admin
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    COURSES: {
      LIST: '/admin/courses',
      CREATE: '/admin/courses',
      UPDATE: (id: string) => `/admin/courses/${id}`,
      DELETE: (id: string) => `/admin/courses/${id}`,
    },
    LESSONS: {
      LIST: '/admin/lessons',
      CREATE: '/admin/lessons',
      UPDATE: (id: string) => `/admin/lessons/${id}`,
      DELETE: (id: string) => `/admin/lessons/${id}`,
    },
    USERS: {
      LIST: '/admin/users',
      UPDATE: (id: string) => `/admin/users/${id}`,
      DELETE: (id: string) => `/admin/users/${id}`,
    },
    TESTIMONIALS: {
      LIST: '/admin/testimonials',
      CREATE: '/admin/testimonials',
      UPDATE: (id: string) => `/admin/testimonials/${id}`,
      DELETE: (id: string) => `/admin/testimonials/${id}`,
    },
  },
} as const;

