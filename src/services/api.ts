import { API_BASE_URL, API_ENDPOINTS } from '../config/api';
import type { User, Course, Lesson, Enrollment, Payment, Testimonial, LessonProgress } from '../types';

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// API Client Class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Merge existing headers
    if (options.headers) {
      if (options.headers instanceof Headers) {
        options.headers.forEach((value, key) => {
          headers[key] = value;
        });
      } else if (Array.isArray(options.headers)) {
        options.headers.forEach(([key, value]) => {
          headers[key] = value;
        });
      } else {
        Object.assign(headers, options.headers as Record<string, string>);
      }
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || data.error || 'An error occurred',
        };
      }

      return {
        success: true,
        data: data.data || data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Auth APIs
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request<{ user: User; token: string }>(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: {
    name: string;
    email: string;
    phone?: string;
    password: string;
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    return this.request<{ user: User; token: string }>(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.AUTH.LOGOUT, {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.AUTH.ME);
  }

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return this.request<{ token: string }>(API_ENDPOINTS.AUTH.REFRESH, {
      method: 'POST',
    });
  }

  // Course APIs
  async getCourses(filters?: {
    instrument_type?: string;
    level?: string;
  }): Promise<ApiResponse<Course[]>> {
    const queryParams = new URLSearchParams();
    if (filters?.instrument_type) queryParams.append('instrument_type', filters.instrument_type);
    if (filters?.level) queryParams.append('level', filters.level);
    
    const query = queryParams.toString();
    return this.request<Course[]>(`${API_ENDPOINTS.COURSES.LIST}${query ? `?${query}` : ''}`);
  }

  async getCourse(id: string): Promise<ApiResponse<Course>> {
    return this.request<Course>(API_ENDPOINTS.COURSES.DETAIL(id));
  }

  async enrollInCourse(courseId: string): Promise<ApiResponse<Enrollment>> {
    return this.request<Enrollment>(API_ENDPOINTS.COURSES.ENROLL(courseId), {
      method: 'POST',
    });
  }

  // Lesson APIs
  async getLessonsByCourse(courseId: string): Promise<ApiResponse<Lesson[]>> {
    return this.request<Lesson[]>(API_ENDPOINTS.LESSONS.BY_COURSE(courseId));
  }

  async getLesson(lessonId: string): Promise<ApiResponse<Lesson>> {
    return this.request<Lesson>(API_ENDPOINTS.LESSONS.DETAIL(lessonId));
  }

  async updateLessonProgress(
    lessonId: string,
    isCompleted: boolean
  ): Promise<ApiResponse<LessonProgress>> {
    return this.request<LessonProgress>(API_ENDPOINTS.LESSONS.PROGRESS(lessonId), {
      method: 'PUT',
      body: JSON.stringify({ is_completed: isCompleted }),
    });
  }

  // Enrollment APIs
  async getEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    return this.request<Enrollment[]>(API_ENDPOINTS.ENROLLMENTS.LIST);
  }

  // Payment APIs
  async createPayment(courseId: string, amount: number): Promise<ApiResponse<Payment>> {
    return this.request<Payment>(API_ENDPOINTS.PAYMENTS.CREATE, {
      method: 'POST',
      body: JSON.stringify({ course_id: courseId, amount }),
    });
  }

  async verifyPayment(paymentId: string, transactionId: string): Promise<ApiResponse<Payment>> {
    return this.request<Payment>(API_ENDPOINTS.PAYMENTS.VERIFY, {
      method: 'POST',
      body: JSON.stringify({ payment_id: paymentId, transaction_id: transactionId }),
    });
  }

  async getPaymentHistory(): Promise<ApiResponse<Payment[]>> {
    return this.request<Payment[]>(API_ENDPOINTS.PAYMENTS.HISTORY);
  }

  // User APIs
  async getUserProfile(): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.USER.PROFILE);
  }

  async updateUserProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.USER.UPDATE, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async getUserDashboard(): Promise<ApiResponse<{
    enrollments: Enrollment[];
    progress: LessonProgress[];
    stats: {
      totalCourses: number;
      completedLessons: number;
      hoursWatched: number;
    };
  }>> {
    return this.request(API_ENDPOINTS.USER.DASHBOARD);
  }

  // Testimonial APIs
  async getTestimonials(): Promise<ApiResponse<Testimonial[]>> {
    return this.request<Testimonial[]>(API_ENDPOINTS.TESTIMONIALS.LIST);
  }

  // Contact APIs
  async submitContactForm(formData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
  }): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.CONTACT.SUBMIT, {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  // Admin APIs
  async getAdminDashboard(): Promise<ApiResponse<{
    stats: {
      totalUsers: number;
      totalCourses: number;
      totalRevenue: number;
      totalEnrollments: number;
    };
    recentActivity: any[];
  }>> {
    return this.request(API_ENDPOINTS.ADMIN.DASHBOARD);
  }

  async createCourse(courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.request<Course>(API_ENDPOINTS.ADMIN.COURSES.CREATE, {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(courseId: string, courseData: Partial<Course>): Promise<ApiResponse<Course>> {
    return this.request<Course>(API_ENDPOINTS.ADMIN.COURSES.UPDATE(courseId), {
      method: 'PUT',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(courseId: string): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.ADMIN.COURSES.DELETE(courseId), {
      method: 'DELETE',
    });
  }

  async createLesson(lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    return this.request<Lesson>(API_ENDPOINTS.ADMIN.LESSONS.CREATE, {
      method: 'POST',
      body: JSON.stringify(lessonData),
    });
  }

  async updateLesson(lessonId: string, lessonData: Partial<Lesson>): Promise<ApiResponse<Lesson>> {
    return this.request<Lesson>(API_ENDPOINTS.ADMIN.LESSONS.UPDATE(lessonId), {
      method: 'PUT',
      body: JSON.stringify(lessonData),
    });
  }

  async deleteLesson(lessonId: string): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.ADMIN.LESSONS.DELETE(lessonId), {
      method: 'DELETE',
    });
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>(API_ENDPOINTS.ADMIN.USERS.LIST);
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>(API_ENDPOINTS.ADMIN.USERS.UPDATE(userId), {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(userId: string): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.ADMIN.USERS.DELETE(userId), {
      method: 'DELETE',
    });
  }

  async createTestimonial(testimonialData: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>(API_ENDPOINTS.ADMIN.TESTIMONIALS.CREATE, {
      method: 'POST',
      body: JSON.stringify(testimonialData),
    });
  }

  async updateTestimonial(
    testimonialId: string,
    testimonialData: Partial<Testimonial>
  ): Promise<ApiResponse<Testimonial>> {
    return this.request<Testimonial>(API_ENDPOINTS.ADMIN.TESTIMONIALS.UPDATE(testimonialId), {
      method: 'PUT',
      body: JSON.stringify(testimonialData),
    });
  }

  async deleteTestimonial(testimonialId: string): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.ADMIN.TESTIMONIALS.DELETE(testimonialId), {
      method: 'DELETE',
    });
  }

  // Secure Video APIs
  async getSecureVideoToken(lessonId: string, courseId: string): Promise<ApiResponse<{
    token: string;
    watermark: string;
    expiresAt: string;
  }>> {
    return this.request<{ token: string; watermark: string; expiresAt: string }>(
      API_ENDPOINTS.VIDEO.SECURE_TOKEN(lessonId, courseId)
    );
  }

  async reportSecurityViolation(lessonId: string, reason: string): Promise<ApiResponse<void>> {
    return this.request<void>(API_ENDPOINTS.VIDEO.REPORT_VIOLATION(lessonId), {
      method: 'POST',
      body: JSON.stringify({ reason, timestamp: new Date().toISOString() }),
    });
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

