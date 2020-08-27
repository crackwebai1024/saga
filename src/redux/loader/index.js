import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  SET_LOADER_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.setLoaderState, handlers.setLoaderState],
  ]),
  initialState,
);

export default reducer;
