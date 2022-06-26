import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    if (!config?.headers) {
      throw new Error("Expected 'config' and 'config.headers' not to be undefined");
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    } else {
      config.headers.Authorization = '';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
