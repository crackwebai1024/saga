import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  SET_THEME: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setTheme, handlers.setTheme],
  ]),
  initialState,
);

export default reducer;
