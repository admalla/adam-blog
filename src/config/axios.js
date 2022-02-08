import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://localhost:5656',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.token;
  return config;
});
