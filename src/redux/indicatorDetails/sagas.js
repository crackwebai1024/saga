import { takeEvery, call, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import * as httpIndicators from 'http/indicators';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';

function* onGetIndicatorDetailsGraph({ payload }) {
  try {
    const data = yield call(httpIndicators.getDetailsGraph, payload);
    yield put(types.getIndicatorDetailsGraphSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Graph Details of Indicator',
      sectionId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorDetailsGraphFailure(error));
  }
}

function* onGetIndicatorDetailsList({ payload }) {
  try {
    const data = yield call(httpIndicators.getDetailsList, payload);
    yield put(types.getIndicatorDetailsListSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'List Details of Indicator',
      sectionId: payload.sectionId,
      indicatorId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorDetailsListFailure(error));
  }
}

function* onGetIndicatorDetailsMap({ payload }) {
  try {
    const data = yield call(httpIndicators.getDetailsMap, payload);
    yield put(types.getIndicatorDetailsMapSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Map Details of Indicator',
      sectionId: payload.sectionId,
      indicatorId: payload.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorDetailsMapFailure(error));
  }
}

function* onGetIndicatorData({ payload }) {
  try {
    const data = yield call(httpIndicators.getIndicatorData, payload);
    yield put(types.getIndicatorDataSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorDataFailure(error));
  }
}

function* onGetIndicatorUpdateLog({ payload }) {
  try {
    const data = yield call(httpIndicators.getIndicatorUpdateLog, payload);
    yield put(types.getIndicatorUpdateLogSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorUpdateFailure(error));
  }
}

function* onGetIndicatorHighlightsLog({ payload }) {
  try {
    const data = yield call(httpIndicators.getIndicatorHighlightsLog, payload);
    yield put(types.getIndicatorHighlightsLogSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorHighlightsLogFailure(error));
  }
}

const indicatorDetailsSagas = [
  takeEvery(types.getIndicatorDetailsGraphRequest, onGetIndicatorDetailsGraph),
  takeEvery(types.getIndicatorHighlightsLogRequest, onGetIndicatorHighlightsLog),
  takeEvery(types.getIndicatorDetailsListRequest, onGetIndicatorDetailsList),
  takeEvery(types.getIndicatorDetailsMapRequest, onGetIndicatorDetailsMap),
  takeEvery(types.getIndicatorDataRequest, onGetIndicatorData),
  takeEvery(types.getIndicatorUpdateLogRequest, onGetIndicatorUpdateLog),
];

export default indicatorDetailsSagas;
