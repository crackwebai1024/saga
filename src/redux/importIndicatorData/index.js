import { createActions, handleActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  IMPORT_INDICATOR_DATA_REQUEST: undefined,
  IMPORT_INDICATOR_DATA_SUCCESS: undefined,
  IMPORT_INDICATOR_DATA_FAILURE: undefined,

  OPEN_IMPORT_MODAL_STATE: undefined,
  CLOSE_IMPORT_MODAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.importIndicatorDataRequest, handlers.importIndicatorDataRequest],
    [actions.importIndicatorDataSuccess, handlers.importIndicatorDataSuccess],
    [actions.importIndicatorDataFailure, handlers.importIndicatorDataFailure],

    [actions.openImportModalState, handlers.openImportModalState],
    [actions.closeImportModalState, handlers.closeImportModalState],
  ]),
  initialState,
);

export default reducer;
