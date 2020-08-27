import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PropTypes } from 'prop-types';
import { withSnackbar } from 'notistack';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { actions as milestonesActions } from 'redux/milestones';
import { actions as appActions } from 'redux/app';
import { actions as countriesActions } from 'redux/countries';

import AmplitudeService from 'services/amplitude';
import Loader from 'components/Loader';
import ConfirmationModal from 'components/ConfirmationModal';
import ToggleButtonGroup from 'components/material/ToggleButtonGroup';
import Timeline from 'components/Timeline';

import Filters from './Filters';
import Modal from './Modal';
import Toolbar from './Toolbar';
import Header from './Header';
import Body from './Body';
import Pagination from './Pagination';
import * as S from './styled';
import { columns, options, toggleViewItems } from './config';

class Milestones extends Component {
  state = {
    pagination: {
      page: 0,
      rowsPerPage: 10,
      order: 'asc',
      sort: 'id',
    },
    filters: {},
    view: toggleViewItems[0].value,
  }

  static propTypes = {
    actions: PropTypes.shape({
      resetToInitialState: PropTypes.func.isRequired,
      getIndicatorGroupsRequest: PropTypes.func.isRequired,
      getResponsiblePartiesRequest: PropTypes.func.isRequired,
      getMilestonesRequest: PropTypes.func.isRequired,
      openAddEditModal: PropTypes.func.isRequired,
      closeAddEditModal: PropTypes.func.isRequired,
      createMilestoneRequest: PropTypes.func.isRequired,
      updateMilestoneRequest: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      deleteMilestoneRequest: PropTypes.func.isRequired,
    }).isRequired,
    indicatorGroups: PropTypes.array.isRequired,
    responsibleParties: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isMilestonesLoading: PropTypes.bool.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    milestones: PropTypes.object.isRequired,
    milestone: PropTypes.object.isRequired,
    successMessage: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        sectionId: PropTypes.string.isRequired,
        projectId: PropTypes.string.isRequired,
        countryId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }

  componentDidMount() {
    const { actions, match } = this.props;
    const { sectionId, countryId, projectId } = match.params;

    actions.getIndicatorGroupsRequest({ sectionId, countryId, projectId });
    actions.getResponsiblePartiesRequest();
    AmplitudeService.logEvent('Page was visited', { pageTitle: 'Milestones' });
  }

