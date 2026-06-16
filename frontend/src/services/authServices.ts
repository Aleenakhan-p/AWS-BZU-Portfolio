import { apiClient } from './apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface VerifyTokenResponse {
  valid: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

/**
 * Authentication Services
 * Handles user login, registration, and token verification
 */
export const authServices = {
  /**
   * Login user with email and password
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return apiClient.post('/auth/login', credentials);
  },

  /**
   * Register new user
   */
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return apiClient.post('/auth/register', userData);
  },

  /**
   * Verify if token is valid
   */
  verifyToken: async (token: string): Promise<VerifyTokenResponse> => {
    return apiClient.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Logout user
   */
  logout: async (token: string): Promise<{ message: string }> => {
    return apiClient.post('/auth/logout', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Refresh authentication token
   */
  refreshToken: async (token: string): Promise<AuthResponse> => {
    return apiClient.post('/auth/refresh', {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<{ message: string }> => {
    return apiClient.post('/auth/password-reset/request', { email });
  },

  /**
   * Reset password with token
   */
  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    return apiClient.post('/auth/password-reset/confirm', { token, newPassword });
  },
};
