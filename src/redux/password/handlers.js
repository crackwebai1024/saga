import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  error: '',
  isLoading: false,
  isForgotPasswordSubmitted: false,
  isResetPasswordSubmitted: false,
};

export const forgotPasswordRequest = (state) => ({
  ...state,
  isLoading: true,
  isForgotPasswordSubmitted: initialState.isForgotPasswordSubmitted,
});
export const forgotPasswordSuccess = (state) => ({
  ...state,
  isLoading: false,
  isForgotPasswordSubmitted: true,
});
export const forgotPasswordFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isForgotPasswordSubmitted: false,
  error: getErrorMessage(payload),
});

export const resetPasswordRequest = (state) => ({
  ...state,
  isLoading: true,
  isResetPasswordSubmitted: initialState.isResetPasswordSubmitted,
});
export const resetPasswordSuccess = (state) => ({
  ...state,
  isLoading: false,
  isResetPasswordSubmitted: true,
});
export const resetPasswordFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const resetToInitialState = () => ({ ...initialState });

export default initialState;
