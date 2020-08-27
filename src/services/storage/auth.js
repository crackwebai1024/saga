import http from 'http/index';

export const deleteUser = () => {
  localStorage.removeItem('IFAD-User');
  localStorage.removeItem('IFAD-Token');
  http.defaults.headers.Authorization = '';
};

export const blank = () => {};
