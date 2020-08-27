import { createActions, handleActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_INDICATOR_DETAILS_GRAPH_REQUEST: undefined,
  GET_INDICATOR_DETAILS_GRAPH_SUCCESS: undefined,
  GET_INDICATOR_DETAILS_GRAPH_FAILURE: undefined,

  GET_INDICATOR_DETAILS_LIST_REQUEST: undefined,
  GET_INDICATOR_DETAILS_LIST_SUCCESS: undefined,
  GET_INDICATOR_DETAILS_LIST_FAILURE: undefined,

  RESET_INDICATOR_DETAILS_LIST_DATA: undefined,

  GET_INDICATOR_DETAILS_MAP_REQUEST: undefined,
  GET_INDICATOR_DETAILS_MAP_SUCCESS: undefined,
  GET_INDICATOR_DETAILS_MAP_FAILURE: undefined,

  GET_INDICATOR_DATA_REQUEST: undefined,
  GET_INDICATOR_DATA_SUCCESS: undefined,
  GET_INDICATOR_DATA_FAILURE: undefined,

  GET_INDICATOR_UPDATE_LOG_REQUEST: undefined,
  GET_INDICATOR_UPDATE_LOG_SUCCESS: undefined,
  GET_INDICATOR_UPDATE_LOG_FAILURE: undefined,

  RESET_INDICATOR_DATA: undefined,

  SET_INDICATOR_DETAILS_REPORTING_FILTER: undefined,
  SET_INDICATOR_DETAILS_REPORTING_SELECTOR: undefined,

  GET_INDICATOR_HIGHLIGHTS_LOG_REQUEST: undefined,
  GET_INDICATOR_HIGHLIGHTS_LOG_SUCCESS: undefined,
  GET_INDICATOR_HIGHLIGHTS_LOG_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getIndicatorDetailsGraphRequest, handlers.getIndicatorDetailsGraphRequest],
    [actions.getIndicatorDetailsGraphSuccess, handlers.getIndicatorDetailsGraphSuccess],
    [actions.getIndicatorDetailsGraphFailure, handlers.getIndicatorDetailsGraphFailure],

    [actions.getIndicatorDetailsListRequest, handlers.getIndicatorDetailsListRequest],
    [actions.getIndicatorDetailsListSuccess, handlers.getIndicatorDetailsListSuccess],
    [actions.getIndicatorDetailsListFailure, handlers.getIndicatorDetailsListFailure],

    [actions.resetIndicatorDetailsListData, handlers.resetIndicatorDetailsListData],

    [actions.getIndicatorDetailsMapRequest, handlers.getIndicatorDetailsMapRequest],
    [actions.getIndicatorDetailsMapSuccess, handlers.getIndicatorDetailsMapSuccess],
    [actions.getIndicatorDetailsMapFailure, handlers.getIndicatorDetailsMapFailure],

    [actions.getIndicatorDataRequest, handlers.getIndicatorDataRequest],
    [actions.getIndicatorDataSuccess, handlers.getIndicatorDataSuccess],
    [actions.getIndicatorDataFailure, handlers.getIndicatorDataFailure],

    [actions.getIndicatorUpdateLogRequest, handlers.getIndicatorUpdateLogRequest],
    [actions.getIndicatorUpdateLogSuccess, handlers.getIndicatorUpdateLogSuccess],
    [actions.getIndicatorUpdateLogFailure, handlers.getIndicatorUpdateLogFailure],

    [actions.resetIndicatorData, handlers.resetIndicatorData],

    [actions.setIndicatorDetailsReportingFilter, handlers.setIndicatorDetailsReportingFilter],
    [actions.setIndicatorDetailsReportingSelector, handlers.setIndicatorDetailsReportingSelector],

    [actions.getIndicatorHighlightsLogRequest, handlers.getIndicatorHighlightsLogRequest],
    [actions.getIndicatorHighlightsLogSuccess, handlers.getIndicatorHighlightsLogSuccess],
    [actions.getIndicatorHighlightsLogFailure, handlers.getIndicatorHighlightsLogFailure],
  ]),
  initialState,
);

export default reducer;
