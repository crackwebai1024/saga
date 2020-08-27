import { call, put, takeEvery } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import AmplitudeService from 'services/amplitude';
import { deleteUser } from 'services/storage/auth';

import * as httpAuth from 'http/auth';

import { getCurrentYear } from 'helpers/getYears';
import { actions as types } from './index';
import { actions as typesGlobal } from '../global';
import { actions as typesIndicatorData } from '../indicatorDetails';
import { actions as typesApp } from '../app';
import { actions as typesCountries } from '../countries';
import { actions as typesUsers } from '../users';
import { actions as typesSections } from '../sections';
import { actions as typesCountry } from '../country';
import { actions as typesIndicators } from '../indicators';
import { actions as typesImportIndicatorData } from '../importIndicatorData';
import { actions as typesImportIndicatorsGroupData } from '../importIndicatorsGroupData';
import { isAuthenticatedFailureIgroredPathsInclude } from './helpers';

function* onAuthenticate({ payload }) {
  try {
    const params = { ...payload, email: payload.email.trim() };
    const data = yield call(httpAuth.authenticate, params);
    yield put(types.authenticateSuccess(data));
    AmplitudeService.setUser(data.user);
    AmplitudeService.logEvent('User has been authenticated', { role: data.user.role });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.authenticateFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to authenticate' });
  }
}

function* onIsAuthenticated() {
  try {
    const { user } = yield call(httpAuth.isAuthenticated);

    yield put(types.isAuthenticatedSuccess({ user }));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.isAuthenticatedFailure(error));
  }
}

function* onLogout() {
  try {
    yield call(deleteUser);
    yield call(httpAuth.logout);
    yield put(types.logoutSuccess());
    AmplitudeService.setUser();
    yield put(typesGlobal.setSelectedPeriod(getCurrentYear()));
    yield put(typesIndicatorData.setIndicatorDetailsReportingFilter({ year: getCurrentYear() }));
    yield put(typesGlobal.setSelectedPeriod(getCurrentYear()));
    yield put(typesApp.setConfirmModalState(false));
    yield put(typesCountries.countrySetModalState(false));
    yield put(typesUsers.userSetModalState(false));
    yield put(typesSections.setSectionModalState(false));
    yield put(typesSections.setSectionModalState(false));
    yield put(typesIndicators.setIndicatorSettingsModalState(false));
    yield put(typesCountry.targetSetModalState(false));
    yield put(typesImportIndicatorData.closeImportModalState(false));
    yield put(typesImportIndicatorsGroupData.closeImportIndicatorsGroupModalState(false));
    AmplitudeService.logEvent('User has been logged out');
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.logoutFailure(error.response.data));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to logout' });
  }
}

function* checkAuthorization({ payload }) {
  const shouldSkip = isAuthenticatedFailureIgroredPathsInclude(window.location.pathname);

  if (!shouldSkip) {
    const error = (payload && payload.error) || payload;
    if ((error && error.response && error.response.status === 401) || error.message === 'Unauthorized') {
      yield* onLogout();
    }
  }
}

const authSagas = [
  takeEvery(types.authenticateRequest, onAuthenticate),
  takeEvery(types.isAuthenticatedRequest, onIsAuthenticated),
  takeEvery(types.logoutRequest, onLogout),
];

export function* watchUnauthorized() {
  yield takeEvery((action) => /FAILURE/.test(action.type), checkAuthorization);
}
export default authSagas;
