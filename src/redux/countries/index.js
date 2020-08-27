import { handleActions, createActions } from 'redux-actions';
import initialState, * as handlers from './handlers';

export const actions = createActions({
  GET_COUNTRIES_REQUEST: undefined,
  GET_COUNTRIES_SUCCESS: undefined,
  GET_COUNTRIES_FAILURE: undefined,

  GET_FORM_COUNTRIES_REQUEST: undefined,
  GET_FORM_COUNTRIES_SUCCESS: undefined,
  GET_FORM_COUNTRIES_FAILURE: undefined,

  GET_ALLOWED_COUNTRIES_REQUEST: undefined,
  GET_ALLOWED_COUNTRIES_SUCCESS: undefined,
  GET_ALLOWED_COUNTRIES_FAILURE: undefined,

  GET_WORLD_COUNTRIES_REQUEST: undefined,
  GET_WORLD_COUNTRIES_SUCCESS: undefined,
  GET_WORLD_COUNTRIES_FAILURE: undefined,

  CLEAN_FORM_COUNTRIES: undefined,

  CREATE_COUNTRY_REQUEST: undefined,
  CREATE_COUNTRY_SUCCESS: undefined,
  CREATE_COUNTRY_FAILURE: undefined,

  DELETE_COUNTRY_REQUEST: undefined,
  DELETE_COUNTRY_SUCCESS: undefined,
  DELETE_COUNTRY_FAILURE: undefined,

  UPDATE_COUNTRY_REQUEST: undefined,
  UPDATE_COUNTRY_SUCCESS: undefined,
  UPDATE_COUNTRY_FAILURE: undefined,

  COUNTRY_SET_MODAL_STATE: undefined,
  SET_SELECTED_COUNTRY_ID: undefined,
});

const reducer = handleActions(
  new Map([
    [actions.getCountriesRequest, handlers.getCountriesRequest],
    [actions.getCountriesSuccess, handlers.getCountriesSuccess],
    [actions.getCountriesFailure, handlers.getCountriesFailure],

    [actions.getFormCountriesRequest, handlers.getFormCountriesRequest],
    [actions.getFormCountriesSuccess, handlers.getFormCountriesSuccess],
    [actions.getFormCountriesFailure, handlers.getFormCountriesFailure],
    [actions.getAllowedCountriesRequest, handlers.getAllowedCountriesRequest],
    [actions.getAllowedCountriesSuccess, handlers.getAllowedCountriesSuccess],
    [actions.getAllowedCountriesFailure, handlers.getAllowedCountriesFailure],

    [actions.getWorldCountriesRequest, handlers.getWorldCountriesRequest],
    [actions.getWorldCountriesSuccess, handlers.getWorldCountriesSuccess],
    [actions.getWorldCountriesFailure, handlers.getWorldCountriesFailure],

    [actions.cleanFormCountries, handlers.cleanFormCountries],

    [actions.createCountryRequest, handlers.createCountryRequest],
    [actions.createCountrySuccess, handlers.createCountrySuccess],
    [actions.createCountryFailure, handlers.createCountryFailure],

    [actions.deleteCountryRequest, handlers.deleteCountryRequest],
    [actions.deleteCountrySuccess, handlers.deleteCountrySuccess],
    [actions.deleteCountryFailure, handlers.deleteCountryFailure],

    [actions.updateCountryRequest, handlers.updateCountryRequest],
    [actions.updateCountrySuccess, handlers.updateCountrySuccess],
    [actions.updateCountryFailure, handlers.updateCountryFailure],

    [actions.countrySetModalState, handlers.countrySetModalState],
    [actions.setSelectedCountryId, handlers.setSelectedCountryId],
  ]),
  initialState,
);

export default reducer;
