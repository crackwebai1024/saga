import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_FULL_STRUCTURE_REQUEST: undefined,
  GET_FULL_STRUCTURE_SUCCESS: undefined,
  GET_FULL_STRUCTURE_FAILURE: undefined,

  SET_SECTION_MODAL_STATE: undefined,

  SET_INDICATOR_OR_GROUP_MODAL_STATE: undefined,

  SET_INDICATOR_OR_GROUP_EDIT_MODAL_STATE: undefined,

  CREATE_SECTION_REQUEST: undefined,
  CREATE_SECTION_SUCCESS: undefined,
  CREATE_SECTION_FAILURE: undefined,

  DELETE_SECTION_REQUEST: undefined,
  DELETE_SECTION_SUCCESS: undefined,
  DELETE_SECTION_FAILURE: undefined,

  UPDATE_SECTION_REQUEST: undefined,
  UPDATE_SECTION_SUCCESS: undefined,
  UPDATE_SECTION_FAILURE: undefined,

  UPDATE_SECTION_ORDER_REQUEST: undefined,
  UPDATE_SECTION_ORDER_FAILURE: undefined,

  UPDATE_LOCAL_SECTION_ORDER: undefined,
  UPDATE_LOCAL_INDICATORS_GROUP_ORDER: undefined,
  UPDATE_LOCAL_INDICATOR_ORDER: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getFullStructureRequest, handlers.getFullStructureRequest],
    [actions.getFullStructureSuccess, handlers.getFullStructureSuccess],
    [actions.getFullStructureFailure, handlers.getFullStructureFailure],

    [actions.setSectionModalState, handlers.setSectionModalState],

    [actions.setIndicatorOrGroupModalState, handlers.setIndicatorOrGroupModalState],

    [actions.setIndicatorOrGroupEditModalState, handlers.setIndicatorOrGroupEditModalState],

    [actions.createSectionRequest, handlers.createSectionRequest],
    [actions.createSectionSuccess, handlers.createSectionSuccess],
    [actions.createSectionFailure, handlers.createSectionFailure],

    [actions.deleteSectionRequest, handlers.deleteSectionRequest],
    [actions.deleteSectionSuccess, handlers.deleteSectionSuccess],
    [actions.deleteSectionFailure, handlers.deleteSectionFailure],

    [actions.updateSectionRequest, handlers.updateSectionRequest],
    [actions.updateSectionSuccess, handlers.updateSectionSuccess],
    [actions.updateSectionFailure, handlers.updateSectionFailure],

    [actions.updateSectionOrderRequest, handlers.updateSectionOrderRequest],
    [actions.updateSectionOrderFailure, handlers.updateSectionOrderFailure],

    [actions.updateLocalSectionOrder, handlers.updateLocalSectionOrder],
    [actions.updateLocalIndicatorsGroupOrder, handlers.updateLocalIndicatorsGroupOrder],
    [actions.updateLocalIndicatorOrder, handlers.updateLocalIndicatorOrder],
  ]),
  initialState,
);

export default reducer;
