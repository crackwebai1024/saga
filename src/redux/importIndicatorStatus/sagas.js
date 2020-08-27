import { takeEvery, call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpIndicators from 'http/indicators';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';
import { actions as countryTypes } from '../country/index';

function* onImportIndicatorStatus({ payload }) {
  try {
    const successMessage = i18n.t('manageDashboard.indicators_status_changed');
    if (payload.status !== undefined) {
      yield call(httpIndicators.updateStatus, payload);
    }
    if (payload.note || payload.highlights !== undefined || payload.lowlights !== undefined
      || payload.highlightsTitle !== undefined || payload.lowlightsTitle !== undefined) {
      yield call(httpIndicators.updateNotes, payload);
    }
    yield put(types.importIndicatorStatusSuccess(successMessage));
    yield put(types.closeImportStatusModalState());
    yield put(countryTypes.fetchCountryRequest({
      slug: payload.countrySlug,
      year: payload.year,
    }));
    yield put(countryTypes.fetchProjectDashboardRequest());
    AmplitudeService.logEvent('Import', {
      subject: 'Indicator Status',
      indicatorId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.importIndicatorStatusFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to import indicator status' });
  }
}

const indicatorImportStatusSagas = [
  takeEvery(types.importIndicatorStatusRequest, onImportIndicatorStatus),
];

export default indicatorImportStatusSagas;
