import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  ADD_NOTIFICATION: undefined,
  REMOVE_NOTIFICATION: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.addNotification, handlers.addNotification],
    [actions.removeNotification, handlers.removeNotification],
  ]),
  initialState,
);

export default reducer;
