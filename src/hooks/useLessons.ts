import { useMemo } from 'react';
import { mockLessons } from '../data/mockData';
import type { Lesson } from '../types';

export function useLessons(courseId: string | undefined) {
  const lessons = useMemo(() => {
    if (!courseId) return [];
    return mockLessons.filter(lesson => lesson.course_id === courseId);
  }, [courseId]);

  return { lessons, loading: false, error: null };
}

export function useLessonProgress(lessonId: string) {
  // Static implementation - no progress tracking in static version
  return { isCompleted: false, updateProgress: async () => false, updating: false };
}

