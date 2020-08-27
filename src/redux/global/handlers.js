import getErrorMessage from 'helpers/getErrorMessage';
import { getYearsRange, getCurrentYear } from 'helpers/getYears';

import { showedStatuses } from 'helpers/statuses';

const periods = getYearsRange();
const statuses = Object.keys(showedStatuses);

const initialState = {
  periods,
  countries: [],
  projects: [],
  sections: [],
  mapData: {
    items: [],
  },
  statuses,
  statusData: {
    items: [],
  },
  listData: {},
  statistic: {},
  isCountriesLoading: false,
  isProjectsLoading: false,
  isMapDataLoading: false,
  isStatusDataLoading: false,
  isListDataLoading: false,
  error: '',
  selectedPeriod: getCurrentYear(),
  selectedCountry: -1,
  selectedProject: -1,
  selectedSection: -1,
  selectedStatuses: statuses,
};

export const getGlobalCountriesRequest = (state) => ({
  ...state,
  isCountriesListLoading: true,
});

export const getGlobalCountriesSuccess = (state, { payload }) => ({
  ...state,
  countries: payload.countries,
  isCountriesListLoading: false,
});

export const getGlobalCountriesFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isCountriesLoading: false,
});

export const getGlobalProjectsRequest = (state) => ({
  ...state,
  isProjectsLoading: true,
});

export const getGlobalProjectsSuccess = (state, { payload }) => ({
  ...state,
  projects: payload,
  isProjectsLoading: false,
});

export const getGlobalProjectsFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isProjectsLoading: false,
});

export const getGlobalSectionsRequest = (state) => ({
  ...state,
  isSectionLoading: true,
});

export const getGlobalSectionsSuccess = (state, { payload }) => ({
  ...state,
  sections: payload,
  isSectionsLoading: false,
});

export const getGlobalSectionsFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isSectionListLoading: false,
});

export const getMapDataRequest = (state) => ({
  ...state,
  isMapDataLoading: true,
});

export const getMapDataSuccess = (state, { payload }) => ({
  ...state,
  mapData: payload,
  isMapDataLoading: false,
});

export const getMapDataFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isMapDataLoading: false,
});

export const getStatusDataRequest = (state) => ({
  ...state,
  isStatusDataLoading: true,
});

export const getStatusDataSuccess = (state, { payload }) => ({
  ...state,
  statusData: payload,
  isStatusDataLoading: false,
});

export const getStatusDataFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isStatusDataLoading: false,
});

export const getGlobalListDataRequest = (state) => ({
  ...state,
  isListDataLoading: true,
});

export const getGlobalListDataSuccess = (state, { payload }) => ({
  ...state,
  listData: payload,
  isListDataLoading: false,
});

export const getGlobalListDataFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isListDataLoading: false,
});

export const getGlobalStatisticRequest = (state) => ({
  ...state,
});

export const getGlobalStatisticSuccess = (state, { payload }) => ({
  ...state,
  statistic: payload,
});

export const getGlobalStatisticFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
});

export const setSelectedPeriod = (state, { payload }) => ({
  ...state,
  selectedPeriod: payload,
});

export const setSelectedCountry = (state, { payload }) => ({
  ...state,
  selectedCountry: payload,
  selectedProject: initialState.selectedProject,
  selectedSection: initialState.selectedSection,
});

export const setSelectedProject = (state, { payload }) => ({
  ...state,
  selectedProject: payload,
  selectedSection: initialState.selectedSection,
});

export const setSelectedSection = (state, { payload }) => ({
  ...state,
  selectedSection: payload,
});

export const setSelectedStatuses = (state, { payload }) => ({
  ...state,
  selectedStatuses: payload,
});

export default initialState;