  componentDidUpdate(prevProps) {
    const {
      successMessage,
      error,
      enqueueSnackbar,
      actions,
      match,
    } = this.props;
    const { sectionId, countryId, projectId } = match.params;

    if (successMessage && (prevProps.successMessage !== successMessage)) {
      enqueueSnackbar(successMessage, { variant: 'success' });
      this.handleChangePage(null, 0);
      actions.getIndicatorGroupsRequest({ sectionId, countryId, projectId });
      actions.getResponsiblePartiesRequest();
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.resetToInitialState();
  }

  onToggleChange = (value) => this.setState({ view: value });

  handleFiltersChange = (filters) => {
    const { actions, match } = this.props;

    const { sectionId, projectId, countryId } = match.params;
    const { indicatorId, indicatorsGroupId } = filters;

    this.setState({ filters });
    actions.getMilestonesRequest({
      sectionId, projectId, countryId, indicatorId, indicatorsGroupId, ...filters, ...this.state.pagination,
    });
  }

  handleChangeRowsPerPage = (event) => {
    const { actions, match } = this.props;
    const { sectionId, countryId, projectId } = match.params;

    this.setState({
      pagination: {
        page: 0,
        rowsPerPage: +event.target.value,
      },
    });

    actions.getMilestonesRequest({
      ...this.state.filters, page: 0, rowsPerPage: +event.target.value, sectionId, projectId, countryId,
    });
  };

  handleChangePage = (event, newPage) => {
    const { actions, match } = this.props;
    const { sectionId, projectId, countryId } = match.params;

    this.setState((state) => ({
      pagination: {
        page: newPage,
        rowsPerPage: state.pagination.rowsPerPage,
      },
    }));

    actions.getMilestonesRequest({
      ...this.state.filters, ...this.state.pagination, page: newPage, sectionId, projectId, countryId,
    });
  };

  openModal = (params = {}) => {
    const { actions } = this.props;

    actions.openAddEditModal(params);
  }

  closeModal = () => {
    const { actions } = this.props;

    actions.closeAddEditModal();
  }

  onAddEditSubmit = (values) => {
    const { actions, match, indicatorGroups } = this.props;
    const milestoneData = {
      indicatorId: values.indicatorId,
      name: values.name,
      completionDate: values.completionDate,
      startDate: values.startDate,
      responsibleParty: values.responsibleParty,
      status: values.status,
      remarks: values.remarks,
    };

    const { sectionId, countryId, projectId } = match.params;

    const indicatorsArray = [];
    let getindicatorsGroupId = '';

    indicatorGroups.map((indicatorGroup) => indicatorsArray.push(...indicatorGroup.indicators));
    getindicatorsGroupId = indicatorsArray.find((el) => el.id === values.indicatorId).indicatorsGroupId;

    if (values.id) {
      const milestoneId = values.id;

      actions.updateMilestoneRequest({
        sectionId, projectId, countryId, milestoneData, indicatorGroupId: getindicatorsGroupId, milestoneId,
      });
    } else {
      actions.createMilestoneRequest({
        sectionId, indicatorGroupId: getindicatorsGroupId, milestoneData, countryId, projectId,
      });
    }
  }

  handleConfirmClose = () => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: false, id: 0 });
  };

  handleConfirmClickOpen = (id) => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: true, id });
  };

  onConfirmSubmit = () => {
    const {
      actions, idForDeletion, match,
    } = this.props;
    const {
      filters: { indicatorId, indicatorsGroupId },
    } = this.state;

    const { sectionId, projectId, countryId } = match.params;

    actions.deleteMilestoneRequest({
      milestoneId: idForDeletion,
      indicatorId,
      countryId,
      projectId,
      sectionId,
      indicatorGroupId: indicatorsGroupId,
    });
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  getModalsProps = () => {
    const {
      isModalOpen,
      milestone,
      indicatorGroups,
      responsibleParties,
      isConfirmModalOpen,
      isLoading,
    } = this.props;
    const { filters } = this.state;

    const indicators = [];
    indicatorGroups.forEach((indicatorGroup) => {
      indicators.push(...indicatorGroup.indicators.map((ind) => ({ value: ind.id, name: ind.title })));
    });

    const indicatorTitle = this.state.filters.indicatorId
      ? indicators.filter((indicator) => indicator.value === this.state.filters.indicatorId)[0].name
      : '';

    const modalProps = {
      open: isModalOpen,
      initialValues: milestone,
      onClose: this.closeModal,
      onSubmit: this.onAddEditSubmit,
      indicatorsOptions: indicators,
      isLoading,
      responsibleParties: responsibleParties.map((party) => party.name),
      isFormDisabled: false,
      filters,
    };

    const confirmModalProps = {
      isOpen: isConfirmModalOpen,
      onSubmit: this.onConfirmSubmit,
      onClose: this.handleConfirmClose,
    };

    return {
      modalProps,
      confirmModalProps,
      indicatorTitle,
    };
  }

  render() {
    const {
      indicatorGroups,
      responsibleParties,
      milestones,
      isMilestonesLoading,
      match,
    } = this.props;
    const { projectId, countryId } = match.params;

    const {
      pagination: {
        rowsPerPage,
        page,
        order,
        sort,
      },
    } = this.state;
    const {
      modalProps,
      confirmModalProps,
      indicatorTitle,
    } = this.getModalsProps();

    return (
      <S.Container>
        <S.Link
          to={`/admin/country/${countryId}/projects/${projectId}/dashboard`}
        >
          <ArrowBackIcon /> Back to priorities
        </S.Link>
        <S.Title>
          Milestones
        </S.Title>
        {indicatorGroups.length ? (
          <Filters
            indicatorGroups={indicatorGroups}
            responsibleParties={responsibleParties}
            onChange={this.handleFiltersChange}
          />
        ) : <Loader />}
        <ToggleButtonGroup
          value={this.state.view}
          onChange={this.onToggleChange}
          items={toggleViewItems}
        />
        <S.Content>
          {this.state.view === 'details' && (
            <S.TableWrapper>
              <S.ToolbarWrapper>
                <Toolbar onAdd={this.openModal} />
              </S.ToolbarWrapper>
              <S.StyledTable aria-labelledby="tableTitle">
                <Header
                  headRows={columns}
                  order={order}
                  sort={sort}
                  onRequestSort={this.handleRequestSort}
                />
                <Body
                  onDelete={this.handleConfirmClickOpen}
                  onEdit={this.openModal}
                  rows={milestones ? milestones.results : []}
                  isLoading={isMilestonesLoading}
                />
              </S.StyledTable>
              {(milestones && !isMilestonesLoading) && (
                <Pagination
                  rowsPerPageOptions={options.rowsPerPageOptions}
                  count={milestones.total}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              )}
            </S.TableWrapper>
          )}
          {this.state.view === 'timeline' && (
            <Timeline milestones={milestones ? milestones.results : []} indicatorTitle={indicatorTitle} />
          )}
        </S.Content>
        <Modal {...modalProps} />
        <ConfirmationModal {...confirmModalProps} />
      </S.Container>
    );
  }
}

const mapStateToProps = ({
  milestones: {
    isLoading,
    isModalOpen,
    indicatorGroups,
    responsibleParties,
    milestones,
    milestone,
    successMessage,
    error,
    isMilestonesLoading,
  },
  app: {
    isConfirmModalOpen,
    idForDeletion,
  },
}) => ({
  isLoading,
  isMilestonesLoading,
  isModalOpen,
  indicatorGroups,
  responsibleParties,
  milestones,
  milestone,
  error,
  successMessage,
  isConfirmModalOpen,
  idForDeletion,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...milestonesActions,
    ...countriesActions,
    ...appActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Milestones));
