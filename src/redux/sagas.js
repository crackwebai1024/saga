import { all, fork } from 'redux-saga/effects';

import authSagas, { watchUnauthorized } from './auth/sagas';
import countriesSagas from './countries/sagas';
import countrySagas from './country/sagas';
import projectsSagas from './projects/sagas';
import globalSagas from './global/sagas';
import passwordSagas from './password/sagas';
import watchFailure from './notification/sagas';
import users from './users/sagas';
import sectionsSagas from './sections/sagas';
import indicatorsSagas from './indicators/sagas';
import indicatorDetailsSagas from './indicatorDetails/sagas';
import indicatorsGroupsSagas from './indicatorsGroups/sagas';
import indicatorImportSagas from './importIndicatorData/sagas';
import indicatorStatusImportSagas from './importIndicatorStatus/sagas';
import indicatorsGroupDataImportSagas from './importIndicatorsGroupData/sagas';
import indicatorNotesUpdateSagas from './updateIndicatorNotes/sagas';
import milestonesSagas from './milestones/sagas';

export default function* root() {
  yield all([
    ...authSagas,
    ...countriesSagas,
    ...countrySagas,
    ...projectsSagas,
    ...globalSagas,
    ...passwordSagas,
    ...users,
    ...sectionsSagas,
    ...indicatorsSagas,
    ...indicatorDetailsSagas,
    ...indicatorsGroupsSagas,
    ...indicatorImportSagas,
    ...indicatorsGroupDataImportSagas,
    ...milestonesSagas,
    ...indicatorStatusImportSagas,
    ...indicatorNotesUpdateSagas,
    fork(watchUnauthorized),
    fork(watchFailure),
  ]);
}
