import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  customFieldsWithIds: null,
  isLoading: false,
  isFormDisabled: false,
  isIndicatorSettingsModalOpen: false,
  colors: [],
  data: {},
  successMessage: '',
  error: '',
};

export const getIndicatorRequest = (state) => ({
  ...state,
  isLoading: true,
  error: '',
});

export const getIndicatorSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  data: payload,
});

export const getIndicatorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateIndicatorDataRequest = (state) => ({
  ...state,
  isUpdateLoading: true,
  error: '',
  successMessage: '',
});

export const updateIndicatorDataSuccess = (state) => ({
  ...state,
  isUpdateLoading: false,
  successMessage: 'Data updated successfully',
  error: '',
});

export const updateIndicatorDataFailure = (state, { payload }) => ({
  ...state,
  isUpdateLoading: false,
  successMessage: '',
  error: payload,
});

export const createIndicatorRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const createIndicatorSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
});

export const createIndicatorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const updateIndicatorRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateIndicatorSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
});

export const updateIndicatorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const deleteIndicatorRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const deleteIndicatorSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
});

export const deleteIndicatorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateIndicatorSettingsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const getCustomFieldsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateCustomFieldsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateIndicatorSettingsSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isIndicatorSettingsModalOpen: false,
  isFormDisabled: false,
});

export const getCustomFieldsSuccess = (state, { payload }) => ({
  ...state,
  customFieldsWithIds: payload,
  isLoading: false,
  isFormDisabled: false,
});

export const updateCustomFieldsSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  // isIndicatorSettingsModalOpen: true,
  isFormDisabled: false,
});

export const updateIndicatorSettingsFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const getCustomFieldsFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const updateCustomFieldsFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const updateIndicatorOrderRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const updateIndicatorOrderSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
});

export const updateIndicatorOrderFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getIndicatorColorsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const getIndicatorColorsSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  colors: payload,
});

export const getIndicatorColorsFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const createIndicatorColorRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const createIndicatorColorSuccess = (state) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
});

export const createIndicatorColorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const updateIndicatorColorRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const updateIndicatorColorSuccess = (state) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
});

export const updateIndicatorColorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const deleteIndicatorColorRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const deleteIndicatorColorSuccess = (state) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
});

export const deleteIndicatorColorFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const setIndicatorSettingsModalState = (state, { payload }) => ({
  ...state,
  isIndicatorSettingsModalOpen: payload,
});

export default initialState;
