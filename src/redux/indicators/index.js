import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_INDICATOR_REQUEST: undefined,
  GET_INDICATOR_SUCCESS: undefined,
  GET_INDICATOR_FAILURE: undefined,

  UPDATE_INDICATOR_DATA_REQUEST: undefined,
  UPDATE_INDICATOR_DATA_SUCCESS: undefined,
  UPDATE_INDICATOR_DATA_FAILURE: undefined,

  CREATE_INDICATOR_REQUEST: undefined,
  CREATE_INDICATOR_SUCCESS: undefined,
  CREATE_INDICATOR_FAILURE: undefined,

  DELETE_INDICATOR_REQUEST: undefined,
  DELETE_INDICATOR_SUCCESS: undefined,
  DELETE_INDICATOR_FAILURE: undefined,

  UPDATE_INDICATOR_REQUEST: undefined,
  UPDATE_INDICATOR_SUCCESS: undefined,
  UPDATE_INDICATOR_FAILURE: undefined,

  UPDATE_INDICATOR_SETTINGS_REQUEST: undefined,
  UPDATE_INDICATOR_SETTINGS_SUCCESS: undefined,
  UPDATE_INDICATOR_SETTINGS_FAILURE: undefined,

  GET_CUSTOM_FIELDS_REQUEST: undefined,
  GET_CUSTOM_FIELDS_SUCCESS: undefined,
  GET_CUSTOM_FIELDS_FAILURE: undefined,

  UPDATE_CUSTOM_FIELDS_REQUEST: undefined,
  UPDATE_CUSTOM_FIELDS_SUCCESS: undefined,
  UPDATE_CUSTOM_FIELDS_FAILURE: undefined,

  UPDATE_INDICATOR_ORDER_REQUEST: undefined,
  UPDATE_INDICATOR_ORDER_SUCCESS: undefined,
  UPDATE_INDICATOR_ORDER_FAILURE: undefined,

  GET_INDICATOR_COLORS_REQUEST: undefined,
  GET_INDICATOR_COLORS_SUCCESS: undefined,
  GET_INDICATOR_COLORS_FAILURE: undefined,

  CREATE_INDICATOR_COLOR_REQUEST: undefined,
  CREATE_INDICATOR_COLOR_SUCCESS: undefined,
  CREATE_INDICATOR_COLOR_FAILURE: undefined,

  UPDATE_INDICATOR_COLOR_REQUEST: undefined,
  UPDATE_INDICATOR_COLOR_SUCCESS: undefined,
  UPDATE_INDICATOR_COLOR_FAILURE: undefined,

  DELETE_INDICATOR_COLOR_REQUEST: undefined,
  DELETE_INDICATOR_COLOR_SUCCESS: undefined,
  DELETE_INDICATOR_COLOR_FAILURE: undefined,

  SET_INDICATOR_SETTINGS_MODAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getIndicatorRequest, handlers.getIndicatorRequest],
    [actions.getIndicatorSuccess, handlers.getIndicatorSuccess],
    [actions.getIndicatorFailure, handlers.getIndicatorFailure],

    [actions.updateIndicatorDataRequest, handlers.updateIndicatorDataRequest],
    [actions.updateIndicatorDataSuccess, handlers.updateIndicatorDataSuccess],
    [actions.updateIndicatorDataFailure, handlers.updateIndicatorDataFailure],

    [actions.createIndicatorRequest, handlers.createIndicatorRequest],
    [actions.createIndicatorSuccess, handlers.createIndicatorSuccess],
    [actions.createIndicatorFailure, handlers.createIndicatorFailure],

    [actions.deleteIndicatorRequest, handlers.deleteIndicatorRequest],
    [actions.deleteIndicatorSuccess, handlers.deleteIndicatorSuccess],
    [actions.deleteIndicatorFailure, handlers.deleteIndicatorFailure],

    [actions.updateIndicatorRequest, handlers.updateIndicatorRequest],
    [actions.updateIndicatorSuccess, handlers.updateIndicatorSuccess],
    [actions.updateIndicatorFailure, handlers.updateIndicatorFailure],

    [actions.updateIndicatorSettingsRequest, handlers.updateIndicatorSettingsRequest],
    [actions.updateIndicatorSettingsSuccess, handlers.updateIndicatorSettingsSuccess],
    [actions.updateIndicatorSettingsFailure, handlers.updateIndicatorSettingsFailure],

    [actions.updateCustomFieldsRequest, handlers.updateCustomFieldsRequest],
    [actions.updateCustomFieldsSuccess, handlers.updateCustomFieldsSuccess],
    [actions.updateCustomFieldsFailure, handlers.updateCustomFieldsFailure],

    [actions.getCustomFieldsRequest, handlers.getCustomFieldsRequest],
    [actions.getCustomFieldsSuccess, handlers.getCustomFieldsSuccess],
    [actions.getCustomFieldsFailure, handlers.getCustomFieldsFailure],

    [actions.updateIndicatorOrderRequest, handlers.updateIndicatorOrderRequest],
    [actions.updateIndicatorOrderSuccess, handlers.updateIndicatorOrderSuccess],
    [actions.updateIndicatorOrderFailure, handlers.updateIndicatorOrderFailure],

    [actions.getIndicatorColorsRequest, handlers.getIndicatorColorsRequest],
    [actions.getIndicatorColorsSuccess, handlers.getIndicatorColorsSuccess],
    [actions.getIndicatorColorsFailure, handlers.getIndicatorColorsFailure],

    [actions.createIndicatorColorRequest, handlers.createIndicatorColorRequest],
    [actions.createIndicatorColorSuccess, handlers.createIndicatorColorSuccess],
    [actions.createIndicatorColorFailure, handlers.createIndicatorColorFailure],

    [actions.updateIndicatorColorRequest, handlers.updateIndicatorColorRequest],
    [actions.updateIndicatorColorSuccess, handlers.updateIndicatorColorSuccess],
    [actions.updateIndicatorColorFailure, handlers.updateIndicatorColorFailure],

    [actions.deleteIndicatorColorRequest, handlers.deleteIndicatorColorRequest],
    [actions.deleteIndicatorColorSuccess, handlers.deleteIndicatorColorSuccess],
    [actions.deleteIndicatorColorFailure, handlers.deleteIndicatorColorFailure],

    [actions.setIndicatorSettingsModalState, handlers.setIndicatorSettingsModalState],
  ]),
  initialState,
);

export default reducer;
