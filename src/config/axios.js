import axios from 'axios';

export const instance = axios.create();

instance.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.token;
  return config;
});
