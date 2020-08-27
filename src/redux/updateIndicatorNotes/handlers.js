import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isLoading: false,
  isIndicatorNotesModalOpen: false,
  isEditableMode: false,
  indicator: {},
  successMessage: '',
  error: '',
};

export const updateIndicatorNotesRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const updateIndicatorNotesSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isEditableMode: false,
  isIndicatorNotesModalOpen: false,
  indicator: {},
  successMessage: payload.successMessage,
});

export const updateIndicatorNotesFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const openIndicatorNotesModalState = (state, { payload }) => ({
  ...state,
  isIndicatorNotesModalOpen: true,
  indicator: payload.indicator,
});

export const closeIndicatorNotesModalState = (state) => ({
  ...state,
  isIndicatorNotesModalOpen: false,
  indicator: {},
  isEditableMode: false,
  error: '',
});

export const switchToEditableMode = (state) => ({
  ...state,
  isEditableMode: true,
});

export default initialState;
