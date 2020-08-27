import http from 'http/index';
import { formatFields } from './formatters';

export const getAll = (countryId) => http
  .get(`/countries/${countryId}/projects`)
  .then((res) => res.data);

export const create = (data) => http.post(
  `/countries/${data.countryId}/projects`,
  formatFields(data),
).then((res) => res.data);

export const remove = (data) => http
  .delete(`/countries/${data.countryId}/projects/${data.id}`)
  .then((res) => res.data);

export const update = (data) => http.put(
  `/countries/${data.countryId}/projects/${data.id}`,
  formatFields(data),
).then((res) => res.data);

export const getDashboard = (data) => http.get(
  `/countries/${data.countryId}/projects/${data.projectId}/dashboard`,
  { params: { period: data.period, value: data.value } },
).then((res) => res.data);
