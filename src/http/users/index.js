import http from 'http/index';

import { formatFields, makeFormData } from './formatters';

export const getList = ({
  page,
  rowsPerPage,
  sort = '',
  order = 'asc',
}) => (
  http.get('/users', {
    params: {
      page,
      pageCount: rowsPerPage,
      sort,
      order,
    },
  }).then((res) => res.data)
);

export const register = (data) => http.post('/users', formatFields(data)).then((res) => res.data);

export const remove = (id) => http.delete(`/users/${id}`).then((res) => res.data);

export const update = (data) => http.put(`/users/${data.id}`, formatFields(data)).then((res) => res.data);

export const importFile = ({ file }) => http.post('/users/import', makeFormData(file)).then((res) => res.data);
