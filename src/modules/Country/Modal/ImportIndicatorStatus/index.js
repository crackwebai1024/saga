import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';

import { actions as importStatusActions } from 'redux/importIndicatorStatus';
import { actions as updateIndicatorNotesActions } from 'redux/updateIndicatorNotes';
import { checkAccessToNotesUpdate } from 'redux/updateIndicatorNotes/selectors';
import { INDICATOR_STATUSES } from 'helpers/statuses';

import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import Form from './Form/index';
import * as S from './styled';

class ImportIndicatorsGroupData extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isImportStatusModalOpen: PropTypes.bool.isRequired,
    indicator: PropTypes.shape({
      id: PropTypes.number,
      sectionId: PropTypes.number,
      projectId: PropTypes.number,
      indicatorsGroupId: PropTypes.number,
      title: PropTypes.string,
      status: PropTypes.string,
      manualStatus: PropTypes.string,
      note: PropTypes.string,
      lowlights: PropTypes.string,
      highlights: PropTypes.string,
      lowlightsTitle: PropTypes.string,
      highlightsTitle: PropTypes.string,
    }).isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      closeImportStatusModalState: PropTypes.func.isRequired,
      importIndicatorStatusRequest: PropTypes.func.isRequired,
      updateIndicatorNotesRequest: PropTypes.func.isRequired,
    }).isRequired,
    requestedYear: PropTypes.number.isRequired,
    countryId: PropTypes.number.isRequired,
    countrySlug: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      enqueueSnackbar,
    } = this.props;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      this.handleClose();
    }
  }

  handleSubmit = (values) => {
    const {
      actions,
      indicator: {
        id,
        projectId,
        indicatorsGroupId,
        sectionId,
        note,
        highlights,
        lowlights,
        highlightsTitle,
        lowlightsTitle,
        manualStatus,
      },
      countryId,
      countrySlug,
    } = this.props;
    const payload = {
      ...values,
      id,
      countryId,
      countrySlug,
      projectId,
      indicatorsGroupId,
      sectionId,
      status: (manualStatus || INDICATOR_STATUSES.automatic.key) !== values.status ? values.status : undefined,
      note: note !== values.note ? values.note : undefined,
      highlights: highlights !== values.highlights ? values.highlights || '' : undefined,
      lowlights: lowlights !== values.lowlights ? values.lowlights || '' : undefined,
      highlightsTitle: highlightsTitle !== values.highlightsTitle ? values.highlightsTitle || '' : undefined,
      lowlightsTitle: lowlightsTitle !== values.lowlightsTitle ? values.lowlightsTitle || '' : undefined,
    };
    actions.importIndicatorStatusRequest(payload);
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.closeImportStatusModalState();
  };

  render() {
    const {
      indicator: {
        id,
        sectionId,
        title,
        manualStatus,
        note,
        highlightsTitle,
        highlights,
        lowlightsTitle,
        lowlights,
      },
      requestedYear,
      isLoading,
      isImportStatusModalOpen,
      countrySlug,
      error,
    } = this.props;

    const initialValues = {
      year: requestedYear,
      status: manualStatus || INDICATOR_STATUSES.automatic.key,
      note,
      highlightsTitle,
      highlights,
      lowlightsTitle,
      lowlights,
    };

    return (
      <Modal
        open={isImportStatusModalOpen}
        onClose={this.handleClose}
      >
        <S.Modal>
          <S.Row>
            <S.Title>{title}</S.Title>
            <S.Link
              onClick={this.handleClose}
              to={`/country/${countrySlug}/country-dashboard/section/${sectionId}/editIndicator/${id}`}
            >
              Edit data
            </S.Link>
          </S.Row>
          <S.Loader isLoading={isLoading}>
            <LinearProgress />
          </S.Loader>
          <Form
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            onClose={this.handleClose}
          />
          {error && (
            <FormHelperText error>{error}</FormHelperText>
          )}
        </S.Modal>
      </Modal>
    );
  }
}

const mapStateToProps = ({
  importIndicatorsStatusData: {
    isLoading,
    isImportStatusModalOpen,
    isFormDisabled,
    indicator,
    successMessage,
    error,
  },
  indicatorDetails: {
    year,
  },
  auth,
  country,
}) => ({
  isLoading,
  isImportStatusModalOpen,
  isFormDisabled,
  indicator,
  successMessage,
  error,
  requestedYear: year,
  countrySlug: country?.country?.slug,
  countryId: country?.country?.id,
  hasAccessToNotesUpdate: checkAccessToNotesUpdate(auth),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...importStatusActions,
    ...updateIndicatorNotesActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSnackbar,
)(ImportIndicatorsGroupData);
