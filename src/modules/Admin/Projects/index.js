import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';

import { actions as modalActions } from 'redux/app';
import { actions as projectsActions } from 'redux/projects';
import { actions as countriesActions } from 'redux/countries';

import AmplitudeService from 'services/amplitude';
import * as rowsPagination from 'helpers/pagination';

import ConfirmationModal from 'components/ConfirmationModal';

import Modal from './Modal';
import Header from './Header';
import Table from './Table';

import * as S from './styled';

class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      setSelectedCountryId: PropTypes.func.isRequired,
      getAllProjects: PropTypes.func.isRequired,
      setProjectModalState: PropTypes.func.isRequired,
      deleteProjectRequest: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      createProjectRequest: PropTypes.func.isRequired,
      updateProjectRequest: PropTypes.func.isRequired,
    }).isRequired,
    selectedCountryId: PropTypes.number,
    countriesList: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    allCount: PropTypes.number.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  static defaultProps = {
    selectedCountryId: null,
  };

  state = {
    selectedCountry: this.props.selectedCountryId || this.props.match.params.slug,
    initialValues: {},
  };

  componentDidMount() {
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Manage Project' });
    this.props.actions.setSelectedCountryId();
  }

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      error,
      enqueueSnackbar,
    } = this.props;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }

  handleSelectCountry = (event) => {
    const { value } = event.target;

    this.setState({
      selectedCountry: value,
    });

    this.props.actions.getAllProjects(value);
  };

  onModalSubmit = (initialValues) => {
    const { actions: { updateProjectRequest, createProjectRequest } } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    if (initialValues.id) {
      updateProjectRequest({
        ...initialValues,
        page,
        rowsPerPage,
        orderBy,
        order,
      });
    } else {
      createProjectRequest({
        ...initialValues,
        page,
        rowsPerPage,
        orderBy,
        order,
      });
    }
  };

  onConfirmSubmit = () => {
    const {
      actions,
      idForDeletion,
      allCount,
    } = this.props;
    const {
      selectedCountry,
      page,
      rowsPerPage,
      orderBy,
      order,
    } = this.state;

    const resettedPage = rowsPagination.isPageOutOfRange(allCount - 1, rowsPerPage, page) ? 0 : page;

    actions.deleteProjectRequest({
      id: idForDeletion,
      countryId: selectedCountry,
      rowsPerPage,
      page: resettedPage,
      order,
      orderBy,
    });
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  handleConfirmClickOpen = (e, id) => {
    const { actions } = this.props;

    e.stopPropagation();
    actions.setConfirmModalState({ state: true, id });
  };

  handleConfirmClose = () => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: false, id: 0 });
  };

  handleModalClickOpen = (e, initialValues = {}) => {
    const { actions } = this.props;
    const { selectedCountry } = this.state;

    e.stopPropagation();
    this.setState({
      initialValues: {
        ...initialValues,
        countryId: selectedCountry,
      },

    }, () => {
      actions.setProjectModalState(true);
    });
  };

  handleModalClickClose = () => {
    const { actions } = this.props;

    this.setState({ initialValues: {} }, () => {
      actions.setProjectModalState(false);
    });
  };

  render() {
    const {
      countriesList,
      projects,
      isLoading,
      isConfirmModalOpen,
      isModalOpen,
      isFormDisabled,
    } = this.props;

    const {
      selectedCountry,
      initialValues,
    } = this.state;

    if (selectedCountry && typeof selectedCountry !== 'number' && countriesList.length > 0) {
      const countries = countriesList.filter((country) => country.slug === selectedCountry);
      if (countries.length > 0) {
        this.setState({ selectedCountry: countries[0].id });
        this.props.actions.getAllProjects(countries[0].id);
      }
    }

    return (
      <S.Content>
        <Header
          countriesList={countriesList}
          selectedCountry={selectedCountry}
          handleSelectCountry={this.handleSelectCountry}
          onAdd={this.handleModalClickOpen}
        />
        <Table
          projects={projects}
          onEdit={this.handleModalClickOpen}
          onDelete={this.handleConfirmClickOpen}
          selectedCountry={selectedCountry}
          isLoading={isLoading}
        />
        <Modal
          open={isModalOpen}
          initialValues={initialValues}
          onClose={this.handleModalClickClose}
          onSubmit={this.onModalSubmit}
          isFormDisabled={isFormDisabled}
        />
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onSubmit={this.onConfirmSubmit}
          onClose={this.handleConfirmClose}
        />
      </S.Content>
    );
  }
}

const mapStateToProps = ({
  app: {
    isConfirmModalOpen,
    idForDeletion,
  },
  countries: {
    allowedList,
    selectedCountryId,
  },
  projects: {
    projects,
    isLoading,
    isModalOpen,
    isFormDisabled,
    successMessage,
    error,
  },

}) => ({
  countriesList: allowedList,
  isConfirmModalOpen,
  idForDeletion,
  selectedCountryId,
  projects,
  isLoading,
  isModalOpen,
  isFormDisabled,
  successMessage,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...modalActions,
    ...countriesActions,
    ...projectsActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(withTranslation()(Dashboard)));
