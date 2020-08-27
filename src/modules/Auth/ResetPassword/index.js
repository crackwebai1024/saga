import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { actions as passwordActions } from 'redux/password';
import AmplitudeService from 'services/amplitude';

import { validateResetPassword } from './validation';
import { resetPasswordFields } from './fields';
import ResetPasswordForm from './ResetPasswordForm';
import * as S from './styled';

class ResetPasswordPage extends Component {
  state = {
    code: queryString.parse(this.props.location.search).code,
  }

  actions = {
    SET: 'Set',
    RESET: 'Reset',
  }

  static propTypes = {
    actions: PropTypes.object.isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isResetPasswordSubmitted: PropTypes.bool.isRequired,
    location: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { action: actionLink } = this.props.match.params;
    const action = Object.values(this.actions).find((el) => el.toLowerCase() === actionLink);

    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Password', action });
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.resetToInitialState();
  }

  onSubmit = (payload) => {
    const { actions } = this.props;
    const { code } = this.state;
    const { password } = payload;

    const body = {
      password,
      resetPasswordCode: code,
    };

    actions.resetPasswordRequest(body);
  }

  render() {
    const {
      error,
      isLoading,
      isResetPasswordSubmitted,
      match: { params: { action: actionLink } },
      t,
    } = this.props;
    const { code } = this.state;

    const action = Object.values(this.actions).find((el) => el.toLowerCase() === actionLink);
    if (!code || isResetPasswordSubmitted || !action) {
      return <Redirect to="/login" />;
    }

    return (
      <>
        <S.Container>
          <S.Content>
            <ResetPasswordForm
              onSubmit={this.onSubmit}
              fields={resetPasswordFields}
              validate={(values) => validateResetPassword(values, t)}
              isLoading={isLoading}
              error={error}
              action={action}
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
    isLoading,
    isResetPasswordSubmitted,
  },
}) => ({
  error,
  isLoading,
  isResetPasswordSubmitted,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...passwordActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(ResetPasswordPage));
