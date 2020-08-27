import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';

import { actions as usersActions } from 'redux/users';
import { actions as modalActions } from 'redux/app';
import { actions as countryActions } from 'redux/country';

import AmplitudeService from 'services/amplitude';
import getIdByTitle from 'helpers/getIdByTitle';
import * as rowsPagination from 'helpers/pagination';

import ConfirmationModal from 'components/ConfirmationModal';
import Select from 'modules/Country/Dashboard/Select';

import Toolbar from './Toolbar';
import TargetModal from './Modal';
import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';
import BackArrow from './BackArrow';
import * as S from './styled';

import { columns, options } from './config';

class ManageTargets extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      onProjectChangeRequest: PropTypes.func.isRequired,
      deleteTargetRequest: PropTypes.func.isRequired,
      fetchCountryRequest: PropTypes.func.isRequired,
      fetchTargetsRequest: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      targetSetModalState: PropTypes.func.isRequired,
      registerTargetRequest: PropTypes.func.isRequired,
      updateTargetRequest: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        country: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    targets: PropTypes.object.isRequired,
    country: PropTypes.object.isRequired,
    details: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired,
    selectedProject: PropTypes.object.isRequired,
    currentUser: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
  };

  state = {
    order: 'asc',
    orderBy: 'year',
    initialValues: {},
    page: 0,
    rowsPerPage: options.rowsPerPageOptions[2],
    selectedYear: 0,
    selectedTarget: 0,
    title: '',
  };

  static getDerivedStateFromProps(props, state) {
    const count = props.targets ? props.targets.count : 0;
    const {
      page,
      rowsPerPage,
    } = state;

    return rowsPagination.isPageOutOfRange(count, rowsPerPage, page) ? ({
      page: 0,
    }) : null;
  }

  componentDidMount() {
    const { actions, match } = this.props;

    actions.fetchCountryRequest({
      slug: match.params.country,
    });
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Manage Targets',
      country: match.params.country,
    });
  }

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      error,
      enqueueSnackbar,
      actions,
      country,
      selectedProject,
    } = this.props;
    const {
      order,
      orderBy,
      page,
      rowsPerPage,
      selectedYear,
    } = this.state;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      this.closeModal();
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }

    if ((country && this.props.selectedProject !== prevProps.selectedProject)) {
      actions.fetchTargetsRequest({
        year: selectedYear ? parseInt(selectedYear, 10) : null,
        countryId: country.id,
        projectId: selectedProject.id,
        order,
        sort: orderBy,
        page,
        rowsPerPage,
      });
    }
  }

  onProjectChange = (value) => {
    this.props.actions.onProjectChangeRequest(value);
  }

  getBody() {
    const {
      rowsPerPage, page, order, orderBy,
    } = this.state;
    const {
      currentUser,
      targets,
    } = this.props;
    const count = this.props.targets ? this.props.targets.count : 0;
    const emptyRows = options.minRowsPerPage - Math.min(options.minRowsPerPage, count - (page * rowsPerPage));

    if (!targets) {
      return <div />;
    }

    return (
      <>
        <S.TableWrapper>
          <S.StyledTable aria-labelledby="tableTitle">
            <Header
              headRows={columns}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
            />
            <Body
              onDelete={this.handleConfirmClickOpen}
              onEdit={this.setInitialValues}
              rows={targets.items}
              emptyRows={emptyRows}
              currentUser={currentUser}
              setText={this.setConfirmationText}
            />
          </S.StyledTable>
        </S.TableWrapper>
        <Pagination
          rowsPerPageOptions={options.rowsPerPageOptions}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </>
    );
  }

  reloadTargets = () => {
    const {
      actions,
      country,
      selectedProject,
      details,
    } = this.props;

    const {
      order, orderBy, page, rowsPerPage, selectedTarget, selectedYear,
    } = this.state;

    if (!selectedTarget && !selectedYear) {
      actions.fetchTargetsRequest({
        countryId: country.id, projectId: selectedProject.id, order, sort: orderBy, page, rowsPerPage,
      });
    }
    if (selectedYear && !selectedTarget) {
      actions.fetchTargetsRequest({
        year: parseInt(selectedYear, 10),
        countryId: country.id,
        projectId: selectedProject.id,
        order,
        sort: orderBy,
        page,
        rowsPerPage,
      });
    }
    if (selectedTarget && !selectedYear) {
      actions.fetchTargetsRequest({
        id: getIdByTitle(details.sections, selectedTarget),
        countryId: country.id,
        projectId: selectedProject.id,
        order,
        sort: orderBy,
        page,
        rowsPerPage,
      });
    }
    if (selectedTarget && selectedYear) {
      actions.fetchTargetsRequest({
        id: getIdByTitle(details.sections, selectedTarget),
        year: parseInt(selectedYear, 10),
        countryId: country.id,
        projectId: selectedProject.id,
        order,
        sort: orderBy,
        page,
        rowsPerPage,
      });
    }
  };

  handleRequestSort = (event, property) => {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({
      order: isDesc ? 'asc' : 'desc',
      orderBy: property,
      page: 0,
    }, this.reloadTargets);
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    }, this.reloadTargets);
  };

  setInitialValues = (initialValues) => {
    this.setState({ initialValues }, () => {
      this.openModal();
    });
  };

  handleChangeRowsPerPage = (event) => {
    const rowsPerPage = +event.target.value;

    this.setState({
      rowsPerPage,
      page: 0,
    }, this.reloadTargets);
  };

  handleConfirmClickOpen = (target) => {
    const { actions } = this.props;
    const { id, title } = target;
    this.setState({
      title,
    });
    actions.setConfirmModalState({ state: true, id, title });
  };

  handleConfirmClose = () => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: false, id: 0 });
  };

  onConfirmSubmit = () => {
    const {
      actions,
      idForDeletion,
      country,
      selectedProject,
      details,
    } = this.props;
    const count = this.props.targets ? this.props.targets.count : 0;
    const {
      page,
      rowsPerPage,
      orderBy: sort,
      order,
      selectedYear,
      selectedTarget,
    } = this.state;

    const resettedPage = rowsPagination.isPageOutOfRange(count - 1, rowsPerPage, page) ? 0 : page;

    actions.deleteTargetRequest({
      id: idForDeletion,
      rowsPerPage,
      page: resettedPage,
      order,
      sort,
      countryId: country.id,
      projectId: selectedProject.id,
      selectedTarget: selectedTarget ? getIdByTitle(details.sections, selectedTarget) : null,
      selectedYear: selectedYear ? parseInt(selectedYear, 10) : null,
    });
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  openModal = () => {
    const { actions } = this.props;

    actions.targetSetModalState(true);
  };

  closeModal = () => {
    const { actions } = this.props;

    actions.targetSetModalState(false);
    this.setState({ initialValues: {} });
  };

  onSubmit = (values) => {
    const {
      actions: { registerTargetRequest, updateTargetRequest },
      country,
      selectedProject,
      details,
    } = this.props;
    const {
      page,
      rowsPerPage,
      orderBy: sort,
      order,
      selectedYear,
      selectedTarget,
    } = this.state;

    const {
      year, id,
    } = values;
    let { value } = values;

    value = parseFloat(value);
    const indicatorId = getIdByTitle(details.sections, values.title);
    const isPrimary = typeof (values.isPrimary) === 'object' ? values.isPrimary.length > 0 : values.isPrimary;
    if (values.id) {
      updateTargetRequest({
        value,
        year,
        id,
        page,
        rowsPerPage,
        sort,
        order,
        countryId: country.id,
        projectId: selectedProject.id,
        isPrimary,
        selectedTarget: selectedTarget ? getIdByTitle(details.sections, selectedTarget) : null,
        selectedYear: selectedYear ? parseInt(selectedYear, 10) : null,
      });
    } else {
      registerTargetRequest({
        value,
        year,
        id,
        page,
        rowsPerPage,
        sort,
        order,
        countryId: country.id,
        projectId: selectedProject.id,
        indicatorId,
        isPrimary,
        selectedTarget: selectedTarget ? getIdByTitle(details.sections, selectedTarget) : null,
        selectedYear: selectedYear ? parseInt(selectedYear, 10) : null,
      });
    }
  };

  handleSelectYear = (event) => {
    const { value } = event.target;
    const {
      country: { id: countryId },
    } = this.props;

    this.setState({
      selectedYear: value,
    }, this.reloadTargets);
    AmplitudeService.logEvent('Year has been selected', { countryId, selectedYear: this.state.selectedYear });
  };

  handleSelectTarget = (event) => {
    const { value } = event.target;
    const {
      country: { id: countryId },
    } = this.props;

    this.setState({
      selectedTarget: value,
    }, this.reloadTargets);
    AmplitudeService.logEvent('Indicator has been selected', {
      countryId,
      selectedTarget: this.state.selectedTarget,
    });
  };

  render() {
    const {
      initialValues,
      selectedYear,
      selectedTarget,
      title,
    } = this.state;

    const {
      isModalOpen,
      isConfirmModalOpen,
      isFormDisabled,
      targets,
      details,
      currentUser,
      projects,
      selectedProject,
    } = this.props;

    if (currentUser.role === 'viewer') {
      return null;
    }

    return (
      <S.Root>
        <Select
          title="Project"
          name="project"
          items={projects}
          selected={selectedProject}
          onChange={this.onProjectChange}
        />
        <BackArrow />
        <S.StyledPaper>
          <Toolbar
            onAdd={this.openModal}
            targets={targets}
            details={details}
            onSelectYear={this.handleSelectYear}
            yearValue={selectedYear}
            onSelectTarget={this.handleSelectTarget}
            targetValue={selectedTarget}
          />
          {this.getBody()}
        </S.StyledPaper>
        <TargetModal
          open={isModalOpen}
          initialValues={initialValues}
          onClose={this.closeModal}
          onSubmit={this.onSubmit}
          isFormDisabled={isFormDisabled}
          details={details}
        />
        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onSubmit={this.onConfirmSubmit}
          onClose={this.handleConfirmClose}
          title={title}
        />
      </S.Root>
    );
  }
}

const mapStateToProps = ({
  users: {
    usersList,
  },
  app: {
    isConfirmModalOpen,
    idForDeletion,
  },
  auth: {
    user,
  },
  countries: {
    formList,
    allowedList,
  },
  country: {
    isModalOpen,
    successMessage,
    isFormDisabled,
    error,
    country,
    details,
    selectedProject,
    projects,
    targets,
  },
}) => ({
  users: usersList,
  currentUser: user,
  isModalOpen,
  successMessage,
  isFormDisabled,
  error,
  isConfirmModalOpen,
  idForDeletion,
  countriesList: formList,
  allowedCountries: allowedList,
  country,
  details,
  projects,
  selectedProject,
  targets,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...usersActions,
    ...modalActions,
    ...countryActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar((ManageTargets)));
