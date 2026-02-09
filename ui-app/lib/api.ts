/**
 * API Client for New Public Backend
 * 
 * Kết nối với backend API tại /api/*
 * Sử dụng axios để thực hiện HTTP requests
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// API base URL - default to same origin
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

/**
 * Create axios instance with default config
 */
const createApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true, // Include cookies for NextAuth session
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any custom headers here if needed
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Handle errors globally
      if (error.response?.status === 401) {
        // Redirect to login if needed
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const apiClient = createApiClient();

/**
 * API methods
 */

// Videos
export const videosApi = {
  getTrending: (params?: { page?: number; perPage?: number }) =>
    apiClient.get('/api/trending', { params }),
  
  getById: (id: string) =>
    apiClient.get(`/api/public/videos/${id}`),
  
  search: (query: string, params?: { page?: number }) =>
    apiClient.get('/api/search', { params: { q: query, ...params } }),
  
  like: (videoId: string) =>
    apiClient.post('/api/likes', { videoId }),
  
  recordView: (videoId: string) =>
    apiClient.post('/api/views', { videoId }),
};

// Comments
export const commentsApi = {
  getByVideo: (videoId: string, params?: { page?: number }) =>
    apiClient.get('/api/comments', { params: { videoId, ...params } }),
  
  create: (videoId: string, content: string, parentId?: string) =>
    apiClient.post('/api/comments', { videoId, content, parentId }),
  
  report: (commentId: string, reason: string) =>
    apiClient.post('/api/comments/report', { commentId, reason }),
};

// Stars
export const starsApi = {
  getBalance: () =>
    apiClient.get('/api/stars/balance'),
  
  getHistory: () =>
    apiClient.get('/api/stars/topup/history'),
  
  send: (toUserId: string, stars: number, message?: string) =>
    apiClient.post('/api/stars/send', { toUserId, stars, message }),
  
  createTopupIntent: (bundleId: string) =>
    apiClient.post('/api/stars/topup/intent', { bundleId }),
};

// User
export const userApi = {
  getNotifications: (params?: { page?: number; unreadOnly?: boolean }) =>
    apiClient.get('/api/me/notifications', { params }),
  
  markNotificationRead: (notificationId: string) =>
    apiClient.post('/api/me/notifications/read', { notificationId }),
  
  getWatchLater: () =>
    apiClient.get('/api/me/watch-later'),
  
  toggleWatchLater: (videoId: string) =>
    apiClient.post('/api/me/watch-later/toggle', { videoId }),
};

// Subscriptions
export const subscriptionsApi = {
  toggle: (userId: string) =>
    apiClient.post('/api/subscriptions/toggle', { userId }),
};

// Playlists
export const playlistsApi = {
  getAll: (params?: { page?: number }) =>
    apiClient.get('/api/playlists', { params }),
  
  getById: (id: string) =>
    apiClient.get(`/api/playlists/${id}`),
  
  create: (data: { title: string; description?: string; privacy?: string }) =>
    apiClient.post('/api/playlists', data),
  
  addVideo: (playlistId: string, videoId: string) =>
    apiClient.post(`/api/playlists/${playlistId}/items`, { videoId }),
};

// Boost
export const boostApi = {
  getPlans: () =>
    apiClient.get('/api/boost/plans'),
  
  start: (planId: string, videoId: string) =>
    apiClient.post('/api/boost/start', { planId, videoId }),
  
  cancel: (orderId: string) =>
    apiClient.post('/api/boost/cancel', { orderId }),
};

// Gifts
export const giftsApi = {
  getAll: () =>
    apiClient.get('/api/gifts'),
  
  send: (giftId: string, targetId: string, targetType: 'VIDEO' | 'USER') =>
    apiClient.post('/api/gifts/send', { giftId, targetId, targetType }),
};

// NFT
export const nftApi = {
  mint: (videoId: string, supply: number) =>
    apiClient.post('/api/nft/mint', { videoId, supply }),
  
  createListing: (nftId: string, price: number) =>
    apiClient.post('/api/nft/listings/create', { nftId, price }),
  
  buyListing: (listingId: string) =>
    apiClient.post(`/api/nft/listings/${listingId}/buy`),
};

export default apiClient;
