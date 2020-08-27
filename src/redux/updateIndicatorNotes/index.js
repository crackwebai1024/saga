import { createActions, handleActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  UPDATE_INDICATOR_NOTES_REQUEST: undefined,
  UPDATE_INDICATOR_NOTES_SUCCESS: undefined,
  UPDATE_INDICATOR_NOTES_FAILURE: undefined,

  OPEN_INDICATOR_NOTES_MODAL_STATE: undefined,
  CLOSE_INDICATOR_NOTES_MODAL_STATE: undefined,

  SWITCH_TO_EDITABLE_MODE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.updateIndicatorNotesRequest, handlers.updateIndicatorNotesRequest],
    [actions.updateIndicatorNotesSuccess, handlers.updateIndicatorNotesSuccess],
    [actions.updateIndicatorNotesFailure, handlers.updateIndicatorNotesFailure],

    [actions.openIndicatorNotesModalState, handlers.openIndicatorNotesModalState],
    [actions.closeIndicatorNotesModalState, handlers.closeIndicatorNotesModalState],

    [actions.switchToEditableMode, handlers.switchToEditableMode],
  ]),
  initialState,
);

export default reducer;
