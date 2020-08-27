import 'react-app-polyfill/ie11';
import 'core-js/es';
import 'core-js/es/array';
import 'core-js/es/object';
import 'core-js/es/string';
import 'core-js/es/number/is-nan';
import 'core-js/es/number/is-integer';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import RootProvider from 'components/RootProvider';
import AmplitudeService from 'services/amplitude';
import configureStore from 'redux/configureStore';
import AppRouter from 'router';
import './index.css';
import './locales';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  environment: process.env.REACT_APP_STAGE,
});

AmplitudeService.init();

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RootProvider>
      <AppRouter />
    </RootProvider>
  </Provider>,
  document.getElementById('root'),
);
