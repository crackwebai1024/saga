import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isLoading: false,
  isFormDisabled: false,
  successMessage: '',
  error: '',
};

export const createIndicatorsGroupRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const createIndicatorsGroupSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
});

export const createIndicatorsGroupFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const deleteIndicatorsGroupRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const deleteIndicatorsGroupSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
});

export const deleteIndicatorsGroupFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateIndicatorsGroupRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateIndicatorsGroupSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
});

export const updateIndicatorsGroupFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const updateIndicatorsGroupOrderRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const updateIndicatorsGroupOrderSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isLoading: false,
});

export const updateIndicatorsGroupOrderFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export default initialState;
