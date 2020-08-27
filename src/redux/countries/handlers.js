import getErrorMessage from 'helpers/getErrorMessage';

const initialState = {
  list: [],
  allCount: 0,
  isLoading: false,
  isAllowedListLoading: false,
  isFormDisabled: false,
  isModalOpen: false,
  isWorldCountriesLoading: false,
  successMessage: '',
  error: '',
  formList: [],
  allowedList: [],
  worldCountries: [],
  selectedCountryId: null,
  hasAllCountriesAccess: false,
};

export const countrySetModalState = (state, { payload }) => ({
  ...state,
  isModalOpen: payload,
});

export const setSelectedCountryId = (state, { payload }) => ({
  ...state,
  selectedCountryId: payload,
});

export const getCountriesRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getCountriesSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  list: payload.countries,
  allCount: payload.count,
});

export const getCountriesFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const getFormCountriesRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getFormCountriesSuccess = (state, { payload }) => ({
  ...state,
  formList: payload.countries,
  hasAllCountriesAccess: payload.hasAllCountries,
  isLoading: false,
});

export const getFormCountriesFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const cleanFormCountries = (state) => ({
  ...state,
  formList: [],
});

export const getAllowedCountriesRequest = (state) => ({
  ...state,
  isAllowedListLoading: true,
});

export const getAllowedCountriesSuccess = (state, { payload }) => ({
  ...state,
  allowedList: payload.countries,
  isAllowedListLoading: false,
});

export const getAllowedCountriesFailure = (state, { payload }) => ({
  ...state,
  error: getErrorMessage(payload),
  isAllowedListLoading: false,
  isLoading: false,
});

export const getWorldCountriesRequest = (state) => ({
  ...state,
  isWorldCountriesLoading: true,
});

export const getWorldCountriesSuccess = (state, { payload }) => ({
  ...state,
  isWorldCountriesLoading: false,
  worldCountries: payload,
});

export const getWorldCountriesFailure = (state, { payload }) => ({
  ...state,
  isWorldCountriesLoading: false,
  error: getErrorMessage(payload),
  isLoading: false,
});

export const createCountryRequest = (state) => ({
  ...state,
  isLoading: true,
  isFormDisabled: true,
  successMessage: '',
  error: '',
});

export const createCountrySuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isFormDisabled: false,
  isModalOpen: false,
});

export const createCountryFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export const deleteCountryRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
});

export const deleteCountrySuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
});

export const deleteCountryFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
});

export const updateCountryRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  error: '',
  isFormDisabled: true,
});

export const updateCountrySuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  successMessage: payload,
  isModalOpen: false,
  isFormDisabled: false,
});

export const updateCountryFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  error: getErrorMessage(payload),
  isFormDisabled: false,
});

export default initialState;
