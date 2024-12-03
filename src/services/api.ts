import axios, { type AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 3000,
  params: {
    token: '7cd35b4a-e1ea-4f1b-904d-10b71b814c35'
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

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
2