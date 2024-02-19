// src/api/axios.tsx
import axios, { AxiosInstance } from 'axios';

interface AuthResponse {
  access_token: string;
}

interface ErrorResponse {
  message: string;
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Backend server URL
  withCredentials: true, // Enable cookies for cross-origin requests
});

const authService = {
  login: async (email: string, password: string): Promise<string> => {
    try {
      const response = await instance.post<AuthResponse>('/auth/login', { email, password });
      return response.data.access_token;
    } catch (error: any) {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || 'An error occurred during login';
      throw errorMessage;
    }
  },

  signup: async (email: string, password: string): Promise<string> => {
    try {
      const response = await instance.post<AuthResponse>('/auth/signup', { email, password });
      return response.data.access_token;
    } catch (error: any) {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || 'An error occurred during signup';
      throw errorMessage;
    }
  },
};

export default authService;
