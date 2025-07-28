import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '../types';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const response = await axios.post('/auth/refresh', {}, {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          });
          
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        // No refresh token, redirect to login
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Generic API methods
export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.get(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      };
    }
  },

  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      };
    }
  },

  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      };
    }
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await api.delete(url, config);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.message || error.message,
        status: error.response?.status || 500,
      };
    }
  },
};

export default api;