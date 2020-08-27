import http from 'http/index';
import {
  formatFields,
  formatNotesFields,
  formatSettings,
  formatOrderFields,
  formatDetailFields,
  formatCustomFields,
  formatColor,
  formatStatus,
  formatDataTable,
  formatData,
} from './formatters';

export const getIndicator = (data) => {
  const params = {};
  if (data.year) {
    params.year = data.year;
  }

  return http.get(
    `/indicator-data/indicator/${data.indicatorId}`, { params },
  ).then((res) => formatDataTable(res.data));
};

export const updateIndicator = (data) => {
  const params = {};
  if (data.year) {
    params.year = data.year;
  }

  return http.post(
    `/indicator-data/indicator/${data.indicatorId}`, formatData(data), { params },
  ).then((res) => (res.data));
};

export const getDetailsList = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/dashboard/indicator/${data.id}/${data.selector.period}/${data.selector.value}`,
  {
    params: formatDetailFields(data),
  },
).then((res) => res.data);

export const getDetailsMap = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/dashboard/map/${data.id}/${data.selector.period}/${data.selector.value}`,
  {
    params: formatDetailFields(data),
  },
).then((res) => res.data);

export const getDetailsGraph = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/dashboard/graph/${data.id}/${data.selector.period}/${data.selector.value}`,
  {
    params: formatDetailFields(data),
  },
).then((res) => res.data);

export const getIndicatorData = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/dashboard/status/${data.indicatorId}/${data.selectedPeriod.period}/${data.selectedPeriod.value}`,
).then((res) => res.data);

export const create = (data) => http.post(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator`,
  data.indicator,
).then((res) => res.data);

export const remove = (data) => http.delete(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.id}`,
).then((res) => res.data);

export const update = (data) => http.put(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.id}`,
  formatFields(data),
).then((res) => res.data);

export const updateSettings = (data) => http.post(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/settings`,
  formatSettings(data),
).then((res) => res.data);

export const getCustomFields = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/custom-fields`,
).then((res) => res.data);

export const updateCustomFields = (data) => http.post(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/custom-fields`,
  formatCustomFields(data),
).then((res) => res.data);

export const updateOrder = (data) => http.put(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/order`,
  formatOrderFields(data),
).then((res) => res.data);

export const getColors = (data) => http.get(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/group-colors`,
).then((res) => res.data);

export const createColor = (data) => http.post(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/group-colors`,
  formatColor(data),
).then((res) => res.data);

export const updateColor = (data) => http.put(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/group-colors/${data.id}`,
  formatColor(data),
).then((res) => res.data);

export const removeColor = (data) => http.delete(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.indicatorId}/group-colors/${data.id}`,
).then((res) => res.data);

export const getIndicatorUpdateLog = (data) => http.get(
  // eslint-disable-next-line max-len
  `/import/indicator/${data.id}/update-log`,
).then((res) => res.data);

export const updateStatus = (data) => http.post(
  // eslint-disable-next-line max-len
  `import/indicator-status/${data.id}`,
  formatStatus(data),
).then((res) => res.data);

export const updateNotes = (data) => http.put(
  // eslint-disable-next-line max-len
  `/countries/${data.countryId}/projects/${data.projectId}/sections/${data.sectionId}/indicator-group/${data.indicatorsGroupId}/indicator/${data.id}/notes-fields`,
  formatNotesFields(data),
).then((res) => res.data);

export const getIndicatorHighlightsLog = (data) => http.get(
  // eslint-disable-next-line max-len
  `/logs/indicator/${data.id}/highlights`,
).then((res) => res.data);
