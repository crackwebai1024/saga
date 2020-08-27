import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';

import baseTheme from '../../theme';

const RootProvider = ({ children, theme }) => {
  const THEME = baseTheme(theme);

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MuiThemeProvider theme={THEME}>
          <ThemeProvider theme={THEME}>
            <SnackbarProvider maxSnack={4} autoHideDuration={2500}>
              {children}
            </SnackbarProvider>
          </ThemeProvider>
        </MuiThemeProvider>
      </MuiPickersUtilsProvider>
    </>
  );
};

RootProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ theme }) => ({
  theme,
});

export default connect(mapStateToProps)(RootProvider);
