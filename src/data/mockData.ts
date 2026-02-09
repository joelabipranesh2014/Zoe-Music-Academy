import type { Course, Testimonial, Lesson } from '../types';

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Keyboard - Beginners (Tamil)',
    instrument_type: 'keyboard',
    level: 'beginner',
    description: 'Master the basics of keyboard playing in Tamil. Learn essential skills and start playing your favorite songs in just 10 classes!',
    thumbnail_url: '/api/placeholder/400/300',
    price: 2999,
    is_active: true,
    created_at: '2024-01-01',
  },
  {
    id: '2',
    title: 'Keyboard - Beginners (English)',
    instrument_type: 'keyboard',
    level: 'beginner',
    description: 'Master the basics of keyboard playing in English. Perfect for beginners who want to learn step-by-step.',
    thumbnail_url: '/api/placeholder/400/300',
    price: 2999,
    is_active: true,
    created_at: '2024-01-01',
  },
  {
    id: '3',
    title: 'Guitar - Beginners (Tamil)',
    instrument_type: 'guitar',
    level: 'beginner',
    description: 'Learn guitar fundamentals in Tamil. Master chords, strumming patterns, and play your favorite songs!',
    thumbnail_url: '/api/placeholder/400/300',
    price: 2999,
    is_active: true,
    created_at: '2024-01-01',
  },
  {
    id: '4',
    title: 'Keyboard - Advanced (Tamil)',
    instrument_type: 'keyboard',
    level: 'advanced',
    description: 'Take your keyboard skills to the next level. Advanced techniques, complex compositions, and professional playing.',
    thumbnail_url: '/api/placeholder/400/300',
    price: 4999,
    is_active: true,
    created_at: '2024-01-01',
  },
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Naveen',
    location: 'Avadi',
    text: 'Must Learn Music has transformed my musical skills! The instructors are truly passionate and supportive.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Joshua Sundar',
    location: 'Guitarist',
    text: 'The classes helped me understand music theory and improved my playing. Highly recommend it to anyone wanting to learn!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Earnest',
    location: 'Germany',
    text: 'MLM made learning the keyboard so much fun! The lessons are clear, engaging, helped me play songs I love in no time.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Emiley',
    location: 'Coimbatore',
    text: 'The advanced keyboard classes here pushed me to new heights in my playing. I\'ve gained more confidence than I ever thought possible!',
    rating: 5,
  },
];

export const mockLessons: Lesson[] = [
  {
    id: '1',
    course_id: '1',
    title: 'Introduction to Keyboard',
    video_url: 'https://example.com/video1.mp4',
    duration: 1200,
    order_number: 1,
    is_free_trial: true,
  },
  {
    id: '2',
    course_id: '1',
    title: 'Basic Notes and Scales',
    video_url: 'https://example.com/video2.mp4',
    duration: 1500,
    order_number: 2,
    is_free_trial: false,
  },
];

