import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isLoading: false,
  isImportModalOpen: false,
  isFormDisabled: false,
  indicator: {},
  successMessage: '',
  error: '',
};

export const importIndicatorDataRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const importIndicatorDataSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isImportModalOpen: false,
  isFormDisabled: false,
  indicator: {},
  successMessage: payload,
});

export const importIndicatorDataFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
  error: getErrorMessage(payload),
});

export const openImportModalState = (state, { payload }) => ({
  ...state,
  isImportModalOpen: true,
  indicator: payload.indicator,
});

export const closeImportModalState = (state) => ({
  ...state,
  isImportModalOpen: false,
  indicator: {},
  error: '',
});

export default initialState;
