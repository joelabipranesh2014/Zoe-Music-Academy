// Database Schema Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  password_hash?: string;
  role: 'student' | 'admin';
  profile_image?: string;
  created_at: string;
}

export interface Course {
  id: string;
  title: string;
  instrument_type: 'keyboard' | 'guitar' | 'vocal';
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  thumbnail_url: string;
  price: number;
  is_active: boolean;
  created_at: string;
}

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  video_url: string;
  duration: number; // in seconds
  order_number: number;
  is_free_trial: boolean;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  payment_id?: string;
  enrolled_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  is_completed: boolean;
  completed_at?: string;
}

export interface Payment {
  id: string;
  user_id: string;
  course_id: string;
  amount: number;
  payment_method: 'card' | 'upi' | 'qr' | 'paypal';
  payment_status: 'pending' | 'completed' | 'failed';
  transaction_id?: string;
  paid_at?: string;
}

export interface Resource {
  id: string;
  lesson_id: string;
  file_url: string;
  file_type: 'pdf' | 'audio';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
}

