import { call, put, takeEvery } from 'redux-saga/effects';

import AmplitudeService from 'services/amplitude';
import * as httpAuth from 'http/auth';
import { actions as types } from './index';

function* onForgotPassword({ payload: { email } }) {
  try {
    const params = {
      email: email.trim(),
    };

    yield call(httpAuth.forgotPassword, params);
    yield put(types.forgotPasswordSuccess());
    AmplitudeService.logEvent('Forgot password request');
  } catch (error) {
    yield put(types.forgotPasswordFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed forgot password request' });
  }
}

function* onResetPassword({ payload: { password, resetPasswordCode } }) {
  try {
    const params = {
      password,
      resetPasswordCode,
    };

    yield call(httpAuth.resetPassword, params);
    yield put(types.resetPasswordSuccess());
    AmplitudeService.logEvent('Password has been set');
  } catch (error) {
    yield put(types.resetPasswordFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed to set password' });
  }
}

const passwordSagas = [
  takeEvery(types.forgotPasswordRequest, onForgotPassword),
  takeEvery(types.resetPasswordRequest, onResetPassword),
];

export default passwordSagas;
