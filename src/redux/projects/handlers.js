import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  projects: [],
  isLoading: false,
  isModalOpen: false,
  isFormDisabled: false,
  successMessage: '',
  error: '',
};

export const setProjectModalState = (state, { payload }) => ({
  ...state,
  isModalOpen: payload,
});

export const getAllProjects = (state) => ({
  ...state,
  isLoading: true,
});

export const getAllProjectsSuccess = (state, { payload }) => ({
  ...state,
  projects: payload,
  isLoading: false,
});

export const getAllProjectsFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const createProjectRequest = (state) => ({
  ...state,
  isFormDisabled: true,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const createProjectSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isFormDisabled: false,
  isModalOpen: false,
  isLoading: false,
});

export const createProjectFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isFormDisabled: false,
  isLoading: false,
});

export const deleteProjectRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const deleteProjectSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isLoading: false,
});

export const deleteProjectFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const updateProjectRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isFormDisabled: true,
  isLoading: true,
});

export const updateProjectSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isModalOpen: false,
  isFormDisabled: false,
  isLoading: false,
});

export const updateProjectFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isFormDisabled: false,
  isLoading: false,
});

export default initialState;
