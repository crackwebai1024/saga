import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import * as httpProjects from 'http/projects';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';

function* onCreateProject({ payload }) {
  try {
    yield call(httpProjects.create, payload);
    const successMessage = `Project ${payload.name} has been successfully created`;
    yield put(types.createProjectSuccess(successMessage));
    yield put(types.getAllProjects(payload.countryId));
    AmplitudeService.logEvent('Create', {
      subject: 'Project',
      countryId: payload.countryId,
      projectId: payload.id,
      projectTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createProjectFailure(error));
  }
}

function* onDeleteProject({ payload }) {
  try {
    yield call(httpProjects.remove, payload);
    const successMessage = 'Project has been successfully deleted';
    yield put(types.deleteProjectSuccess(successMessage));
    yield put(types.getAllProjects(payload.countryId));
    AmplitudeService.logEvent('Delete', {
      subject: 'Project',
      countryId: payload.countryId,
      projectId: payload.id,
      projectTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteProjectFailure(error));
  }
}

function* onUpdateProject({ payload }) {
  try {
    yield call(httpProjects.update, payload);
    const successMessage = 'Project has been successfully updated';
    yield put(types.updateProjectSuccess(successMessage));
    yield put(types.getAllProjects(payload.countryId));
    AmplitudeService.logEvent('Update', {
      subject: 'Project',
      countryId: payload.countryId,
      projectId: payload.id,
      projectTitle: payload.title,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateProjectFailure(error));
  }
}

function* onGetAllProjects({ payload }) {
  try {
    const data = yield call(httpProjects.getAll, payload);
    yield put(types.getAllProjectsSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getAllProjectsFailure(error));
  }
}


const projectsSagas = [
  takeEvery(types.getAllProjects, onGetAllProjects),
  takeEvery(types.createProjectRequest, onCreateProject),
  takeEvery(types.deleteProjectRequest, onDeleteProject),
  takeEvery(types.updateProjectRequest, onUpdateProject),
];

export default projectsSagas;
