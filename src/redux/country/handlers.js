import getErrorMessage from 'helpers/getErrorMessage';
import update from 'immutability-helper';

const initialState = {
  details: null,
  targets: null,
  selectedProject: null,
  projects: [],
  isLoading: false,
  isFormDisabled: false,
  isModalOpen: false,
  successMessage: '',
  error: '',
};

export const fetchCountryRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const fetchCountrySuccess = (state, {
  payload: {
    dashboard,
    country,
    projects,
    selectedProject,
  },
}) => ({
  ...state,
  details: dashboard || state.details,
  country,
  projects,
  selectedProject: selectedProject || null,
  isLoading: false,
});

export const onProjectChangeRequest = (state, { payload }) => ({
  ...state,
  isLoading: true,
  selectedProject: payload,
});

export const fetchProjectDashboardRequest = (state) => ({
  ...state,
  isLoading: false,
});

export const fetchProjectDashboardSuccess = (state, { payload }) => ({
  ...state,
  details: payload,
  isLoading: false,
});

export const fetchProjectDashboardFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const fetchCountryFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const updateDetailsWithIndicatorGroup = (state, { payload }) => {
  let sectionIndex;
  let groupIndex;
  const indicatorGroupData = {
    year: payload.year,
    status: payload.status,
    value: payload.value,
    valueType: payload.valueType,
    groupTarget: payload.groupTarget,
  };

  state.details.sections.forEach((section, sectionCurrentIndex) => {
    section.indicatorGroups.forEach((group, groupCurrentIndex) => {
      if (group.id === payload.id) {
        sectionIndex = sectionCurrentIndex;
        groupIndex = groupCurrentIndex;
      }
    });
  });

  const newDetails = update(state.details, {
    sections: {
      [sectionIndex]: {
        indicatorGroups: {
          [groupIndex]: {
            $merge: indicatorGroupData,
          },
        },
      },
    },
  });

  return {
    ...state,
    details: newDetails,
  };
};

export const fetchTargetsRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const fetchTargetsSuccess = (state, { payload }) => ({
  ...state,
  targets: payload,
  isLoading: false,
});

export const fetchTargetsFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const registerTargetRequest = (state) => ({
  ...state,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const registerTargetSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isFormDisabled: false,
  isModalOpen: false,
});

export const registerTargetFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isFormDisabled: false,
  isLoading: false,
});

export const deleteTargetRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
});

export const deleteTargetSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
});

export const deleteTargetFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const updateTargetRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateTargetSuccess = (state, { payload }) => ({
  ...state,
  isFormDisabled: false,
  successMessage: payload,
  isModalOpen: false,
});

export const updateTargetFailure = (state, { payload }) => ({
  ...state,
  isFormDisabled: false,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const targetSetModalState = (state, { payload }) => ({ ...state, isModalOpen: payload });

export const resetToInitialState = () => ({ ...initialState });

export default initialState;
