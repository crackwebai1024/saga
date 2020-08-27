import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';

import { actions as authActions } from 'redux/auth';
import AmplitudeService from 'services/amplitude';

import { validateLogin } from './validation';
import { loginFields } from './fields';
import LoginForm from './LoginForm';
import * as S from './styled';

class LoginPage extends Component {
  static propTypes = {
    loginError: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoginLoading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }

  componentDidMount() {
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Login' });
    AmplitudeService.setUser();
  }

  componentWillUnmount() {
    const { actions } = this.props;
    actions.resetLoginError();
  }

  onLogin = (payload) => {
    const { actions } = this.props;
    actions.authenticateRequest(payload);
  }

  render() {
    const {
      isLoginLoading, loginError, isAuthenticated, t,
    } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/global" />;
    }

    return (
      <>
        <S.Container>
          <LoginForm
            onSubmit={this.onLogin}
            fields={loginFields}
            validate={(values) => validateLogin(values, t)}
            isLoading={isLoginLoading}
            error={loginError}
          />
        </S.Container>
      </>
    );
  }
}

const mapStateToProps = ({
  auth: {
    loginError,
    isAuthenticated,
    isLoginLoading,
  },
}) => ({
  loginError,
  isAuthenticated,
  isLoginLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...authActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(LoginPage));
