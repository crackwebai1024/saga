import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  CREATE_INDICATORS_GROUP_REQUEST: undefined,
  CREATE_INDICATORS_GROUP_SUCCESS: undefined,
  CREATE_INDICATORS_GROUP_FAILURE: undefined,

  DELETE_INDICATORS_GROUP_REQUEST: undefined,
  DELETE_INDICATORS_GROUP_SUCCESS: undefined,
  DELETE_INDICATORS_GROUP_FAILURE: undefined,

  UPDATE_INDICATORS_GROUP_REQUEST: undefined,
  UPDATE_INDICATORS_GROUP_SUCCESS: undefined,
  UPDATE_INDICATORS_GROUP_FAILURE: undefined,

  UPDATE_INDICATORS_GROUP_ORDER_REQUEST: undefined,
  UPDATE_INDICATORS_GROUP_ORDER_SUCCESS: undefined,
  UPDATE_INDICATORS_GROUP_ORDER_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.createIndicatorsGroupRequest, handlers.createIndicatorsGroupRequest],
    [actions.createIndicatorsGroupSuccess, handlers.createIndicatorsGroupSuccess],
    [actions.createIndicatorsGroupFailure, handlers.createIndicatorsGroupFailure],

    [actions.deleteIndicatorsGroupRequest, handlers.deleteIndicatorsGroupRequest],
    [actions.deleteIndicatorsGroupSuccess, handlers.deleteIndicatorsGroupSuccess],
    [actions.deleteIndicatorsGroupFailure, handlers.deleteIndicatorsGroupFailure],

    [actions.updateIndicatorsGroupRequest, handlers.updateIndicatorsGroupRequest],
    [actions.updateIndicatorsGroupSuccess, handlers.updateIndicatorsGroupSuccess],
    [actions.updateIndicatorsGroupFailure, handlers.updateIndicatorsGroupFailure],

    [actions.updateIndicatorsGroupOrderRequest, handlers.updateIndicatorsGroupOrderRequest],
    [actions.updateIndicatorsGroupOrderSuccess, handlers.updateIndicatorsGroupOrderSuccess],
    [actions.updateIndicatorsGroupOrderFailure, handlers.updateIndicatorsGroupOrderFailure],
  ]),
  initialState,
);

export default reducer;
