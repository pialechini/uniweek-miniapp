import { getFromLocalStorage } from '@/helpers/localStorage';
import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
  // baseURL for production/local enironments
  baseURL:
    window.location.hostname === 'pialechini.github.io'
      ? // production
        'https://express-b6gufp.chbk.app/api'
      : //local
        '/api',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject token as a route parameter to necessary requests
api.interceptors.request.use(
  (config) => {
    if (config.url?.includes(':token')) {
      const token = getFromLocalStorage('token');

      if (!token) {
        return Promise.reject(
          new axios.Cancel(
            'Token is missing in local storage; request aborted',
          ),
        );
      }

      config.url = config.url.replace(':token', token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unknown error occurred.';

    if (errorMessage === 'canceled') {
      return;
    }

    console.error(`API Error: ${errorMessage}`);

    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login.');
    }

    // return Promise.reject(errorMessage);
  },
);

export default api;
