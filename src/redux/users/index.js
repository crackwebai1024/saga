import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_USERS_REQUEST: undefined,
  GET_USERS_SUCCESS: undefined,
  GET_USERS_FAILURE: undefined,

  REGISTER_USER_REQUEST: undefined,
  REGISTER_USER_SUCCESS: undefined,
  REGISTER_USER_FAILURE: undefined,

  DELETE_USER_REQUEST: undefined,
  DELETE_USER_SUCCESS: undefined,
  DELETE_USER_FAILURE: undefined,

  UPDATE_USER_REQUEST: undefined,
  UPDATE_USER_SUCCESS: undefined,
  UPDATE_USER_FAILURE: undefined,

  USER_SET_MODAL_STATE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getUsersRequest, handlers.getUsersRequest],
    [actions.getUsersSuccess, handlers.getUsersSuccess],
    [actions.getUsersFailure, handlers.getUsersFailure],

    [actions.registerUserRequest, handlers.registerUserRequest],
    [actions.registerUserSuccess, handlers.registerUserSuccess],
    [actions.registerUserFailure, handlers.registerUserFailure],

    [actions.deleteUserRequest, handlers.deleteUserRequest],
    [actions.deleteUserSuccess, handlers.deleteUserSuccess],
    [actions.deleteUserFailure, handlers.deleteUserFailure],

    [actions.updateUserRequest, handlers.updateUserRequest],
    [actions.updateUserSuccess, handlers.updateUserSuccess],
    [actions.updateUserFailure, handlers.updateUserFailure],

    [actions.userSetModalState, handlers.userSetModalState],
  ]),
  initialState,
);

export default reducer;
