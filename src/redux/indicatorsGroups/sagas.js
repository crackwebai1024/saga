import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpIndicatorsGroup from 'http/indicatorsGroups';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';
import { actions as sectionTypes } from '../sections/index';

function* onCreateIndicatorsGroup({ payload }) {
  try {
    yield call(httpIndicatorsGroup.create, payload);
    const successMessage = i18n.t('manageDashboard.indicators_group_has_been_successfully_created');
    yield put(types.createIndicatorsGroupSuccess(successMessage));
    yield put(sectionTypes.setIndicatorOrGroupModalState(false));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Create', {
      subject: 'Indicators Group',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      groupId: payload.id,
      groupTitle: payload.indicatorsGroup.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createIndicatorsGroupFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to create indicators group' });
  }
}

function* onDeleteIndicatorsGroup({ payload }) {
  try {
    yield call(httpIndicatorsGroup.remove, payload);
    const successMessage = payload.isPseudoGroup
      ? i18n.t('manageDashboard.indicator_has_been_successfully_deleted')
      : i18n.t('manageDashboard.indicators_group_has_been_successfully_deleted');
    yield put(types.deleteIndicatorsGroupSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Delete', {
      subject: 'Indicators Group',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      groupId: payload.id,
      groupTitle: payload.indicatorsGroup.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteIndicatorsGroupFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to delete indicators group' });
  }
}

function* onUpdateIndicatorsGroup({ payload }) {
  try {
    yield call(httpIndicatorsGroup.update, payload);
    const successMessage = i18n.t('manageDashboard.indicators_group_has_been_successfully_updated');
    yield put(types.updateIndicatorsGroupSuccess(successMessage));
    yield put(sectionTypes.setIndicatorOrGroupEditModalState(false));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Indicators Group',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      groupId: payload.id,
      groupTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorsGroupFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicators group' });
  }
}

function* onUpdateIndicatorsGroupOrder({ payload }) {
  try {
    yield call(httpIndicatorsGroup.updateOrder, payload);
    const successMessage = i18n.t('manageDashboard.order_has_been_successfully_updated');
    yield put(types.updateIndicatorsGroupOrderSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Order of Indicators Group',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      groupId: payload.indicatorsGroupId,
      groupTitle: payload.title,
      // id: id?
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorsGroupOrderFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicators group order' });
  }
}

const indicatorsGroupSagas = [
  takeEvery(types.createIndicatorsGroupRequest, onCreateIndicatorsGroup),
  takeEvery(types.deleteIndicatorsGroupRequest, onDeleteIndicatorsGroup),
  takeEvery(types.updateIndicatorsGroupRequest, onUpdateIndicatorsGroup),
  takeEvery(types.updateIndicatorsGroupOrderRequest, onUpdateIndicatorsGroupOrder),
];

export default indicatorsGroupSagas;
