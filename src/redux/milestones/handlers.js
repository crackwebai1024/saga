import getErrorMessage from 'helpers/getErrorMessage';
import getIsSystemIndicatorsGroups from 'helpers/getIsSystemIndicatorsGroups';

const initialState = {
  indicatorGroups: [],
  responsibleParties: [],
  isLoading: false,
  isModalOpen: false,
  isMilestonesLoading: false,
  selectedMilestoneId: null,
  milestones: null,
  milestone: {},
  filters: {},
  error: '',
  successMessage: '',
  graphData: [],
  isGraphLoading: true,
  upcoming: [],
  isUpcomingLoading: true,
};

export const getIndicatorGroupsRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getIndicatorGroupsSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  indicatorGroups: getIsSystemIndicatorsGroups(payload),
});

export const getIndicatorGroupsFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getResponsiblePartiesRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getResponsiblePartiesSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  responsibleParties: payload,
});

export const getResponsiblePartiesFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getMilestonesRequest = (state) => ({
  ...state,
  isMilestonesLoading: true,
  milestones: null,
});

export const getMilestonesSuccess = (state, { payload }) => ({
  ...state,
  isMilestonesLoading: false,
  milestones: payload,
});

export const getMilestonesFailure = (state, { payload }) => ({
  ...state,
  isMilestonesLoading: false,
  error: getErrorMessage(payload),
});

export const getMilestonesGraphRequest = (state) => ({
  ...state,
  graphData: [],
  isGraphLoading: true,
});

export const getMilestonesGraphSuccess = (state, { payload }) => ({
  ...state,
  graphData: payload,
  isGraphLoading: false,
});

export const getMilestonesGraphFailure = (state, { payload }) => ({
  ...state,
  isGraphLoading: false,
  error: getErrorMessage(payload),
});

export const getUpcomingMilestonesRequest = (state) => ({
  ...state,
  upcoming: [],
  isUpcommingLoading: true,
});

export const getUpcomingMilestonesSuccess = (state, { payload }) => ({
  ...state,
  upcoming: payload,
  isUpcommingLoading: false,
});

export const getUpcomingMilestonesFailure = (state, { payload }) => ({
  ...state,
  isUpcommingLoading: false,
  error: getErrorMessage(payload),
});

export const createMilestoneRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
});

export const createMilestoneSuccess = (state) => ({
  ...state,
  isLoading: false,
  milestone: {},
  isModalOpen: false,
  successMessage: 'Milestone created succesfuly',
});

export const createMilestoneFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const deleteMilestoneRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
});

export const deleteMilestoneSuccess = (state) => ({
  ...state,
  isLoading: false,
  successMessage: 'Milestone deleted succesfuly',
});

export const deleteMilestoneFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateMilestoneRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
});

export const updateMilestoneSuccess = (state) => ({
  ...state,
  milestone: {},
  isLoading: false,
  isModalOpen: false,
  successMessage: 'Milestone updated succesfuly',
});

export const updateMilestoneFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const openAddEditModal = (state, { payload }) => ({
  ...state,
  milestone: payload,
  isModalOpen: true,
});

export const closeAddEditModal = (state) => ({
  ...state,
  milestone: {},
  isModalOpen: false,
});

export const resetToInitialState = () => ({
  ...initialState,
});

export default initialState;
