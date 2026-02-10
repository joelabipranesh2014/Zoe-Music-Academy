# Static Images Directory

This directory contains all static images used in the Music Academy application.

## Directory Structure

```
public/images/
├── hero/           # Hero carousel images (1920x1080px recommended)
│   ├── music-hero-1.jpg
│   ├── keyboard-hero.jpg
│   ├── guitar-hero.jpg
│   ├── vocal-hero.jpg
│   └── about-hero.jpg
├── courses/        # Course thumbnail images (800x600px recommended)
│   ├── keyboard-tamil.jpg
│   ├── keyboard-english.jpg
│   ├── guitar-tamil.jpg
│   ├── keyboard-advanced.jpg
│   └── default-course.jpg
└── instructor/     # Instructor profile images (400x400px recommended, square)
    ├── ezra-richard.jpg
    └── default-instructor.jpg
```

## Image Requirements

### Hero Images
- **Location**: `public/images/hero/`
- **Recommended Size**: 1920x1080px (16:9 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **File Names**:
  - `music-hero-1.jpg` - Main hero slide
  - `keyboard-hero.jpg` - Keyboard course hero
  - `guitar-hero.jpg` - Guitar course hero
  - `vocal-hero.jpg` - Vocal training hero
  - `about-hero.jpg` - About Us page hero background

### Course Images
- **Location**: `public/images/courses/`
- **Recommended Size**: 800x600px (4:3 aspect ratio)
- **Format**: JPG, PNG, or WebP
- **File Names**:
  - `keyboard-tamil.jpg` - Course ID: 1
  - `keyboard-english.jpg` - Course ID: 2
  - `guitar-tamil.jpg` - Course ID: 3
  - `keyboard-advanced.jpg` - Course ID: 4
  - `default-course.jpg` - Fallback image for courses without specific images

### Instructor Images
- **Location**: `public/images/instructor/`
- **Recommended Size**: 400x400px (1:1 aspect ratio, square)
- **Format**: JPG, PNG, or WebP
- **File Names**:
  - `ezra-richard.jpg` - Founder & Director profile image
  - `default-instructor.jpg` - Fallback image if instructor image is not found

## How to Add Images

1. Place your image files in the appropriate directories above
2. Ensure file names match exactly (case-sensitive)
3. Images will be automatically available at `/images/[folder]/[filename]`
4. The application will use these images instead of external URLs

## Notes

- Images in the `public/` folder are served statically and can be referenced with absolute paths starting with `/`
- For best performance, optimize images before adding them (compress, resize if needed)
- Supported formats: JPG, PNG, WebP, SVG

