import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import type { Lesson } from '../types';

export function useLessons(courseId: string | undefined) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchLessons = async () => {
      setLoading(true);
      setError(null);
      const response = await apiClient.getLessonsByCourse(courseId);
      
      if (response.success && response.data) {
        setLessons(response.data);
      } else {
        setError(response.error || 'Failed to fetch lessons');
      }
      setLoading(false);
    };

    fetchLessons();
  }, [courseId]);

  return { lessons, loading, error };
}

export function useLessonProgress(lessonId: string) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [updating, setUpdating] = useState(false);

  const updateProgress = async (completed: boolean) => {
    setUpdating(true);
    const response = await apiClient.updateLessonProgress(lessonId, completed);
    
    if (response.success) {
      setIsCompleted(completed);
    }
    setUpdating(false);
    return response.success;
  };

  return { isCompleted, updateProgress, updating };
}

