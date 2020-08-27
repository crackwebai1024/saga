import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  sections: [],
  isLoading: false,
  isModalOpen: false,
  isIndicatorOrGroupModalOpen: false,
  isIndicatorOrGroupEditModalOpen: false,
  isFormDisabled: false,
  successMessage: '',
  error: '',
};

export const setSectionModalState = (state, { payload }) => ({
  ...state,
  isModalOpen: payload,
});

export const getFullStructureRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getFullStructureSuccess = (state, { payload }) => ({
  ...state,
  sections: payload,
  isLoading: false,
});

export const getFullStructureFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const createSectionRequest = (state) => ({
  ...state,
  isFormDisabled: true,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const createSectionSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isFormDisabled: false,
  isModalOpen: false,
  isLoading: false,
});

export const createSectionFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isFormDisabled: false,
  isLoading: false,
});

export const deleteSectionRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const deleteSectionSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isLoading: false,
});

export const deleteSectionFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const updateSectionRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isFormDisabled: true,
  isLoading: true,
});

export const updateSectionSuccess = (state, { payload }) => ({
  ...state,
  successMessage: payload,
  isModalOpen: false,
  isFormDisabled: false,
  isLoading: false,
});

export const updateSectionFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isFormDisabled: false,
  isLoading: false,
});

export const updateSectionOrderRequest = (state) => ({
  ...state,
  successMessage: '',
  error: '',
  isLoading: true,
});

export const updateSectionOrderFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const updateLocalSectionOrder = (state, { payload }) => ({
  ...state,
  sections: payload,
});

export const updateLocalIndicatorsGroupOrder = (state, { payload }) => ({
  ...state,
  sections: payload,
});

export const updateLocalIndicatorOrder = (state, { payload }) => ({
  ...state,
  sections: payload,
});

export const setIndicatorOrGroupModalState = (state, { payload }) => ({
  ...state,
  isIndicatorOrGroupModalOpen: payload,
});

export const setIndicatorOrGroupEditModalState = (state, { payload }) => ({
  ...state,
  isIndicatorOrGroupEditModalOpen: payload,
});

export default initialState;
