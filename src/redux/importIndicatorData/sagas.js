import { takeEvery, call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpTemplates from 'http/templates';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';
import { actions as countryTypes } from '../country/index';

function* onImportIndicatorData({ payload }) {
  try {
    yield call(httpTemplates.importIndicatorData, payload);
    const successMessage = i18n.t('manageDashboard.indicators_statistic_imported');
    yield put(types.importIndicatorDataSuccess(successMessage));
    yield put(types.closeImportModalState());
    yield put(countryTypes.fetchCountryRequest({
      slug: payload.countrySlug,
      year: payload.requestedYear,
    }));
    AmplitudeService.logEvent('Import', {
      subject: 'Indicator Data',
      indicatorId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.importIndicatorDataFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to import indicator data' });
  }
}

const indicatorImportSagas = [
  takeEvery(types.importIndicatorDataRequest, onImportIndicatorData),
];

export default indicatorImportSagas;
