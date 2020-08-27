import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  FORGOT_PASSWORD_REQUEST: undefined,
  FORGOT_PASSWORD_SUCCESS: undefined,
  FORGOT_PASSWORD_FAILURE: undefined,

  RESET_PASSWORD_REQUEST: undefined,
  RESET_PASSWORD_SUCCESS: undefined,
  RESET_PASSWORD_FAILURE: undefined,

  RESET_TO_INITIAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.forgotPasswordRequest, handlers.forgotPasswordRequest],
    [actions.forgotPasswordSuccess, handlers.forgotPasswordSuccess],
    [actions.forgotPasswordFailure, handlers.forgotPasswordFailure],

    [actions.resetPasswordRequest, handlers.resetPasswordRequest],
    [actions.resetPasswordSuccess, handlers.resetPasswordSuccess],
    [actions.resetPasswordFailure, handlers.resetPasswordFailure],

    [actions.resetToInitialState, handlers.resetToInitialState],
  ]),
  initialState,
);

export default reducer;
