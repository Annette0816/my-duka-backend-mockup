import { apiService } from './api';
import { LoginCredentials, LoginResponse, User } from '../types';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiService.post<LoginResponse>('/auth/login', credentials);
    
    if (response.data) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      localStorage.setItem('user_type', response.data.user_type);
      localStorage.setItem('user_id', response.data.user_id.toString());
    }
    
    return response;
  },

  logout: async () => {
    const response = await apiService.post('/auth/logout');
    
    // Clear local storage regardless of API response
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_id');
    
    return response;
  },

  refreshToken: async () => {
    return await apiService.post<{ access_token: string }>('/auth/refresh');
  },

  getCurrentUser: async () => {
    const userType = localStorage.getItem('user_type');
    const userId = localStorage.getItem('user_id');
    
    if (!userType || !userId) {
      return { error: 'No user information found', status: 401 };
    }
    
    return await apiService.get<User>(`/${userType}/${userId}`);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('access_token');
    return !!token;
  },

  // Get stored user type
  getUserType: (): string | null => {
    return localStorage.getItem('user_type');
  },

  // Get stored user ID
  getUserId: (): number | null => {
    const userId = localStorage.getItem('user_id');
    return userId ? parseInt(userId, 10) : null;
  },
};