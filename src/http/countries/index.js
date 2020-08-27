import http from 'http/index';
import { formatFields, formatFieldsTargets } from './formatters';

export const getPageList = (params) => {
  const {
    order,
    orderBy,
    page,
    rowsPerPage,
  } = params;
  const paramsMap = {
    order,
    sort: orderBy,
    page,
    pageCount: rowsPerPage,
  };

  return http
    .get('/countries', {
      params: paramsMap,
    })
    .then((res) => res.data);
};

export const create = (data) => http.post('/countries', formatFields(data)).then((res) => res.data);

export const getCountriesForForm = () => http.get('/countries/existing').then((res) => res.data);

export const getAllowedCountries = () => http.get('/countries').then((res) => res.data);

export const getWorldCountries = () => http.get('/countries/not-used').then((res) => res.data);

export const remove = (id) => http.delete(`/countries/${id}`).then((res) => res.data);

export const update = (data) => http.put(`/countries/${data.id}`, formatFields(data)).then((res) => res.data);

export const getCountry = ({ slug }) => http.get(`/countries/${slug}/with-projects`).then((res) => res.data);

export const getTargets = ({
  page,
  rowsPerPage,
  sort = '',
  order = 'asc',
  countryId,
  projectId,
  id,
  year,
}) => (
  http.get(`countries/${countryId}/projects/${projectId}/targets`, {
    params: {
      page,
      pageCount: rowsPerPage,
      sort,
      order,
      countryId,
      id,
      year,
    },
  }).then((res) => res.data)
);

export const registerTarget = (countryId, projectId, data) => http
  .post(`countries/${countryId}/projects/${projectId}/targets`, formatFieldsTargets(data)).then((res) => res.data);

export const removeTarget = (countryId, projectId, id) => http
  .delete(`countries/${countryId}/projects/${projectId}/targets/${id}`).then((res) => res.data);

export const updateTarget = (countryId, projectId, data) => http
  // eslint-disable-next-line max-len
  .put(`countries/${countryId}/projects/${projectId}/targets/${data.id}`, formatFieldsTargets(data)).then((res) => res.data);

// export const importFile = ({ file }) => http.post('/countries/import', makeFormData(file)).then(res => res.data);
