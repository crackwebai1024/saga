import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  FETCH_COUNTRY_REQUEST: undefined,
  FETCH_COUNTRY_SUCCESS: undefined,
  FETCH_COUNTRY_FAILURE: undefined,

  ON_PROJECT_CHANGE_REQUEST: undefined,
  FETCH_PROJECT_DASHBOARD_REQUEST: undefined,
  FETCH_PROJECT_DASHBOARD_SUCCESS: undefined,
  FETCH_PROJECT_DASHBOARD_FAILURE: undefined,

  UPDATE_DETAILS_WITH_INDICATOR_GROUP: undefined,

  FETCH_TARGETS_REQUEST: undefined,
  FETCH_TARGETS_SUCCESS: undefined,
  FETCH_TARGETS_FAILURE: undefined,

  REGISTER_TARGET_REQUEST: undefined,
  REGISTER_TARGET_SUCCESS: undefined,
  REGISTER_TARGET_FAILURE: undefined,

  DELETE_TARGET_REQUEST: undefined,
  DELETE_TARGET_SUCCESS: undefined,
  DELETE_TARGET_FAILURE: undefined,

  UPDATE_TARGET_REQUEST: undefined,
  UPDATE_TARGET_SUCCESS: undefined,
  UPDATE_TARGET_FAILURE: undefined,

  TARGET_SET_MODAL_STATE: undefined,

  RESET_TO_INITIAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.fetchCountryRequest, handlers.fetchCountryRequest],
    [actions.fetchCountrySuccess, handlers.fetchCountrySuccess],
    [actions.fetchCountryFailure, handlers.fetchCountryFailure],

    [actions.onProjectChangeRequest, handlers.onProjectChangeRequest],
    [actions.fetchProjectDashboardRequest, handlers.fetchProjectDashboardRequest],
    [actions.fetchProjectDashboardSuccess, handlers.fetchProjectDashboardSuccess],
    [actions.fetchProjectDashboardFailure, handlers.fetchProjectDashboardFailure],

    [actions.updateDetailsWithIndicatorGroup, handlers.updateDetailsWithIndicatorGroup],

    [actions.fetchTargetsRequest, handlers.fetchTargetsRequest],
    [actions.fetchTargetsSuccess, handlers.fetchTargetsSuccess],
    [actions.fetchTargetsFailure, handlers.fetchTargetsFailure],

    [actions.registerTargetRequest, handlers.registerTargetRequest],
    [actions.registerTargetSuccess, handlers.registerTargetSuccess],
    [actions.registerTargetFailure, handlers.registerTargetFailure],

    [actions.deleteTargetRequest, handlers.deleteTargetRequest],
    [actions.deleteTargetSuccess, handlers.deleteTargetSuccess],
    [actions.deleteTargetFailure, handlers.deleteTargetFailure],

    [actions.updateTargetRequest, handlers.updateTargetRequest],
    [actions.updateTargetSuccess, handlers.updateTargetSuccess],
    [actions.updateTargetFailure, handlers.updateTargetFailure],

    [actions.targetSetModalState, handlers.targetSetModalState],

    [actions.resetToInitialState, handlers.resetToInitialState],
  ]),
  initialState,
);

export default reducer;
