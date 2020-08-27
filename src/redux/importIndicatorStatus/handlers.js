import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isLoading: false,
  isImportStatusModalOpen: false,
  indicator: {},
  successMessage: '',
  error: '',
};

export const importIndicatorStatusRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const importIndicatorStatusSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isImportStatusModalOpen: false,
  indicator: {},
  successMessage: payload,
});

export const importIndicatorStatusFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const openImportStatusModalState = (state, { payload }) => ({
  ...state,
  isImportStatusModalOpen: true,
  indicator: payload.indicator,
});

export const closeImportStatusModalState = (state) => ({
  ...state,
  isImportStatusModalOpen: false,
  indicator: {},
  error: '',
});

export default initialState;
