import http from 'http/index';
import { formatFields, formatOrderFields } from './formatters';

export const getFullStructure = ({ countryId, projectId }) => http
  .get(`/countries/${countryId}/projects/${projectId}/sections/full`)
  .then((res) => res.data);

export const create = (data) => http.post(
  `/countries/${data.countryId}/projects/${data.projectId}/sections`,
  formatFields(data),
).then((res) => res.data);

export const remove = (data) => http
  .delete(`/countries/${data.countryId}/projects/${data.projectId}/sections/${data.id}`)
  .then((res) => res.data);

export const update = (data) => http.put(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.id}`,
  formatFields(data),
).then((res) => res.data);

export const updateOrder = (data) => http.put(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/order`,
  formatOrderFields(data),
).then((res) => res.data);
