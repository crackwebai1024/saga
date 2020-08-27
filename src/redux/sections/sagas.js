import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import * as httpSections from 'http/sections';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';

function* onGetFullStructure({ payload }) {
  try {
    const data = yield call(httpSections.getFullStructure, payload);
    yield put(types.getFullStructureSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getFullStructureFailure({ message: error.response.data }));
  }
}

function* onCreateSection({ payload }) {
  try {
    yield call(httpSections.create, payload);
    const successMessage = `Section ${payload.title} has been successfully created`;
    yield put(types.createSectionSuccess(successMessage));
    yield put(types.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Create', {
      subject: 'Section',
      countryId: payload.countryId,
      sectionId: payload.id,
      sectionTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createSectionFailure(error));
  }
}

function* onDeleteSection({ payload }) {
  try {
    yield call(httpSections.remove, payload);
    const successMessage = 'Section has been successfully deleted';
    yield put(types.deleteSectionSuccess(successMessage));
    yield put(types.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Delete', {
      subject: 'Section',
      countryId: payload.countryId,
      sectionId: payload.id,
      sectionTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteSectionFailure(error));
  }
}

function* onUpdateSection({ payload }) {
  try {
    yield call(httpSections.update, payload);
    const successMessage = 'Section has been successfully updated';
    yield put(types.updateSectionSuccess(successMessage));
    yield put(types.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Section',
      countryId: payload.countryId,
      sectionId: payload.id,
      sectionTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateSectionFailure(error));
  }
}

function* onUpdateSectionOrder({ payload }) {
  try {
    yield call(httpSections.updateOrder, payload);
    yield put(types.getFullStructureRequest(payload));
    AmplitudeService.logEvent('Update', {
      subject: 'Order of Section',
      countryId: payload.countryId,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateSectionOrderFailure(error));
  }
}

const sectionsSagas = [
  takeEvery(types.getFullStructureRequest, onGetFullStructure),
  takeEvery(types.createSectionRequest, onCreateSection),
  takeEvery(types.deleteSectionRequest, onDeleteSection),
  takeEvery(types.updateSectionRequest, onUpdateSection),
  takeEvery(types.updateSectionOrderRequest, onUpdateSectionOrder),
];

export default sectionsSagas;
