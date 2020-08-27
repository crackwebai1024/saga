import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpUsers from 'http/users';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';

function* onGetUsers({ payload }) {
  try {
    const data = yield call(httpUsers.getList, payload);
    yield put(types.getUsersSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getUsersFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get users' });
  }
}

function* onRegisterUser({
  payload: {
    page,
    rowsPerPage,
    sort,
    order,
    id,
    ...rest
  },
}) {
  try {
    const data = yield call(httpUsers.register, rest, order);
    const successMessage = i18n.t('admin.user_successfully_registered', { data });
    yield put(types.registerUserSuccess(successMessage));
    yield put(types.getUsersRequest({
      page,
      rowsPerPage,
      sort,
      order,
    }));
    AmplitudeService.logEvent('Create', { subject: 'User', userId: id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.registerUserFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on register users' });
  }
}

function* onDeleteUser({
  payload: {
    page,
    rowsPerPage,
    id,
    sort,
    order,
  },
}) {
  try {
    yield call(httpUsers.remove, id);
    const successMessage = i18n.t('admin.user_successfully_deleted');
    yield put(types.deleteUserSuccess(successMessage));
    yield put(types.getUsersRequest({
      page,
      rowsPerPage,
      sort,
      order,
    }));
    AmplitudeService.logEvent('Delete', { subject: 'User', userId: id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteUserFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on delete users' });
  }
}

function* onUpdateUser({
  payload: {
    page,
    rowsPerPage,
    sort,
    order,
    ...rest
  },
}) {
  try {
    yield call(httpUsers.update, rest);
    const successMessage = i18n.t('admin.user_updated');
    yield put(types.updateUserSuccess(successMessage));
    yield put(types.getUsersRequest({
      page,
      rowsPerPage,
      sort,
      order,
    }));
    AmplitudeService.logEvent('Update', { subject: 'User', userId: rest.id });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateUserFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on update users' });
  }
}

const authSagas = [
  takeEvery(types.getUsersRequest, onGetUsers),
  takeEvery(types.registerUserRequest, onRegisterUser),
  takeEvery(types.deleteUserRequest, onDeleteUser),
  takeEvery(types.updateUserRequest, onUpdateUser),
];

export default authSagas;
