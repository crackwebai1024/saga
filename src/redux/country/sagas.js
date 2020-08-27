import {
  call, takeLatest, put, takeEvery, select,
} from 'redux-saga/effects';

import * as Sentry from '@sentry/browser';
import i18n from 'locales';

import * as httpCountries from 'http/countries';
import * as httpProjects from 'http/projects';
import AmplitudeService from 'services/amplitude';
import { actions as types } from './index';
import { actions as themeTypes } from '../theme/index';

function* onFetchCountries({ payload }) {
  try {
    const selectedProjectId = yield select(({ country }) => (country.selectedProject && country.selectedProject.id));
    const country = yield call(httpCountries.getCountry, payload);
    const selectedProject = (selectedProjectId
      && country.projects.find((project) => project.id === selectedProjectId)) || country.projects[0];
    let dashboard;
    yield put(themeTypes.setTheme({ mainColor: country.mainColor, fontMainColor: country.fontMainColor }));
    if (country.projects.length && payload.selector) {
      dashboard = yield call(
        httpProjects.getDashboard,
        {
          countryId: country.id,
          projectId: selectedProject.id,
          period: payload.selector?.period,
          value: payload.selector?.value.format('YYYY-MM-DD'),
        },
      );
    }
    yield put(types.fetchCountrySuccess({
      country, dashboard, projects: country.projects, selectedProject,
    }));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Country Dashboard',
      countryId: country.id,
      countryName: country.name,
    });
  } catch (error) {
    yield put(types.fetchCountryFailure(error));
  }
}

function* onLoadProjectDashboard() {
  try {
    const params = yield select(({ indicatorDetails, country }) => ({
      period: indicatorDetails.selector.period,
      value: indicatorDetails.selector.value.format('YYYY-MM-DD'),
      projectId: country.selectedProject.id,
      countryId: country.country.id,
    }));

    const dashboard = yield call(
      httpProjects.getDashboard,
      params,
    );

    yield put(types.fetchProjectDashboardSuccess(dashboard));
  } catch (error) {
    yield put(types.fetchProjectDashboardSuccess(error));
  }
}

function* onFetchTargets({ payload }) {
  try {
    const data = yield call(httpCountries.getTargets, payload);
    yield put(types.fetchTargetsSuccess(data));
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Manage Targets',
      countryId: data.id,
      countryName: data.name,
    });
  } catch (error) {
    yield put(types.fetchTargetsFailure(error));
  }
}

function* onRegisterTarget({
  payload: {
    page,
    rowsPerPage,
    sort,
    order,
    countryId,
    projectId,
    selectedTarget,
    selectedYear,
    ...rest
  },
}) {
  try {
    yield call(httpCountries.registerTarget, countryId, projectId, rest);
    const successMessage = i18n.t('country.target_successfully_registered');
    yield put(types.registerTargetSuccess(successMessage));
    yield put(types.fetchTargetsRequest({
      id: selectedTarget,
      year: selectedYear,
      countryId,
      projectId,
      order,
      sort,
      page,
      rowsPerPage,
    }));
    AmplitudeService.logEvent('Create', {
      subject: 'Target',
      countryId,
      indicatorId: rest.indicatorId,
      targetId: rest.id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.registerTargetFailure(error));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on registration target' });
  }
}

function* onDeleteTarget({
  payload: {
    page,
    rowsPerPage,
    id,
    sort,
    order,
    countryId,
    projectId,
    indicatorId,
    selectedTarget,
    selectedYear,
  },
}) {
  try {
    yield call(httpCountries.removeTarget, countryId, projectId, id);
    const successMessage = i18n.t('country.target_successfully_deleted');
    yield put(types.deleteTargetSuccess(successMessage));
    yield put(types.fetchTargetsRequest({
      id: selectedTarget,
      year: selectedYear,
      countryId,
      projectId,
      order,
      sort,
      page,
      rowsPerPage,
    }));
    AmplitudeService.logEvent('Delete', {
      subject: 'Target',
      countryId,
      indicatorId,
      targetId: id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.deletetargetFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on delete target' });
  }
}

function* onUpdateTarget({
  payload: {
    page,
    rowsPerPage,
    sort,
    order,
    countryId,
    projectId,
    values,
    selectedYear,
    selectedTarget,
    ...rest
  },
}) {
  try {
    const {
      isPrimary, value, year, id,
    } = rest;
    yield call(httpCountries.updateTarget, countryId, projectId, {
      isPrimary, value, year, id,
    });
    const successMessage = i18n.t('country.target_successfully_updated');
    yield put(types.updateTargetSuccess(successMessage));
    yield put(types.fetchTargetsRequest({
      id: selectedTarget,
      year: selectedYear,
      countryId,
      projectId,
      order,
      sort,
      page,
      rowsPerPage,
    }));
    AmplitudeService.logEvent('Update', {
      subject: 'Target',
      countryId,
      indicatorId: rest.indicatorId,
      targetId: id,
    });
  } catch (error) {
    Sentry.captureException(error);
    yield put(types.updateTargetFailure({ message: error.response.data }));
    AmplitudeService.logEvent('Failed', { errorMessage: 'Failed on updated target' });
  }
}

const countrySagas = [
  takeLatest(types.fetchCountryRequest, onFetchCountries),
  takeEvery(types.onProjectChangeRequest, onLoadProjectDashboard),
  takeEvery(types.fetchProjectDashboardRequest, onLoadProjectDashboard),
  takeLatest(types.fetchTargetsRequest, onFetchTargets),
  takeEvery(types.registerTargetRequest, onRegisterTarget),
  takeEvery(types.deleteTargetRequest, onDeleteTarget),
  takeEvery(types.updateTargetRequest, onUpdateTarget),
];

export default countrySagas;
