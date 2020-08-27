import http from 'http/index';
import { formatFields, formatOrderFields, formatGroupData } from './formatters';

export const create = (data) => http.post(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group`,
  data.indicatorsGroup,
).then((res) => res.data);

export const remove = (data) => http.delete(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.id}`,
).then((res) => res.data);

export const update = (data) => http.put(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.id}`,
  formatFields(data),
).then((res) => res.data);

export const updateOrder = (data) => http.put(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/order`,
  formatOrderFields(data),
).then((res) => res.data);

export const updateData = (data) => http.post(
  `/import/indicator-group/${data.id}`,
  formatGroupData(data),
).then((res) => res.data);

export const deleteData = (data) => http.delete(
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.id}/data`,
).then((res) => res.data);
