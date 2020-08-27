import React from 'react';
import PropTypes from 'prop-types';
import IdleTimer from 'react-idle-timer';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { actions as authActions } from 'redux/auth';

import { withStyles } from '@material-ui/core/styles';
import { formatDate } from 'helpers/formatDate';
import styles from './material.styled';

import * as S from './styled';

const logoutTimeout = (Number(process.env.REACT_APP_LOGOUT_TIMEOUT) || 15) * 60 * 1000;
// logout timeout in seconds (default 15 minutes)
const currentDate = new Date();

class Main extends React.PureComponent {
  onIdle = () => {
    const { actions } = this.props;
    actions.logoutRequest();
  }

  render() {
    const {
      modules,
      countries,
    } = this.props;

    return (
      <>
        <IdleTimer
          ref={(ref) => { this.idleTimer = ref; }}
          element={document}
          onIdle={this.onIdle}
          debounce={250}
          timeout={logoutTimeout}
        />
        <>
          <S.CurrentDate>Date printed so {formatDate(currentDate)}</S.CurrentDate>
          <Switch>
            {modules.map((moduleConfig, index) => (
              <Route path={moduleConfig.path} key={index} component={moduleConfig.module} />
            ))}
            {modules.filter((moduleConfig) => moduleConfig.path === '/global').length ? (
              <Redirect to="/global" />
            ) : (
              <Redirect to={`/country/${countries[0].slug}`} />
            )}
          </Switch>
        </>
      </>
    );
  }
}

Main.propTypes = {
  actions: PropTypes.object.isRequired,
  modules: PropTypes.array.isRequired,
  countries: PropTypes.array.isRequired,
};

const mapStateToProps = ({
  countries: {
    formList,
  },
}) => ({
  countries: formList,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Main));
