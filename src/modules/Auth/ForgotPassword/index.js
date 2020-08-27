import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { actions as passwordActions } from 'redux/password';
import AmplitudeService from 'services/amplitude';

import { validateLogin } from './validation';
import { forgotPasswordFields } from './fields';
import ForgotPasswordForm from './ForgotPasswordForm';
import * as S from './styled';

class ForgotPasswordPage extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    isForgotPasswordSubmitted: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    actions: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }

  componentDidMount() {
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Forgot Password' });
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.resetToInitialState();
  }

  onSubmit = (payload) => {
    const { actions } = this.props;

    actions.forgotPasswordRequest(payload);
  }

  render() {
    const {
      error,
      isForgotPasswordSubmitted,
      isLoading,
      t,
    } = this.props;

    if (isForgotPasswordSubmitted) {
      return <Redirect to="login" />;
    }

    return (
      <>
        <S.Container>
          <S.Content>
            <ForgotPasswordForm
              onSubmit={this.onSubmit}
              fields={forgotPasswordFields}
              validate={(values) => validateLogin(values, t)}
              isLoading={isLoading}
              error={error}
            />
            <S.Link to="/login">{t('common.back_to_login_page')}</S.Link>
          </S.Content>
        </S.Container>
      </>
    );
  }
}

const mapStateToProps = ({
  password: {
    error,
    isForgotPasswordSubmitted,
    isLoading,
  },
}) => ({
  error,
  isForgotPasswordSubmitted,
  isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...passwordActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ForgotPasswordPage));
