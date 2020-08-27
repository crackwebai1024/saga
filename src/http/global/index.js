import http from 'http/index';
import queryString from 'query-string';

export const getCountries = () => http.get('/countries/existing').then((res) => res.data);

export const getProjects = (payload) => {
  const query = queryString.stringify(payload);

  return http.get(`/global/dashboard/projects?${query}`).then((res) => res.data);
};

export const getSections = (payload) => {
  const query = queryString.stringify(payload);

  return http.get(`/global/dashboard/sections?${query}`).then((res) => res.data);
};

export const getMapData = (payload) => {
  const query = queryString.stringify(payload);

  return http.get(`/global/dashboard/map-data?${query}`).then((res) => res.data);
};

export const getStatusData = (payload) => {
  const query = queryString.stringify(payload);

  return http.get(`/global/dashboard/status-data?${query}`).then((res) => res.data);
};

export const getListData = (payload) => {
  const query = queryString.stringify(payload);

  return http.get(`/global/dashboard/indicators?${query}`).then((res) => res.data);
};

export const getStatistic = () => http.get('/global/dashboard/statistic').then((res) => res.data);
