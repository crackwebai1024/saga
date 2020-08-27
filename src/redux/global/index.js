import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_GLOBAL_COUNTRIES_REQUEST: undefined,
  GET_GLOBAL_COUNTRIES_SUCCESS: undefined,
  GET_GLOBAL_COUNTRIES_FAILURE: undefined,

  GET_GLOBAL_PROJECTS_REQUEST: undefined,
  GET_GLOBAL_PROJECTS_SUCCESS: undefined,
  GET_GLOBAL_PROJECTS_FAILURE: undefined,

  GET_GLOBAL_SECTIONS_REQUEST: undefined,
  GET_GLOBAL_SECTIONS_SUCCESS: undefined,
  GET_GLOBAL_SECTIONS_FAILURE: undefined,

  GET_MAP_DATA_REQUEST: undefined,
  GET_MAP_DATA_SUCCESS: undefined,
  GET_MAP_DATA_FAILURE: undefined,

  GET_STATUS_DATA_REQUEST: undefined,
  GET_STATUS_DATA_SUCCESS: undefined,
  GET_STATUS_DATA_FAILURE: undefined,

  GET_GLOBAL_LIST_DATA_REQUEST: undefined,
  GET_GLOBAL_LIST_DATA_SUCCESS: undefined,
  GET_GLOBAL_LIST_DATA_FAILURE: undefined,

  GET_GLOBAL_STATISTIC_REQUEST: undefined,
  GET_GLOBAL_STATISTIC_SUCCESS: undefined,
  GET_GLOBAL_STATISTIC_FAILURE: undefined,

  SET_SELECTED_PERIOD: undefined,
  SET_SELECTED_COUNTRY: undefined,
  SET_SELECTED_PROJECT: undefined,
  SET_SELECTED_SECTION: undefined,
  SET_SELECTED_STATUSES: undefined,

  SET_GLOBAL_THEME: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getGlobalCountriesRequest, handlers.getGlobalCountriesRequest],
    [actions.getGlobalCountriesSuccess, handlers.getGlobalCountriesSuccess],
    [actions.getGlobalCountriesFailure, handlers.getGlobalCountriesFailure],

    [actions.getGlobalProjectsRequest, handlers.getGlobalProjectsRequest],
    [actions.getGlobalProjectsSuccess, handlers.getGlobalProjectsSuccess],
    [actions.getGlobalProjectsFailure, handlers.getGlobalProjectsFailure],

    [actions.getGlobalSectionsRequest, handlers.getGlobalSectionsRequest],
    [actions.getGlobalSectionsSuccess, handlers.getGlobalSectionsSuccess],
    [actions.getGlobalSectionsFailure, handlers.getGlobalSectionsFailure],

    [actions.getMapDataRequest, handlers.getMapDataRequest],
    [actions.getMapDataSuccess, handlers.getMapDataSuccess],
    [actions.getMapDataFailure, handlers.getMapDataFailure],

    [actions.getStatusDataRequest, handlers.getStatusDataRequest],
    [actions.getStatusDataSuccess, handlers.getStatusDataSuccess],
    [actions.getStatusDataFailure, handlers.getStatusDataFailure],

    [actions.getGlobalListDataRequest, handlers.getGlobalListDataRequest],
    [actions.getGlobalListDataSuccess, handlers.getGlobalListDataSuccess],
    [actions.getGlobalListDataFailure, handlers.getGlobalListDataFailure],

    [actions.getGlobalStatisticRequest, handlers.getGlobalStatisticRequest],
    [actions.getGlobalStatisticSuccess, handlers.getGlobalStatisticSuccess],
    [actions.getGlobalStatisticFailure, handlers.getGlobalStatisticFailure],

    [actions.setSelectedPeriod, handlers.setSelectedPeriod],
    [actions.setSelectedCountry, handlers.setSelectedCountry],
    [actions.setSelectedProject, handlers.setSelectedProject],
    [actions.setSelectedSection, handlers.setSelectedSection],
    [actions.setSelectedStatuses, handlers.setSelectedStatuses],
  ]),
  initialState,
);

export default reducer;
