import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpIndicators from 'http/indicators';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';
import { actions as sectionTypes } from '../sections/index';

function* onGetIndicator({ payload }) {
  try {
    const data = yield call(httpIndicators.getIndicator, payload);
    yield put(types.getIndicatorSuccess(data));
    AmplitudeService.logEvent('Get', {
      country: payload.country,
      sectionId: payload.sectionId,
      indicatorId: payload.indicatorId,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to get indicator' });
  }
}

function* onUpdateIndicatorData({ payload }) {
  try {
    const data = yield call(httpIndicators.updateIndicator, payload);
    yield put(types.updateIndicatorDataSuccess(data));
    AmplitudeService.logEvent('Changed indicator data', {
      country: payload.country,
      sectionId: payload.sectionId,
      indicatorId: payload.indicatorId,
    });
  } catch (error) {
    const parsedError = (error.response.data?.error[0]?.message ? error.response.data.error : 'Something went wrong');

    Sentry.captureException(error);
    yield put(types.updateIndicatorDataFailure(parsedError));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to edit indicator data' });
  }
}

function* onCreateIndicator({ payload }) {
  try {
    const data = yield call(httpIndicators.create, payload);
    const successMessage = i18n.t('manageDashboard.indicator_has_been_successfully_created', { data: data.title });
    yield put(types.createIndicatorSuccess(successMessage));
    yield put(sectionTypes.setIndicatorOrGroupModalState(false));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Create', {
      subject: 'Indicator',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.indicator.id,
      indicatorTitle: payload.indicator.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createIndicatorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to created indicator' });
  }
}

function* onDeleteIndicator({ payload }) {
  try {
    yield call(httpIndicators.remove, payload);
    const successMessage = i18n.t('manageDashboard.indicator_has_been_successfully_deleted');
    yield put(types.deleteIndicatorSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Delete', {
      subject: 'Indicator',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.indicator.id,
      indicatorTitle: payload.indicator.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteIndicatorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to delete indicator' });
  }
}

function* onUpdateIndicator({ payload }) { // here must be id of country and indicator
  try {
    yield call(httpIndicators.update, payload);
    const successMessage = i18n.t('manageDashboard.indicator_has_been_successfully_updated');
    yield put(types.updateIndicatorSuccess(successMessage));
    yield put(sectionTypes.setIndicatorOrGroupEditModalState(false));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Indicator',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.id,
      indicatorTitle: payload.indicator.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator' });
  }
}

function* onUpdateIndicatorSettings({ payload }) {
  try {
    yield call(httpIndicators.updateSettings, payload);
    const successMessage = i18n.t('manageDashboard.indicator_settings_have_been_successfully_updated');
    yield put(types.updateIndicatorSettingsSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Setting of Indicator',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.id,
      indicatorTitle: payload.indicator.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorSettingsFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator settings' });
  }
}

function* onGetIndicatorCustomFields({ payload }) {
  try {
    const data = yield call(httpIndicators.getCustomFields, payload);
    yield put(types.getCustomFieldsSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Custom Fields Tab',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.indicatorId,
      indicatorTitle: payload.indicator.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getCustomFieldsFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to get indicator custom fields' });
  }
}

function* onUpdateIndicatorCustomFields({ payload }) {
  try {
    yield call(httpIndicators.updateCustomFields, payload);
    const successMessage = i18n.t('manageDashboard.custom_fields_have_been_successfully_updated');
    yield put(types.updateCustomFieldsSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    yield put(types.getCustomFieldsRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Custom Fields',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorId: payload.indicatorId,
      indicatorTitle: payload.indicator.title,
      customField: payload.customFields[payload.customFields.lenght - 1],
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateCustomFieldsFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator custom fields' });
  }
}

function* onUpdateIndicatorOrder({ payload }) {
  try {
    yield call(httpIndicators.updateOrder, payload);
    const successMessage = i18n.t('manageDashboard.order_has_been_successfully_updated');
    yield put(types.updateIndicatorOrderSuccess(successMessage));
    yield put(sectionTypes.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Order of Indicator',
      countryId: payload.countryId,
      sectionId: payload.sectionId,
      indicatorGroupId: payload.indicatorsGroupId,
      indicatorTitle: payload.indicator.title,
      // id: id?
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorOrderFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator' });
  }
}

function* onGetIndicatorColors({ payload }) {
  try {
    const data = yield call(httpIndicators.getColors, payload);
    yield put(types.getIndicatorColorsSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorColorsFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to get indicator colors' });
  }
}

function* onCreateIndicatorColor({ payload }) {
  try {
    const data = yield call(httpIndicators.createColor, payload);
    yield put(types.createIndicatorColorSuccess(data));
    yield put(types.getIndicatorColorsRequest(payload));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createIndicatorColorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to create indicator color' });
  }
}

function* onUpdateIndicatorColor({ payload }) {
  try {
    const data = yield call(httpIndicators.updateColor, payload);
    yield put(types.updateIndicatorColorSuccess(data));
    yield put(types.getIndicatorColorsRequest(payload));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateIndicatorColorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to update indicator color' });
  }
}

function* onDeleteIndicatorColor({ payload }) {
  try {
    const data = yield call(httpIndicators.removeColor, payload);
    yield put(types.deleteIndicatorColorSuccess(data));
    yield put(types.getIndicatorColorsRequest(payload));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteIndicatorColorFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to delete indicator color' });
  }
}

const indicatorSagas = [
  takeEvery(types.getIndicatorRequest, onGetIndicator),
  takeEvery(types.createIndicatorRequest, onCreateIndicator),
  takeEvery(types.deleteIndicatorRequest, onDeleteIndicator),
  takeEvery(types.updateIndicatorRequest, onUpdateIndicator),
  takeEvery(types.updateIndicatorSettingsRequest, onUpdateIndicatorSettings),
  takeEvery(types.getCustomFieldsRequest, onGetIndicatorCustomFields),
  takeEvery(types.updateCustomFieldsRequest, onUpdateIndicatorCustomFields),
  takeEvery(types.updateIndicatorOrderRequest, onUpdateIndicatorOrder),
  takeEvery(types.getIndicatorColorsRequest, onGetIndicatorColors),
  takeEvery(types.createIndicatorColorRequest, onCreateIndicatorColor),
  takeEvery(types.updateIndicatorColorRequest, onUpdateIndicatorColor),
  takeEvery(types.deleteIndicatorColorRequest, onDeleteIndicatorColor),
  takeEvery(types.updateIndicatorDataRequest, onUpdateIndicatorData),
];

export default indicatorSagas;
