/**
 * Admin API Client for New Public Backend
 * 
 * Kết nối với admin API endpoints tại /api/admin/*
 * Tất cả endpoints yêu cầu quyền admin
 */

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const createAdminApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response?.status === 401) {
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
      if (error.response?.status === 403) {
        alert('Bạn không có quyền truy cập chức năng này');
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const adminApi = createAdminApiClient();

/**
 * Admin API methods
 */

// Site Config
export const siteConfigApi = {
  update: (key: string, value: any) =>
    adminApi.post('/api/admin/site-config', { key, value }),
};

// Users Management
export const usersAdminApi = {
  list: (params?: { page?: number; search?: string; role?: string }) =>
    adminApi.get('/api/admin/users', { params }),
  
  ban: (userId: string, reason: string, duration?: number) =>
    adminApi.post(`/api/admin/users/${userId}/ban`, { reason, duration }),
  
  adjustStars: (userId: string, delta: number, note: string) =>
    adminApi.post('/api/admin/stars-adjust', { userId, delta, note }),
};

// Videos Management
export const videosAdminApi = {
  publish: (videoId: string) =>
    adminApi.post('/api/admin/videos/publish', { videoId }),
  
  hide: (videoId: string, hidden: boolean) =>
    adminApi.post('/api/admin/videos/hide', { videoId, hidden }),
  
  delete: (videoId: string) =>
    adminApi.post('/api/admin/videos/delete', { videoId }),
  
  updateMetadata: (videoId: string, title: string, description: string) =>
    adminApi.post('/api/admin/videos/update-metadata', { videoId, title, description }),
  
  requeue: (videoId: string) =>
    adminApi.post('/api/admin/videos/requeue', { videoId }),
};

// Reports Management
export const reportsAdminApi = {
  list: (params?: { status?: string; type?: string; page?: number }) =>
    adminApi.get('/api/admin/reports', { params }),
  
  comments: () =>
    adminApi.get('/api/admin/reports/comments'),
};

// Payments Management
export const paymentsAdminApi = {
  getDashboard: () =>
    adminApi.get('/api/admin/payments/dashboard'),
  
  getConfig: () =>
    adminApi.get('/api/admin/payments/config'),
  
  updateConfig: (config: any) =>
    adminApi.post('/api/admin/payments/config', config),
  
  getBundles: () =>
    adminApi.get('/api/admin/payments/bundles'),
  
  createBundle: (data: any) =>
    adminApi.post('/api/admin/payments/bundles', data),
  
  getCoupons: () =>
    adminApi.get('/api/admin/payments/coupons'),
  
  createCoupon: (data: any) =>
    adminApi.post('/api/admin/payments/coupons', data),
  
  getFraudAlerts: () =>
    adminApi.get('/api/admin/payments/fraud/alerts'),
  
  resolveFraudAlert: (alertId: string, action: string) =>
    adminApi.post('/api/admin/payments/fraud/alerts/resolve', { alertId, action }),
  
  exportDeposits: (params: any) =>
    adminApi.get('/api/admin/payments/export/deposits', { params }),
  
  manualCredit: (userId: string, stars: number, note: string) =>
    adminApi.post('/api/admin/payments/deposits/manual-credit', { userId, stars, note }),
};

// Boost Management
export const boostAdminApi = {
  getOrders: (params?: { page?: number; status?: string }) =>
    adminApi.get('/api/admin/boost/orders', { params }),
  
  getPlans: () =>
    adminApi.get('/api/admin/boost/plans'),
  
  createPlan: (data: any) =>
    adminApi.post('/api/admin/boost/plans', data),
};

// Gifts Management
export const giftsAdminApi = {
  list: () =>
    adminApi.get('/api/admin/gifts'),
  
  create: (data: { name: string; starCost: number; icon: string }) =>
    adminApi.post('/api/admin/gifts', data),
};

// Star Transactions
export const starsAdminApi = {
  getTransactions: (params?: { userId?: string; type?: string; page?: number }) =>
    adminApi.get('/api/admin/star-transactions', { params }),
  
  exportLedger: () =>
    adminApi.get('/api/admin/stars/export/ledger'),
};

// Theme Management
export const themeAdminApi = {
  getPresets: () =>
    adminApi.get('/api/admin/theme-presets'),
  
  createPreset: (data: { name: string; colors: object }) =>
    adminApi.post('/api/admin/theme-presets', data),
};

// API Keys Management
export const apiKeysAdminApi = {
  list: () =>
    adminApi.get('/api/admin/api-keys'),
  
  create: (name: string, scopes: string[]) =>
    adminApi.post('/api/admin/api-keys', { name, scopes }),
};

// Storage Management
export const storageAdminApi = {
  getConfig: () =>
    adminApi.get('/api/admin/storage/config'),
  
  updateConfig: (config: any) =>
    adminApi.post('/api/admin/storage/config', config),
  
  verifyDrive: () =>
    adminApi.post('/api/admin/storage/drive/verify'),
  
  verifyFtp: () =>
    adminApi.post('/api/admin/storage/ftp/verify'),
};

// Moderation
export const moderationAdminApi = {
  getActions: () =>
    adminApi.get('/api/admin/moderation/actions'),
  
  getAiQueue: () =>
    adminApi.get('/api/admin/moderation/ai/queue'),
  
  makeAiDecision: (id: string, action: 'APPROVE' | 'REJECT', reason?: string) =>
    adminApi.post(`/api/admin/moderation/ai/${id}/decision`, { action, reason }),
  
  getAiStatus: () =>
    adminApi.get('/api/admin/moderation/ai/status'),
};

// NFT Management
export const nftAdminApi = {
  getContracts: () =>
    adminApi.get('/api/admin/nft/contracts'),
  
  createContract: (data: any) =>
    adminApi.post('/api/admin/nft/contracts', data),
};

export default adminApi;
