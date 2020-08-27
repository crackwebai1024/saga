import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  usersList: [],
  hasAllCitiesAccess: false,
  isLoading: false,
  isFormDisabled: false,
  isImporting: false,
  isModalOpen: false,
  successMessage: '',
  count: 0,
  error: '',
};

export const userSetModalState = (state, { payload }) => ({ ...state, isModalOpen: payload });

export const getUsersRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getUsersSuccess = (state, { payload }) => ({
  ...state,
  usersList: payload.items,
  count: payload.count,
  hasAllCitiesAccess: payload.hasAllCitiesAccess,
  isLoading: false,
});

export const getUsersFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const registerUserRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const registerUserSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
  isModalOpen: false,
});

export const registerUserFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const deleteUserRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const deleteUserSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
});

export const deleteUserFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateUserRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateUserSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
  successMessage: payload,
  isModalOpen: false,
});

export const updateUserFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
  error: getErrorMessage(payload),
});

export default initialState;
