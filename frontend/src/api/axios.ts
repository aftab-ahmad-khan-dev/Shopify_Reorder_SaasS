import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as mockData from './mockData';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true' || true;

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.reorder-os.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add Shopify session token placeholder
    const sessionToken = localStorage.getItem('shopify_session_token');
    if (sessionToken) {
      config.headers.Authorization = `Bearer ${sessionToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Mock data interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (USE_MOCK_DATA) {
      const url = error.config?.url || '';
      
      // Return mock data based on endpoint
      const mockResponses: Record<string, unknown> = {
        '/metrics': mockData.mockMetrics,
        '/analytics': mockData.mockAnalytics,
        '/revenue-chart': mockData.mockRevenueChart,
        '/activity': mockData.mockRecentActivity,
        '/rules': mockData.mockRules,
        '/templates': mockData.mockTemplates,
        '/copy': mockData.mockCopyVariants,
        '/notifications': mockData.mockNotifications,
        '/history': mockData.mockReorderHistory,
      };

      for (const [endpoint, data] of Object.entries(mockResponses)) {
        if (url.includes(endpoint)) {
          return { data, status: 200 };
        }
      }
    }
    return Promise.reject(error);
  }
);

// API functions
export const fetchMetrics = async () => {
  if (USE_MOCK_DATA) return mockData.mockMetrics;
  const response = await api.get('/metrics');
  return response.data;
};

export const fetchRevenueChart = async () => {
  if (USE_MOCK_DATA) return mockData.mockRevenueChart;
  const response = await api.get('/revenue-chart');
  return response.data;
};

export const fetchRecentActivity = async () => {
  if (USE_MOCK_DATA) return mockData.mockRecentActivity;
  const response = await api.get('/activity');
  return response.data;
};

export const fetchRules = async () => {
  if (USE_MOCK_DATA) return mockData.mockRules;
  const response = await api.get('/rules');
  return response.data;
};

export const fetchTemplates = async () => {
  if (USE_MOCK_DATA) return mockData.mockTemplates;
  const response = await api.get('/templates');
  return response.data;
};

export const fetchAnalytics = async () => {
  if (USE_MOCK_DATA) return mockData.mockAnalytics;
  const response = await api.get('/analytics');
  return response.data;
};

export const fetchNotifications = async () => {
  if (USE_MOCK_DATA) return mockData.mockNotifications;
  const response = await api.get('/notifications');
  return response.data;
};

export const fetchReorderHistory = async () => {
  if (USE_MOCK_DATA) return mockData.mockReorderHistory;
  const response = await api.get('/history');
  return response.data;
};

export default api;
