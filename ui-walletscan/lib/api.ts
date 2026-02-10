/**
 * WalletScan API Client
 * 
 * Kết nối với wallet scan API tại /api/external/wallet-scan/*
 */

import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const API_KEY = process.env.NEXT_PUBLIC_WALLET_SCAN_API_KEY || '';

const createWalletScanApiClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
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

export const walletScanApi = createWalletScanApiClient();

/**
 * Wallet API
 */
export const walletApi = {
  // Search wallet by address or username
  search: (query: string) =>
    walletScanApi.get('/api/external/wallet-scan/search', { params: { q: query } }),
  
  // Get wallet details by address
  getByAddress: (address: string) =>
    walletScanApi.get('/api/external/wallet-scan/wallets', { params: { address } }),
  
  // Get wallet by username
  getByUsername: (username: string) =>
    walletScanApi.get(`/api/external/wallet-scan/user/${username}`),
  
  // Get wallet ledger
  getLedger: (address: string, params?: { page?: number; perPage?: number }) =>
    walletScanApi.get('/api/external/wallet-scan/ledger', { params: { address, ...params } }),
  
  // Get wallet assets
  getAssets: (address: string) =>
    walletScanApi.get('/api/external/wallet-scan/assets', { params: { address } }),
};

/**
 * NFT API
 */
export const nftApi = {
  // Get NFTs in wallet
  getByWallet: (address: string, params?: { page?: number }) =>
    walletScanApi.get('/api/external/wallet-scan/nfts', { params: { address, ...params } }),
  
  // Get NFT transfers
  getTransfers: (params: { address?: string; tokenId?: string }) =>
    walletScanApi.get('/api/external/wallet-scan/nft-transfers', { params }),
};

/**
 * Transaction API
 */
export const transactionApi = {
  // Get transaction details
  getByHash: (hash: string) =>
    walletScanApi.get(`/api/external/wallet-scan/tx/${hash}`),
};

/**
 * Contract API
 */
export const contractApi = {
  // Get contract info
  getByAddress: (chain: string, address: string) =>
    walletScanApi.get(`/api/external/wallet-scan/contract/${chain}/${address}`),
  
  // List contracts
  list: (params?: { chain?: string; page?: number }) =>
    walletScanApi.get('/api/external/wallet-scan/contracts', { params }),
};

/**
 * Swap API
 */
export const swapApi = {
  // Get swap history
  getHistory: (address: string, params?: { page?: number }) =>
    walletScanApi.get('/api/external/wallet-scan/swaps', { params: { address, ...params } }),
};

/**
 * Payout API
 */
export const payoutApi = {
  // Get payout history
  getHistory: (address: string, params?: { page?: number }) =>
    walletScanApi.get('/api/external/wallet-scan/payouts', { params: { address, ...params } }),
};

/**
 * Utility functions
 */

// Format address to short form (0x1234...5678)
export const formatAddress = (address: string): string => {
  if (!address) return '';
  if (address.length < 12) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Validate Ethereum address
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

// Validate transaction hash
export const isValidTxHash = (hash: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
};

// Format token amount
export const formatTokenAmount = (amount: string | number, decimals: number = 18): string => {
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  return (value / Math.pow(10, decimals)).toLocaleString(undefined, {
    maximumFractionDigits: 6,
  });
};

// Get blockchain explorer URL
export const getExplorerUrl = (chain: string, type: 'tx' | 'address' | 'token', value: string): string => {
  const explorers: Record<string, string> = {
    ethereum: 'https://etherscan.io',
    polygon: 'https://polygonscan.com',
    bsc: 'https://bscscan.com',
    solana: 'https://solscan.io',
    tron: 'https://tronscan.org',
  };

  const baseUrl = explorers[chain.toLowerCase()] || explorers.ethereum;
  
  switch (type) {
    case 'tx':
      return `${baseUrl}/tx/${value}`;
    case 'address':
      return `${baseUrl}/address/${value}`;
    case 'token':
      return `${baseUrl}/token/${value}`;
    default:
      return baseUrl;
  }
};

export default walletScanApi;
