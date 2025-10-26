// src/apis/LibraryAppBackend.js
import axios from 'axios';
import { getUserToken } from '../utils/AuthUtils';

const LibraryAppBackend = axios.create({
  baseURL: 'http://localhost:8050', // Change if your backend runs elsewhere!
});

// Add a request interceptor to include the auth token in headers
LibraryAppBackend.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default LibraryAppBackend;
