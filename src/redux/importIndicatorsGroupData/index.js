import { createActions, handleActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  IMPORT_INDICATORS_GROUP_DATA_REQUEST: undefined,
  IMPORT_INDICATORS_GROUP_DATA_SUCCESS: undefined,
  IMPORT_INDICATORS_GROUP_DATA_FAILURE: undefined,

  DELETE_INDICATORS_GROUP_DATA_REQUEST: undefined,
  DELETE_INDICATORS_GROUP_DATA_SUCCESS: undefined,
  DELETE_INDICATORS_GROUP_DATA_FAILURE: undefined,

  OPEN_IMPORT_INDICATORS_GROUP_MODAL_STATE: undefined,
  CLOSE_IMPORT_INDICATORS_GROUP_MODAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.importIndicatorsGroupDataRequest, handlers.importIndicatorsGroupDataRequest],
    [actions.importIndicatorsGroupDataSuccess, handlers.importIndicatorsGroupDataSuccess],
    [actions.importIndicatorsGroupDataFailure, handlers.importIndicatorsGroupDataFailure],

    [actions.deleteIndicatorsGroupDataRequest, handlers.deleteIndicatorsGroupDataRequest],
    [actions.deleteIndicatorsGroupDataSuccess, handlers.deleteIndicatorsGroupDataSuccess],
    [actions.deleteIndicatorsGroupDataFailure, handlers.deleteIndicatorsGroupDataFailure],

    [actions.openImportIndicatorsGroupModalState, handlers.openImportIndicatorsGroupModalState],
    [actions.closeImportIndicatorsGroupModalState, handlers.closeImportIndicatorsGroupModalState],
  ]),
  initialState,
);

export default reducer;
