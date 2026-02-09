import { useState, useEffect } from 'react';
import { apiClient } from '../services/api';
import type { Course } from '../types';

export function useCourses(filters?: { instrument_type?: string; level?: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      const response = await apiClient.getCourses(filters);
      
      if (response.success && response.data) {
        setCourses(response.data);
      } else {
        setError(response.error || 'Failed to fetch courses');
      }
      setLoading(false);
    };

    fetchCourses();
  }, [filters?.instrument_type, filters?.level]);

  return { courses, loading, error };
}

export function useCourse(courseId: string | undefined) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    const fetchCourse = async () => {
      setLoading(true);
      setError(null);
      const response = await apiClient.getCourse(courseId);
      
      if (response.success && response.data) {
        setCourse(response.data);
      } else {
        setError(response.error || 'Failed to fetch course');
      }
      setLoading(false);
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
}

