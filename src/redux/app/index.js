import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  SET_CONFIRM_MODAL_STATE: undefined,
  OPEN_DRAWER_MENU: undefined,
  CLOSE_DRAWER_MENU: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setConfirmModalState, handlers.setConfirmModalState],
    [actions.openDrawerMenu, handlers.openDrawerMenu],
    [actions.closeDrawerMenu, handlers.closeDrawerMenu],
  ]),
  initialState,
);

export default reducer;
