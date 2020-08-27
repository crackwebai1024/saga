import { put, takeEvery } from 'redux-saga/effects';

import getErrorMessage from 'helpers/getErrorMessage';
import { actions as notificationTypes } from 'redux/notification';
import { isAuthenticatedFailureIgroredPathsInclude } from 'redux/auth/helpers';

function* onFailureError(action) {
  const shouldSkipNotification = action.type === 'IS_AUTHENTICATED_FAILURE'
    && isAuthenticatedFailureIgroredPathsInclude(window.location.pathname);

  const errorMessage = getErrorMessage(action);

  if (!shouldSkipNotification && errorMessage !== '') {
    yield put(notificationTypes.addNotification({
      message: errorMessage,
      options: {
        preventDuplicate: true,
        variant: 'error',
      },
    }));
  }
}

export default function* watchFailure() {
  yield takeEvery((action) => /FAILURE/i.test(action.type), onFailureError);
}
