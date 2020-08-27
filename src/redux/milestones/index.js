import { handleActions, createActions } from 'redux-actions';

import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_INDICATOR_GROUPS_REQUEST: undefined,
  GET_INDICATOR_GROUPS_SUCCESS: undefined,
  GET_INDICATOR_GROUPS_FAILURE: undefined,

  CREATE_MILESTONE_REQUEST: undefined,
  CREATE_MILESTONE_SUCCESS: undefined,
  CREATE_MILESTONE_FAILURE: undefined,

  DELETE_MILESTONE_REQUEST: undefined,
  DELETE_MILESTONE_SUCCESS: undefined,
  DELETE_MILESTONE_FAILURE: undefined,

  UPDATE_MILESTONE_REQUEST: undefined,
  UPDATE_MILESTONE_SUCCESS: undefined,
  UPDATE_MILESTONE_FAILURE: undefined,

  GET_MILESTONES_REQUEST: undefined,
  GET_MILESTONES_SUCCESS: undefined,
  GET_MILESTONES_FAILURE: undefined,

  GET_RESPONSIBLE_PARTIES_REQUEST: undefined,
  GET_RESPONSIBLE_PARTIES_SUCCESS: undefined,
  GET_RESPONSIBLE_PARTIES_FAILURE: undefined,

  GET_MILESTONES_GRAPH_REQUEST: undefined,
  GET_MILESTONES_GRAPH_SUCCESS: undefined,
  GET_MILESTONES_GRAPH_FAILURE: undefined,

  GET_UPCOMING_MILESTONES_REQUEST: undefined,
  GET_UPCOMING_MILESTONES_SUCCESS: undefined,
  GET_UPCOMING_MILESTONES_FAILURE: undefined,

  OPEN_ADD_EDIT_MODAL: undefined,
  CLOSE_ADD_EDIT_MODAL: undefined,

  RESET_TO_INITIAL_STATE: undefined,

}, {
  prefix: 'milestones',
});

const reducer = handleActions(
  new Map([
    [actions.getIndicatorGroupsRequest, handlers.getIndicatorGroupsRequest],
    [actions.getIndicatorGroupsSuccess, handlers.getIndicatorGroupsSuccess],
    [actions.getIndicatorGroupsFailure, handlers.getIndicatorGroupsFailure],

    [actions.getResponsiblePartiesRequest, handlers.getResponsiblePartiesRequest],
    [actions.getResponsiblePartiesSuccess, handlers.getResponsiblePartiesSuccess],
    [actions.getResponsiblePartiesFailure, handlers.getResponsiblePartiesFailure],

    [actions.getMilestonesRequest, handlers.getMilestonesRequest],
    [actions.getMilestonesSuccess, handlers.getMilestonesSuccess],
    [actions.getMilestonesFailure, handlers.getMilestonesFailure],

    [actions.getMilestonesGraphRequest, handlers.getMilestonesGraphRequest],
    [actions.getMilestonesGraphSuccess, handlers.getMilestonesGraphSuccess],
    [actions.getMilestonesGraphFailure, handlers.getMilestonesGraphFailure],

    [actions.getUpcomingMilestonesRequest, handlers.getUpcomingMilestonesRequest],
    [actions.getUpcomingMilestonesSuccess, handlers.getUpcomingMilestonesSuccess],
    [actions.getUpcomingMilestonesFailure, handlers.getUpcomingMilestonesFailure],

    [actions.createMilestoneRequest, handlers.createMilestoneRequest],
    [actions.createMilestoneSuccess, handlers.createMilestoneSuccess],
    [actions.createMilestoneFailure, handlers.createMilestoneFailure],

    [actions.deleteMilestoneRequest, handlers.deleteMilestoneRequest],
    [actions.deleteMilestoneSuccess, handlers.deleteMilestoneSuccess],
    [actions.deleteMilestoneFailure, handlers.deleteMilestoneFailure],

    [actions.updateMilestoneRequest, handlers.updateMilestoneRequest],
    [actions.updateMilestoneSuccess, handlers.updateMilestoneSuccess],
    [actions.updateMilestoneFailure, handlers.updateMilestoneFailure],

    [actions.openAddEditModal, handlers.openAddEditModal],
    [actions.closeAddEditModal, handlers.closeAddEditModal],

    [actions.resetToInitialState, handlers.resetToInitialState],

  ]),
  initialState,
);

export default reducer;
