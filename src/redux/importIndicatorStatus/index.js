import { createActions, handleActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  IMPORT_INDICATOR_STATUS_REQUEST: undefined,
  IMPORT_INDICATOR_STATUS_SUCCESS: undefined,
  IMPORT_INDICATOR_STATUS_FAILURE: undefined,

  OPEN_IMPORT_STATUS_MODAL_STATE: undefined,
  CLOSE_IMPORT_STATUS_MODAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.importIndicatorStatusRequest, handlers.importIndicatorStatusRequest],
    [actions.importIndicatorStatusSuccess, handlers.importIndicatorStatusSuccess],
    [actions.importIndicatorStatusFailure, handlers.importIndicatorStatusFailure],

    [actions.openImportStatusModalState, handlers.openImportStatusModalState],
    [actions.closeImportStatusModalState, handlers.closeImportStatusModalState],
  ]),
  initialState,
);

export default reducer;
