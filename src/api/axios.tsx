import axios, { AxiosInstance } from 'axios';

interface AuthResponse {
  token: any;
  access_token: string;
}

interface ErrorResponse {
  message: string;
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Backend server URL
  withCredentials: true, // To Enable cookies for cross-origin requests
});

const authService = {
  login: async (email: string, password: string): Promise<string> => {
    try {
      const response = await instance.post<AuthResponse>('/auth/login', { email, password });
      const token = response.data.token; // Property name
      // Setting the Authorization header for subsequent requests
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // To Store the token in local storage
      localStorage.setItem('token', token);
      console.log('Login successful! Token:', token);
      return token;
    } catch (error: any) {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || 'An error occurred during login';
      throw errorMessage;
    }
  },

  signup: async (email: string, password: string): Promise<string> => {
    try {
      const response = await instance.post<AuthResponse>('/auth/signup', { email, password });
      const token = response.data.token; // Property name
      // Setting the Authorization header for subsequent requests
      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // To Store the token in local storage
      localStorage.setItem('token', token);
      console.log('Signup successful! Token:', token);
      return token;
    } catch (error: any) {
      const errorMessage = (error.response?.data as ErrorResponse)?.message || 'An error occurred during signup';
      throw errorMessage;
    }
  },

  logout: (): void => {

    delete instance.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
    console.log('Logout successful!');
  },

  checkAuthentication: async (): Promise<void> => {
    try {

      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await instance.get('/auth/check-auth'); // Endpoint to check authentication

    } catch (error: any) {

      throw new Error('User not authenticated');
    }
  },
};

export default authService;
