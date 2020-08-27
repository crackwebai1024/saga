import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';

import { actions as updateIndicatorNotesActions } from 'redux/updateIndicatorNotes';
import { checkAccessToNotesUpdate } from 'redux/updateIndicatorNotes/selectors';

import LinearProgress from '@material-ui/core/LinearProgress';

import Modal from '@material-ui/core/Modal';
import Form from './Form/index';
import * as S from './styled';

class IndicatorNotesData extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isEditableMode: PropTypes.bool.isRequired,
    isIndicatorNotesModalOpen: PropTypes.bool.isRequired,
    indicator: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      note: PropTypes.string,
      lowlights: PropTypes.string,
      highlights: PropTypes.string,
    }).isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      updateIndicatorNotesRequest: PropTypes.func.isRequired,
      switchToEditableMode: PropTypes.func.isRequired,
      closeIndicatorNotesModalState: PropTypes.func.isRequired,
    }).isRequired,
    countryId: PropTypes.number.isRequired,
    countrySlug: PropTypes.string.isRequired,
    requestedYear: PropTypes.number.isRequired,
    hasAccessToNotesUpdate: PropTypes.bool.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      enqueueSnackbar,
    } = this.props;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }
  }

  handleSubmit = (values) => {
    const {
      actions,
      indicator,
      countryId,
      countrySlug,
    } = this.props;
    const payload = {
      ...values,
      id: indicator.id,
      countryId,
      countrySlug,
    };
    actions.updateIndicatorNotesRequest(payload);
  };

  switchToEditableMode = (e) => {
    const { actions } = this.props;

    e.preventDefault();
    actions.switchToEditableMode();
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.closeIndicatorNotesModalState();
  };

  render() {
    const {
      indicator,
      isLoading,
      isIndicatorNotesModalOpen,
      error,
      isEditableMode,
      hasAccessToNotesUpdate,
      requestedYear,
    } = this.props;

    const initialValues = {
      ...indicator,
      requestedYear,
    };

    return (
      <Modal
        open={isIndicatorNotesModalOpen}
        onClose={this.handleClose}
      >
        <S.Modal>
          <S.Title>{indicator.title}</S.Title>
          <S.Loader isLoading={isLoading}>
            <LinearProgress />
          </S.Loader>
          <S.Content>
            <Form
              onSubmit={this.handleSubmit}
              switchToEditableMode={this.switchToEditableMode}
              initialValues={initialValues}
              onClose={this.handleClose}
              isEditableMode={isEditableMode}
              hasAccessToNotesUpdate={hasAccessToNotesUpdate}
            />
            {error && (
            <S.FormHelperText error>{error}</S.FormHelperText>
            )}
          </S.Content>
        </S.Modal>
      </Modal>
    );
  }
}

const mapStateToProps = ({
  updateIndicatorNotes: {
    isLoading,
    isIndicatorNotesModalOpen,
    isEditableMode,
    indicator,
    successMessage,
    error,
  },
  country: {
    country,
  },
  auth,
  indicatorDetails: {
    year,
  },
}) => ({
  isLoading,
  isIndicatorNotesModalOpen,
  indicator,
  isEditableMode,
  successMessage,
  error,
  countrySlug: country.slug,
  countryId: country.id,
  requestedYear: year,
  hasAccessToNotesUpdate: checkAccessToNotesUpdate(auth),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...updateIndicatorNotesActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSnackbar,
)(IndicatorNotesData);
