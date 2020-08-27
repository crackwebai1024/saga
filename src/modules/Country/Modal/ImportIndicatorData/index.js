import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router-dom';

import { getIndicatorTemplateLink } from 'http/templates';
import { getIndicators } from 'redux/importIndicatorData/selectors';
import { actions as importActions } from 'redux/importIndicatorData';

import FormHelperText from '@material-ui/core/FormHelperText';
import LinearProgress from '@material-ui/core/LinearProgress';
import Modal from '@material-ui/core/Modal';
import Form from './Form/index';
import * as S from './styled';

class ImportIndicatorData extends Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    // connect
    match: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
    indicatorsList: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isImportModalOpen: PropTypes.bool.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    indicator: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      closeImportModalState: PropTypes.func.isRequired,
      importIndicatorDataRequest: PropTypes.func.isRequired,
    }).isRequired,
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
      match: {
        params: {
          country: countrySlug,
        },
      },
      year,
      indicator: { id },
    } = this.props;
    const payload = {
      ...values,
      requestedYear: year,
      countrySlug,
      id,
    };
    actions.importIndicatorDataRequest(payload);
  };

  handleClose = () => {
    const { actions } = this.props;

    actions.closeImportModalState();
  };

  render() {
    const {
      isLoading,
      isImportModalOpen,
      isFormDisabled,
      error,
      indicator: {
        id,
        reportingPeriodType,
      },
      indicatorsList,
      t,
    } = this.props;

    const initialValues = {
      indicatorId: id,
    };
    return (
      <Modal
        open={isImportModalOpen}
        onClose={this.handleClose}
      >
        <S.Modal>
          <S.Title>{t('common.import_statistic')}</S.Title>
          <S.Loader isLoading={isLoading}>
            <LinearProgress />
          </S.Loader>
          <S.LinkWrapper>
            <S.DownloadLink
              href={getIndicatorTemplateLink(id)}
              download
            >
              {t('country.download_indicator_import_template')}
            </S.DownloadLink>
          </S.LinkWrapper>
          <Form
            onSubmit={this.handleSubmit}
            initialValues={initialValues}
            isFormDisabled={isFormDisabled}
            onClose={this.handleClose}
            indicatorsList={indicatorsList}
            reportingPeriodType={reportingPeriodType}
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
  indicatorDetails: {
    year,
  },
  importIndicatorData: {
    isLoading,
    isImportModalOpen,
    isFormDisabled,
    indicator,
    successMessage,
    error,
  },
  country,
}) => ({
  year,
  isLoading,
  isImportModalOpen,
  isFormDisabled,
  indicator,
  successMessage,
  error,
  indicatorsList: getIndicators(country),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...importActions,
  }, dispatch),
});

export default withRouter(compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withSnackbar,
)(ImportIndicatorData));
