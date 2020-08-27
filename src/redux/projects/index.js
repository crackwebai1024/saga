import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_ALL_PROJECTS: undefined,
  GET_ALL_PROJECTS_SUCCESS: undefined,
  GET_ALL_PROJECTS_FAILURE: undefined,

  SET_PROJECT_MODAL_STATE: undefined,

  CREATE_PROJECT_REQUEST: undefined,
  CREATE_PROJECT_SUCCESS: undefined,
  CREATE_PROJECT_FAILURE: undefined,

  DELETE_PROJECT_REQUEST: undefined,
  DELETE_PROJECT_SUCCESS: undefined,
  DELETE_PROJECT_FAILURE: undefined,

  UPDATE_PROJECT_REQUEST: undefined,
  UPDATE_PROJECT_SUCCESS: undefined,
  UPDATE_PROJECT_FAILURE: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getAllProjects, handlers.getAllProjects],
    [actions.getAllProjectsSuccess, handlers.getAllProjectsSuccess],
    [actions.getAllProjectsFailure, handlers.getAllProjectsFailure],

    [actions.setProjectModalState, handlers.setProjectModalState],

    [actions.createProjectRequest, handlers.createProjectRequest],
    [actions.createProjectSuccess, handlers.createProjectSuccess],
    [actions.createProjectFailure, handlers.createProjectFailure],

    [actions.deleteProjectRequest, handlers.deleteProjectRequest],
    [actions.deleteProjectSuccess, handlers.deleteProjectSuccess],
    [actions.deleteProjectFailure, handlers.deleteProjectFailure],

    [actions.updateProjectRequest, handlers.updateProjectRequest],
    [actions.updateProjectSuccess, handlers.updateProjectSuccess],
    [actions.updateProjectFailure, handlers.updateProjectFailure],
  ]),
  initialState,
);

export default reducer;
