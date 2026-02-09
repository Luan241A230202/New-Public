/**
 * Auth API Client
 * 
 * Handles all authentication-related API calls
 */

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const createAuthApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies for session
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return instance;
};

export const authApi = createAuthApiClient();

/**
 * Authentication APIs
 */
export const authService = {
  // Register new account
  register: (data: {
    username: string;
    email: string;
    password: string;
  }) => authApi.post('/api/auth/register', data),

  // Login with credentials
  login: (data: { email: string; password: string }) =>
    authApi.post('/api/auth/login', data),

  // Logout
  logout: () => authApi.post('/api/auth/logout'),

  // Forgot password request
  forgotPassword: (email: string) =>
    authApi.post('/api/auth/forgot-password', { email }),

  // Reset password with token
  resetPassword: (data: { token: string; password: string }) =>
    authApi.post('/api/auth/reset-password', data),

  // Verify email with token
  verifyEmail: (token: string) =>
    authApi.post('/api/auth/verify-email', { token }),

  // Resend verification email
  resendVerification: (email: string) =>
    authApi.post('/api/auth/resend-verification', { email }),
};

/**
 * Profile APIs
 */
export const profileService = {
  // Get current user profile
  getProfile: () => authApi.get('/api/me/profile'),

  // Update profile
  updateProfile: (data: {
    username?: string;
    displayName?: string;
    bio?: string;
    avatar?: string;
    banner?: string;
  }) => authApi.patch('/api/me/profile', data),

  // Change password
  changePassword: (data: {
    currentPassword: string;
    newPassword: string;
  }) => authApi.post('/api/me/change-password', data),
};

/**
 * Two-Factor Authentication APIs
 */
export const twoFactorService = {
  // Enable 2FA
  enable: (method: 'totp' | 'sms', phone?: string) =>
    authApi.post('/api/me/2fa/enable', { method, phone }),

  // Disable 2FA
  disable: (code: string) =>
    authApi.post('/api/me/2fa/disable', { code }),

  // Verify 2FA code
  verify: (code: string) =>
    authApi.post('/api/me/2fa/verify', { code }),

  // Get backup codes
  getBackupCodes: () =>
    authApi.get('/api/me/2fa/backup-codes'),

  // Regenerate backup codes
  regenerateBackupCodes: () =>
    authApi.post('/api/me/2fa/backup-codes/regenerate'),
};

/**
 * Utility functions
 */

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
export const validatePasswordStrength = (password: string) => {
  const minLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^a-zA-Z\d]/.test(password);

  const strength = [
    minLength,
    hasUpperCase && hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  return {
    isValid: minLength,
    strength, // 0-4
    requirements: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    },
  };
};

// Generate random password
export const generatePassword = (length: number = 16): string => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
};

export default authApi;
