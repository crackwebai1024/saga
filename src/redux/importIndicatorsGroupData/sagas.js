import { takeEvery, call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpIndicatorsGroups from 'http/indicatorsGroups';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';
import { actions as countryTypes } from '../country/index';

function* onImportIndicatorsGroupData({ payload }) {
  try {
    yield call(httpIndicatorsGroups.updateData, payload);
    const successMessage = i18n.t('manageDashboard.groups_statistic_changed');
    yield put(types.importIndicatorsGroupDataSuccess(successMessage));
    yield put(types.closeImportIndicatorsGroupModalState());
    yield put(countryTypes.updateDetailsWithIndicatorGroup(payload));
    AmplitudeService.logEvent('Import', {
      subject: 'Indicators Group Data',
      groupId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.importIndicatorsGroupDataFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on import indicator group data' });
  }
}

function* onDeleteIndicatorsGroupData({ payload }) {
  try {
    yield call(httpIndicatorsGroups.deleteData, payload);
    const successMessage = i18n.t('manageDashboard.groups_statistic_deleted');
    yield put(types.deleteIndicatorsGroupDataSuccess(successMessage));
    yield put(countryTypes.updateDetailsWithIndicatorGroup(payload));
    AmplitudeService.logEvent('Delete', {
      subject: 'Indicators Group Data',
      groupId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteIndicatorsGroupDataFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on delete indicator group data' });
  }
}

const indicatorsGroupDataImportSagas = [
  takeEvery(types.importIndicatorsGroupDataRequest, onImportIndicatorsGroupData),
  takeEvery(types.deleteIndicatorsGroupDataRequest, onDeleteIndicatorsGroupData),
];

export default indicatorsGroupDataImportSagas;
