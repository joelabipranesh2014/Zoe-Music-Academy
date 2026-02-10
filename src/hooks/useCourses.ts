import { useMemo } from 'react';
import { mockCourses } from '../data/mockData';

export function useCourses(filters?: { instrument_type?: string; level?: string }) {
  const courses = useMemo(() => {
    let filtered = [...mockCourses];

    if (filters?.instrument_type) {
      filtered = filtered.filter(course => course.instrument_type === filters.instrument_type);
    }

    if (filters?.level) {
      filtered = filtered.filter(course => course.level === filters.level);
    }

    return filtered;
  }, [filters?.instrument_type, filters?.level]);

  return { courses, loading: false, error: null };
}

export function useCourse(courseId: string | undefined) {
  const course = useMemo(() => {
    if (!courseId) return null;
    return mockCourses.find(c => c.id === courseId) || null;
  }, [courseId]);

  return { course, loading: false, error: course ? null : 'Course not found' };
}

