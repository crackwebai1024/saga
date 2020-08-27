import http, { baseUrl } from 'http/index';
import { formatFields } from './formatters';

export const getIndicatorTemplateLink = (id) => `${baseUrl}/api/import/indicator/${id}`;

export const importIndicatorData = (data) => http.post(
  `/import/indicator/${data.indicatorId}`,
  formatFields(data),
).then((res) => res.data);

export const blank = () => {};
