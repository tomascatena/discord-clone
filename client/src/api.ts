import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error("Expected 'config' and 'config.headers' not to be undefined");
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = '';
    }

    return config;
  }
);
