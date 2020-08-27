import http from 'http/index';

import { formatData } from './formatters';

export const authenticate = (data) => http.post('/auth/login', data).then((res) => formatData(res.data));

export const forgotPassword = (data) => http.post('/auth/forgot-password', data);

export const isAuthenticated = () => http.get('/auth/is-authenticated').then((res) => {
  if (res && res.data) {
    return res.data;
  }
  throw new Error('Network Error');
});

export const logout = () => http.get('/auth/logout');

export const resetPassword = (data) => http.post('/auth/reset-password', data);
