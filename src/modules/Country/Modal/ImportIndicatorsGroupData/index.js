import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';

import { actions as importActions } from 'redux/importIndicatorsGroupData';

import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import Form from './Form/index';
import * as S from './styled';

class ImportIndicatorsGroupData extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
    // connect
    isLoading: PropTypes.bool.isRequired,
    isImportModalOpen: PropTypes.bool.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    indicatorsGroup: PropTypes.shape({
      id: PropTypes.number,
      sectionId: PropTypes.number,
      title: PropTypes.string,
      year: PropTypes.number,
      status: PropTypes.number,
      value: PropTypes.number,
      valueType: PropTypes.string,
      groupTarget: PropTypes.number,
    }).isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      closeImportIndicatorsGroupModalState: PropTypes.func.isRequired,
      importIndicatorsGroupDataRequest: PropTypes.func.isRequired,
      deleteIndicatorsGroupDataRequest: PropTypes.func.isRequired,
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
      indicatorsGroup,
      requestedYear,
      countrySlug,
    } = this.props;
    const payload = {
      ...values,
      id: indicatorsGroup.id,
      requestedYear,
      countrySlug,
    };
    actions.importIndicatorsGroupDataRequest(payload);
  };

  handleDelete = () => {
    const {
      actions,
      indicatorsGroup,
      requestedYear,
      countrySlug,
      countryId,
    } = this.props;
    const values = {
      year: null,
      status: null,
      value: null,
      valueType: null,
      groupTarget: null,
    };
    const payload = {
      ...values,
      id: indicatorsGroup.id,
      countryId,
      sectionId: indicatorsGroup.sectionId,
      requestedYear,
      countrySlug,
    };
    actions.deleteIndicatorsGroupDataRequest(payload);
  }

  handleClose = () => {
    const { actions } = this.props;

    actions.closeImportIndicatorsGroupModalState();
  };

  render() {
    const {
      indicatorsGroup: {
        title,
        year,
        status,
        value,
        valueType,
        groupTarget,
      },
      requestedYear,
      isLoading,
      isImportModalOpen,
      isFormDisabled,
      error,
    } = this.props;

    const initialValues = {
      year: year || requestedYear,
      status,
      value,
      valueType,
      groupTarget,
    };


    return (
      <Modal
        open={isImportModalOpen}
        onClose={this.handleClose}
      >
        <S.Modal>
          <S.Title>{title}</S.Title>
          <S.Loader isLoading={isLoading}>
            <LinearProgress />
          </S.Loader>
          <Form
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            isFormDisabled={isFormDisabled}
            onClose={this.handleClose}
            onDelete={this.handleDelete}
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
  importIndicatorsGroupData: {
    isLoading,
    isImportModalOpen,
    isFormDisabled,
    indicatorsGroup,
    successMessage,
    error,
  },
  indicatorDetails: {
    year,
  },
  country: {
    country,
  },
}) => ({
  isLoading,
  isImportModalOpen,
  isFormDisabled,
  indicatorsGroup,
  successMessage,
  error,
  requestedYear: year,
  countrySlug: country.slug,
  countryId: country.id,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...importActions,
  }, dispatch),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSnackbar,
)(ImportIndicatorsGroupData);
