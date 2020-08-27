import { takeEvery, call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpIndicators from 'http/indicators';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';
import { actions as countryTypes } from '../country/index';

function* onUpdateIndicatorNotesRequest({ payload }) {
  try {
    const successMessage = i18n.t('manageDashboard.indicators_notes_changed');

    yield call(httpIndicators.updateNotes, payload);
    yield put(types.updateIndicatorNotesSuccess({ successMessage, updatedIndicator: payload }));
    yield put(countryTypes.fetchCountryRequest({
      slug: payload.countrySlug,
      year: payload.requestedYear,
    }));
    AmplitudeService.logEvent('Update', {
      subject: 'Indicator',
      countryId: payload.countryId,
      projectId: payload.projectId,
      sectionId: payload.sectionId,
      indicatorId: payload.id,
      indicatorTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorNotesFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator' });
  }
}

const indicatorNotesUpdateSagas = [
  takeEvery(types.updateIndicatorNotesRequest, onUpdateIndicatorNotesRequest),
];

export default indicatorNotesUpdateSagas;
