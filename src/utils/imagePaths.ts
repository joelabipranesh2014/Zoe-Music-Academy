/**
 * Static Image Paths
 * 
 * Place your images in the following locations:
 * - Hero images: public/images/hero/
 * - Course images: public/images/courses/
 * 
 * Images in the public folder can be referenced with absolute paths starting with /
 */

export const heroImages = {
  slide1: '/images/hero/music-hero-1.jpg',
  slide2: '/images/hero/keyboard-hero.jpg',
  slide3: '/images/hero/guitar-hero.jpg',
  slide4: '/images/hero/vocal-hero.jpg',
  about: '/images/hero/about-hero.jpg',
  default: '/images/hero/music-hero-1.jpg',
};

export const courseImages: Record<string, string> = {
  '1': '/images/courses/keyboard-tamil.jpg', // Keyboard Tamil
  '2': '/images/courses/keyboard-english.jpg', // Keyboard English
  '3': '/images/courses/guitar-tamil.jpg', // Guitar Tamil
  '4': '/images/courses/keyboard-advanced.jpg', // Keyboard Advanced
  default: '/images/courses/default-course.jpg',
};

export const instructorImages = {
  ezraRichard: '/images/instructor/ezra-richard.jpg',
  default: '/images/instructor/default-instructor.jpg',
};

/**
 * Get course image path
 */
export const getCourseImage = (courseId: string): string => {
  return courseImages[courseId] || courseImages.default;
};

/**
 * Get hero image path
 */
export const getHeroImage = (slideKey: keyof typeof heroImages): string => {
  return heroImages[slideKey] || heroImages.default;
};

