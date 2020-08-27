import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isLoading: false,
  isImportModalOpen: false,
  isFormDisabled: false,
  indicatorsGroup: {},
  successMessage: '',
  error: '',
};

export const importIndicatorsGroupDataRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const importIndicatorsGroupDataSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isImportModalOpen: false,
  isFormDisabled: false,
  indicatorsGroup: {},
  successMessage: payload,
});

export const importIndicatorsGroupDataFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
  error: getErrorMessage(payload),
});

export const deleteIndicatorsGroupDataRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const deleteIndicatorsGroupDataSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isImportModalOpen: false,
  isFormDisabled: false,
  indicatorsGroup: {},
  successMessage: payload,
});

export const deleteIndicatorsGroupDataFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isFormDisabled: false,
  error: getErrorMessage(payload),
});

export const openImportIndicatorsGroupModalState = (state, { payload }) => ({
  ...state,
  isImportModalOpen: true,
  indicatorsGroup: payload,
});

export const closeImportIndicatorsGroupModalState = (state) => ({
  ...state,
  isImportModalOpen: false,
  indicatorsGroup: {},
  error: '',
});

export default initialState;
