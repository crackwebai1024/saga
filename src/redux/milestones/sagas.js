import { call, takeEvery, put } from 'redux-saga/effects';
import * as Sentry from '@sentry/browser';

import * as httpMilestones from 'http/milestones';

import AmplitudeService from 'services/amplitude';

import { actions as types } from './index';

function* onGetIndicatorGroups({ payload }) {
  try {
    const data = yield call(httpMilestones.getIndicatorGroups, payload);

    yield put(types.getIndicatorGroupsSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getIndicatorGroupsFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get Indicator Groups for milestones' });
  }
}

function* onResponsibleParties() {
  try {
    const data = yield call(httpMilestones.getResponsibleParties);
    yield put(types.getResponsiblePartiesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getResponsiblePartiesFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get responsible parties for milestones' });
  }
}

function* onGetMilestones({ payload }) {
  try {
    const params = {
      indicatorId: payload.indicatorId,
      indicatorsGroupId: payload.indicatorsGroupId,
      sectionId: payload.sectionId,
      countryId: payload.countryId,
      projectId: payload.projectId,
      responsiblePartyId: payload.responsiblePartyId || null,
      completionDateFrom: payload.completionDateFrom,
      completionDateTo: payload.completionDateTo,
      startDateFrom: payload.startDateFrom,
      startDateTo: payload.startDateTo,
      status: JSON.stringify(payload.status),
      pageCount: payload.rowsPerPage,
      page: payload.page,
    };

    const data = yield call(httpMilestones.getMilestones, params);
    yield put(types.getMilestonesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getMilestonesFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get milestones' });
  }
}

function* onGetMilestonesGraph({ payload }) {
  try {
    const params = {
      indicatorId: payload.indicatorId,
      indicatorsGroupId: payload.indicatorsGroupId,
      sectionId: payload.sectionId,
      countryId: payload.countryId,
      projectId: payload.projectId,
    };

    const data = yield call(httpMilestones.getMilestonesGraph, params);
    yield put(types.getMilestonesGraphSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getMilestonesGraphFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get milestones graph' });
  }
}

function* onGetUpcomingMilestones({ payload }) {
  try {
    const params = {
      indicatorId: payload.indicatorId,
      indicatorsGroupId: payload.indicatorsGroupId,
      sectionId: payload.sectionId,
      countryId: payload.countryId,
      projectId: payload.projectId,
    };

    const data = yield call(httpMilestones.getUpcomingMilestones, params);
    yield put(types.getUpcomingMilestonesSuccess(data));
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.getUpcomingMilestonesFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on get upcoming milestones' });
  }
}

function* onCreateMilestone({ payload }) {
  try {
    const data = yield call(httpMilestones.createMilestone, payload);
    yield put(types.createMilestoneSuccess(data));
    AmplitudeService.logEvent('Milestones: Create', {
      subject: 'Milestone',
      action: 'Create',
      milestonesId: data.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.createMilestoneFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on create milestone' });
  }
}

function* onUpdateMilestone({ payload }) {
  try {
    const data = yield call(httpMilestones.updateMilestone, payload);
    yield put(types.updateMilestoneSuccess(data));
    AmplitudeService.logEvent('Milestones: Update', {
      subject: 'Milestone',
      action: 'Update',
      milestonesId: data.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateMilestoneFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on update milestone' });
  }
}

function* onDeleteMilestone({ payload }) {
  try {
    const data = yield call(httpMilestones.deleteMilestone, payload);
    yield put(types.deleteMilestoneSuccess(data));
    AmplitudeService.logEvent('Milestones: Delete', {
      subject: 'Milestone',
      action: 'Delete',
      milestonesId: data.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deleteMilestoneFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on delete milestone' });
  }
}

const milestonesSagas = [
  takeEvery(types.getIndicatorGroupsRequest, onGetIndicatorGroups),
  takeEvery(types.getResponsiblePartiesRequest, onResponsibleParties),
  takeEvery(types.getMilestonesRequest, onGetMilestones),
  takeEvery(types.getMilestonesGraphRequest, onGetMilestonesGraph),
  takeEvery(types.getUpcomingMilestonesRequest, onGetUpcomingMilestones),
  takeEvery(types.createMilestoneRequest, onCreateMilestone),
  takeEvery(types.updateMilestoneRequest, onUpdateMilestone),
  takeEvery(types.deleteMilestoneRequest, onDeleteMilestone),
];

export default milestonesSagas;
