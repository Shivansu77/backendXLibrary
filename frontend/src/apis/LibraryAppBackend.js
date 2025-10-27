// src/apis/LibraryAppBackend.js
import axios from 'axios';
import { getUserToken } from '../utils/AuthUtils';

const LibraryAppBackend = axios.create({
  baseURL: 'http://localhost:8050', // Change if your backend runs elsewhere!
});

// Add a request interceptor to include the auth token in headers
LibraryAppBackend.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    console.log('API Request - Token:', token ? 'Token exists' : 'No token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No auth token available for request to:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
LibraryAppBackend.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default LibraryAppBackend;
