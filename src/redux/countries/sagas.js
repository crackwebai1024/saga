import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpCountries from 'http/countries';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';

function* onGetCountries({ payload }) {
  try {
    const data = yield call(httpCountries.getPageList, { ...payload });

    yield put(types.getCountriesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getCountriesFailure({ message: error.response.data }));
  }
}

function* onGetWorldCountries() {
  try {
    const data = yield call(httpCountries.getWorldCountries);
    yield put(types.getWorldCountriesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getWorldCountriesFailure(error));
  }
}

function* onCreateCountry({
  payload: {
    page,
    rowsPerPage,
    orderBy,
    order,
    id,
    ...rest
  },
}) {
  try {
    const data = yield call(httpCountries.create, rest);
    const successMessage = i18n.t('admin.country_successfully_created', { data: data.name });
    yield put(types.createCountrySuccess(successMessage));
    yield put(types.getCountriesRequest({
      page,
      rowsPerPage,
      orderBy,
      order,
    }));
    AmplitudeService.logEvent('Create', { subject: 'Country', countryId: id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createCountryFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to create country' });
  }
}

function* onDeleteCountry({
  payload: {
    page,
    rowsPerPage,
    id,
    orderBy,
    order,
  },
}) {
  try {
    yield call(httpCountries.remove, id);
    const successMessage = i18n.t('admin.country_successfully_deleted');
    yield put(types.deleteCountrySuccess(successMessage));
    yield put(types.getCountriesRequest({
      page,
      rowsPerPage,
      orderBy,
      order,
    }));
    AmplitudeService.logEvent('Delete', { subject: 'Country', countryId: id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteCountryFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to delete country' });
  }
}

function* onUpdateCountry({
  payload: {
    page,
    rowsPerPage,
    orderBy,
    order,
    ...rest
  },
}) {
  try {
    yield call(httpCountries.update, rest);
    const successMessage = i18n.t('admin.country_successfully_updated');
    yield put(types.updateCountrySuccess(successMessage));
    yield put(types.getCountriesRequest({
      page,
      rowsPerPage,
      orderBy,
      order,
    }));
    AmplitudeService.logEvent('Update', { subject: 'Country', countryId: rest.id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateCountryFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update country' });
  }
}

function* onGetFormCountries() {
  try {
    const data = yield call(httpCountries.getCountriesForForm);

    yield put(types.getFormCountriesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getFormCountriesFailure({ message: error.response.data }));
  }
}

function* onGetAllowedCountries() {
  try {
    const data = yield call(httpCountries.getAllowedCountries);

    yield put(types.getAllowedCountriesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getAllowedCountriesFailure({ message: error.response.data }));
  }
}

const countriesSagas = [
  takeEvery(types.getCountriesRequest, onGetCountries),
  takeEvery(types.getWorldCountriesRequest, onGetWorldCountries),
  takeEvery(types.createCountryRequest, onCreateCountry),
  takeEvery(types.deleteCountryRequest, onDeleteCountry),
  takeEvery(types.updateCountryRequest, onUpdateCountry),
  takeEvery(types.getFormCountriesRequest, onGetFormCountries),
  takeEvery(types.getAllowedCountriesRequest, onGetAllowedCountries),
];

export default countriesSagas;
