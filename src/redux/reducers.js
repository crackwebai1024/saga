import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import global from './global';
import password from './password';
import notification from './notification';
import users from './users';
import countries from './countries';
import projects from './projects';
import sections from './sections';
import indicators from './indicators';
import indicatorDetails from './indicatorDetails';
import indicatorsGroups from './indicatorsGroups';
import theme from './theme';
import country from './country';
import loader from './loader';
import importIndicatorData from './importIndicatorData';
import importIndicatorsGroupData from './importIndicatorsGroupData';
import importIndicatorsStatusData from './importIndicatorStatus';
import updateIndicatorNotes from './updateIndicatorNotes';
import milestones from './milestones';

const rootReducer = combineReducers({
  app,
  auth,
  global,
  password,
  notification,
  users,
  countries,
  projects,
  sections,
  indicators,
  indicatorDetails,
  indicatorsGroups,
  theme,
  country,
  loader,
  importIndicatorData,
  importIndicatorsGroupData,
  importIndicatorsStatusData,
  updateIndicatorNotes,
  milestones,
});

export default rootReducer;
