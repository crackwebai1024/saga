import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  isAuthenticated: false,
  error: '',
  user: {},
  isAuthenticatedLoading: true,
  keepSignIn: false,
  isLoading: false,
  isAdmin: false,
  loginError: '',
  isLoginLoading: false,
  registered: false,
  registerError: '',
  isRegisterLoading: false,
};

export const authenticateRequest = (state) => ({
  ...state,
  isAuthenticated: false,
  loginError: initialState.error,
  isLoginLoading: true,
});

export const authenticateSuccess = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  user: payload.user,
  isAdmin: payload.user.role === 'admin' || payload.user.role === 'super_admin',
  isLoginLoading: false,
});

export const authenticateFailure = (state, { payload }) => ({
  ...state,
  isAuthenticated: false,
  loginError: getErrorMessage(payload),
  isLoginLoading: false,
  isLoading: false,
});

export const isAuthenticatedRequest = (state) => ({ ...state, isAuthenticatedLoading: true });

export const isAuthenticatedSuccess = (state, { payload }) => ({
  ...state,
  isAuthenticated: true,
  isAdmin: payload.user.role === 'admin' || payload.user.role === 'super_admin',
  user: payload.user,
  isAuthenticatedLoading: false,
});
export const isAuthenticatedFailure = (state) => ({
  ...state,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  isLoading: false,
});

export const logoutRequest = (state) => ({ ...state, error: initialState.error, isLoading: false });

export const logoutSuccess = () => ({
  ...initialState,
  isAuthenticated: false,
  isAuthenticatedLoading: false,
  isLoading: false,
});

export const logoutFailure = (state, { payload }) => ({ ...state, error: getErrorMessage(payload), isLoading: false });

export const resetLoginError = (state) => ({ ...state, loginError: initialState.loginError, isLoading: false });

export default initialState;
