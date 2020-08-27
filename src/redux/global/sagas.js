import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import * as httpGlobal from 'http/global';
import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';
import { actions as themeTypes } from '../theme/index';
import { actions as countryTypes } from '../country/index';
import { colorOptions } from '../../theme';

function* onGetGlobalCountries({ payload }) {
  try {
    const data = yield call(httpGlobal.getCountries, payload);

    yield put(types.getGlobalCountriesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getGlobalCountriesFailure({ message: error.response.data }));
  }
}

function* onGetGlobalProjects({ payload }) {
  try {
    const data = yield call(httpGlobal.getProjects, { country: payload });

    yield put(types.getGlobalProjectsSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getGlobalProjectsFailure({ message: error.response.data }));
  }
}

function* onGetGlobalSections({ payload }) {
  try {
    const data = yield call(httpGlobal.getSections, { project: payload });

    yield put(types.getGlobalSectionsSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getGlobalSectionsFailure({ message: error.response.data }));
  }
}

function* onGetMapData({ payload }) {
  try {
    const data = yield call(httpGlobal.getMapData, payload);
    yield put(types.getMapDataSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Global Dashboard: Map Tab',
      selectedCountryId: payload.country || 'all',
      selectedSectionId: payload.section || 'all',
      selectedReportingPeriod: payload.year,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getMapDataFailure({ message: error.response.data }));
  }
}

function* onGetStatusData({ payload }) {
  try {
    const data = yield call(httpGlobal.getStatusData, payload);
    yield put(types.getStatusDataSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Global Dashboard: Status Tab',
      selectedCountryId: payload.country || 'all',
      selectedSectionId: payload.section || 'all',
      selectedReportingPeriod: payload.year,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getStatusDataFailure({ message: error.response.data }));
  }
}

function* onGetGlobalListData({ payload }) {
  try {
    const data = yield call(httpGlobal.getListData, payload);
    yield put(types.getGlobalListDataSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Global Dashboard: List Tab',
      selectedCountryId: payload.country || 'all',
      selectedSectionId: payload.section || 'all',
      selectedReportingPeriod: payload.year,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getGlobalListDataFailure(error));
  }
}

function* onGetGlobalStatistic() {
  try {
    const data = yield call(httpGlobal.getStatistic);
    yield put(types.getGlobalStatisticSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getGlobalStatisticFailure(error));
  }
}

function* onSetGlobalTheme() {
  try {
    yield put(themeTypes.setTheme(colorOptions.Global));
    yield put(countryTypes.resetToInitialState());
  } catch (error) {
    Sentry.captureException(error);
  }
}

const globalSagas = [
  takeEvery(types.getGlobalCountriesRequest, onGetGlobalCountries),
  takeEvery(types.getGlobalProjectsRequest, onGetGlobalProjects),
  takeEvery(types.getGlobalSectionsRequest, onGetGlobalSections),
  takeEvery(types.getMapDataRequest, onGetMapData),
  takeEvery(types.getStatusDataRequest, onGetStatusData),
  takeEvery(types.getGlobalListDataRequest, onGetGlobalListData),
  takeEvery(types.getGlobalStatisticRequest, onGetGlobalStatistic),
  takeEvery(types.setGlobalTheme, onSetGlobalTheme),
];

export default globalSagas;
