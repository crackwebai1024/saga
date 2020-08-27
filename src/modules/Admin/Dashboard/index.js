import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withSnackbar } from 'notistack';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { actions as modalActions } from 'redux/app';
import { actions as sectionActions } from 'redux/sections';
import { actions as indicatorsActions } from 'redux/indicators';
import { actions as countriesActions } from 'redux/countries';
import { actions as indicatorsGroupActions } from 'redux/indicatorsGroups';

import { getReorderedArray } from 'helpers/reorderArray';

import ConfirmationModal from 'components/ConfirmationModal';

import AmplitudeService from 'services/amplitude';

import SectionBlock from './SectionBlock';
import IndicatorGroupBlock from './IndicatorGroupBlock';
import SectionModal from './Modals/SectionModal';
import CreateIndicatorOrGroup from './Modals/CreateIndicatorOrGroup';
import EditIndicatorOrGroup from './Modals/EditIndicatorOrGroup';
import EditIndicatorSettings from './Modals/EditIndicatorSettings';
import AddSection from './AddSection';

import * as S from './styled';

class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      getFullStructureRequest: PropTypes.func.isRequired,
      setSectionModalState: PropTypes.func.isRequired,
      setConfirmModalState: PropTypes.func.isRequired,
      createSectionRequest: PropTypes.func.isRequired,
      updateSectionRequest: PropTypes.func.isRequired,
      deleteSectionRequest: PropTypes.func.isRequired,
      updateSectionOrderRequest: PropTypes.func.isRequired,
      setIndicatorOrGroupModalState: PropTypes.func.isRequired,
      setIndicatorOrGroupEditModalState: PropTypes.func.isRequired,
      createIndicatorRequest: PropTypes.func.isRequired,
      deleteIndicatorRequest: PropTypes.func.isRequired,
      updateIndicatorRequest: PropTypes.func.isRequired,
      updateLocalIndicatorOrder: PropTypes.func.isRequired,
      updateIndicatorOrderRequest: PropTypes.func.isRequired,
      createIndicatorsGroupRequest: PropTypes.func.isRequired,
      updateIndicatorsGroupRequest: PropTypes.func.isRequired,
      deleteIndicatorsGroupRequest: PropTypes.func.isRequired,
      updateLocalIndicatorsGroupOrder: PropTypes.func.isRequired,
      updateIndicatorsGroupOrderRequest: PropTypes.func.isRequired,
      updateIndicatorSettingsRequest: PropTypes.func.isRequired,
      setIndicatorSettingsModalState: PropTypes.func.isRequired,
      setSelectedCountryId: PropTypes.func.isRequired,
    }).isRequired,
    t: PropTypes.func.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    sections: PropTypes.array.isRequired,
    isSectionModalOpen: PropTypes.bool.isRequired,
    isSectionFormDisabled: PropTypes.bool.isRequired,
    isIndicatorOrGroupModalOpen: PropTypes.bool.isRequired,
    isIndicatorOrGroupEditModalOpen: PropTypes.bool.isRequired,
    isIndicatorOrGroupFormDisabled: PropTypes.bool.isRequired,
    isIndicatorSettingsModalOpen: PropTypes.bool.isRequired,
    isIndicatorFormDisabled: PropTypes.bool.isRequired,
    isConfirmModalOpen: PropTypes.bool.isRequired,
    idForDeletion: PropTypes.number.isRequired,
    successMessageSection: PropTypes.string.isRequired,
    successMessageIndicators: PropTypes.string.isRequired,
    successMessageIndicatorsGroup: PropTypes.string.isRequired,
    error: PropTypes.string.isRequired,
    match: PropTypes.object.isRequired,
  };

  state = {
    selectedSectionId: undefined,
    selectedIndicatorsGroupId: undefined,
    customFields: [],
    showedIndicatorsGroup: null,
    initialSectionsState: {},
    initialIndicatorsGroupState: {},
    initialIndicatorSettingsState: {},
    isPseudoGroup: false,
    editSettingsDisabled: false,
  };

  componentDidMount() {
    AmplitudeService.logEvent('Page has been visited', { pageTitle: 'Manage Dashboard' });
    this.props.actions.getFullStructureRequest(this.props.match.params);
    this.props.actions.setSelectedCountryId(this.props.match.params.countryId);
  }

  componentDidUpdate(prevProps) {
    const {
      successMessageSection,
      successMessageIndicators,
      successMessageIndicatorsGroup,
      error,
      enqueueSnackbar,
      t,
    } = this.props;

    if (successMessageSection && (prevProps.successMessageSection !== successMessageSection)) {
      enqueueSnackbar(successMessageSection, { variant: 'success' });
    }
    if (successMessageIndicators && (prevProps.successMessageIndicators !== successMessageIndicators)) {
      enqueueSnackbar(successMessageIndicators, { variant: 'success' });
      if (successMessageIndicators !== t('manageDashboard.custom_fields_have_been_successfully_updated')) {
        this.closeIndicatorSettings();
      }
    }
    if (successMessageIndicatorsGroup && (prevProps.successMessageIndicatorsGroup !== successMessageIndicatorsGroup)) {
      enqueueSnackbar(successMessageIndicatorsGroup, { variant: 'success' });
    }

    if (error && (prevProps.error !== error)) {
      enqueueSnackbar(error, { variant: 'error' });
    }
  }

  openSectionsModal = (initialState) => {
    const { actions } = this.props;

    if (initialState) {
      this.setState({ initialSectionsState: initialState });
    }

    actions.setSectionModalState(true);
  };

  closeSectionsModal = () => {
    const { actions } = this.props;

    actions.setSectionModalState(false);
    this.setState({ initialSectionsState: {} });
  };

  onSectionsSubmit = (values) => {
    const {
      projectId,
      countryId,
    } = this.props.match.params;
    const data = {
      title: values.title,
      projectId,
      countryId,
    };

    const {
      actions,
    } = this.props;

    if (values.id) {
      data.id = values.id;
      actions.updateSectionRequest(data);
    } else {
      actions.createSectionRequest(data);
    }
  };

  handleConfirmSectionDelete = (id) => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: true, id });
  };

  handleConfirmIndicatorGroupDelete = (sectionId, id, isPseudoGroup) => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: true, id });
    this.setState({
      selectedSectionId: sectionId,
      isPseudoGroup: !!isPseudoGroup,
    });
  };

  handleConfirmIndicatorDelete = (sectionId, indicatorsGroupId, id) => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: true, id });
    this.setState({
      selectedSectionId: sectionId,
      selectedIndicatorsGroupId: indicatorsGroupId,
    });
  };

  handleConfirmClose = () => {
    const { actions } = this.props;

    actions.setConfirmModalState({ state: false, id: 0 });
    this.setState({
      selectedSectionId: undefined,
      selectedIndicatorsGroupId: undefined,
      isPseudoGroup: false,
    });
  };

  onConfirmSubmit = () => {
    const {
      actions,
      idForDeletion,
    } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    const {
      selectedSectionId,
      selectedIndicatorsGroupId,
      isPseudoGroup,
      title,
    } = this.state;

    if (selectedIndicatorsGroupId) {
      actions.deleteIndicatorRequest({
        id: idForDeletion,
        countryId,
        projectId,
        sectionId: selectedSectionId,
        indicatorsGroupId: selectedIndicatorsGroupId,
        title,
      });
    } else if (selectedSectionId) {
      actions.deleteIndicatorsGroupRequest({
        id: idForDeletion,
        sectionId: selectedSectionId,
        countryId,
        projectId,
        title,
        isPseudoGroup,
      });
    } else {
      actions.deleteSectionRequest({
        id: idForDeletion,
        countryId,
        projectId,
      });
    }
    actions.setConfirmModalState({ state: false, id: 0 });
  };

  onLeavingSubmit = () => {
    const { actions } = this.props;

    this.closeIndicatorSettings(false);
    actions.setConfirmModalState({ state: false });
  };

  onIndicatorOrGroupSubmit = (values) => {
    const {
      actions,
    } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    if (values.type === 'indicator') {
      actions.createIndicatorRequest({
        projectId,
        countryId,
        indicatorsGroupId: 0,
        sectionId: this.state.selectedSectionId,
        indicator: {
          title: values.title,
        },
      });
    } else {
      actions.createIndicatorsGroupRequest({
        projectId,
        countryId,
        sectionId: this.state.selectedSectionId,
        id: this.state.selectedIndicatorsGroupId,
        indicatorsGroup: {
          title: values.title,
        },
      });
    }
  };

  onIndicatorSubmit = (values) => {
    const {
      actions,
    } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    const {
      showedIndicatorsGroup: {
        sectionId,
        id,
      },
    } = this.state;

    actions.createIndicatorRequest({
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId: id,
      indicator: {
        title: values.title,
      },
    });
    this.setState({
      selectedSectionId: undefined,
    });
  };

  openIndicatorOrGroupModal = (sectionId) => {
    const { actions } = this.props;

    actions.setIndicatorOrGroupModalState(true);
    this.setState({
      selectedSectionId: sectionId,
    });
  };

  closeIndicatorOrGroupModal = () => {
    const { actions } = this.props;

    actions.setIndicatorOrGroupModalState(false);
    this.setState({
      selectedSectionId: undefined,
    });
  };

  openIndicatorOrGroupEditModal = (sectionId, initialValues) => {
    const { actions } = this.props;

    actions.setIndicatorOrGroupEditModalState(true);
    this.setState({
      initialIndicatorsGroupState: initialValues,
      selectedSectionId: sectionId,
    });
  };

  closeIndicatorOrGroupEditModal = () => {
    const { actions } = this.props;

    actions.setIndicatorOrGroupEditModalState(false);
    this.setState({
      initialIndicatorsGroupState: {},
      selectedSectionId: undefined,
    });
  };

  onIndicatorOrGroupEditSubmit = (values) => {
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    const data = {
      ...values,
      countryId,
      projectId,
      sectionId: this.state.selectedSectionId,
    };
    const {
      actions,
    } = this.props;

    if (data.indicatorsGroupId) {
      actions.updateIndicatorRequest(data);
    } else {
      actions.updateIndicatorsGroupRequest(data);
    }
  };

  openIndicatorSettings = (sectionId, indicatorsGroupId, initialValues, customFields, dataCount) => {
    const { actions } = this.props;
    actions.setIndicatorSettingsModalState(true);
    this.setState({
      initialIndicatorSettingsState: initialValues,
      selectedSectionId: sectionId,
      selectedIndicatorsGroupId: indicatorsGroupId,
      customFields: customFields.sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10)),
      editSettingsDisabled: dataCount > 0,
    });
  };

  closeIndicatorSettings = (dirty) => {
    const { actions, t } = this.props;

    // eslint-disable-next-line no-alert
    if (dirty && !window.confirm(t('common.confirm_leaving'))) {
      return;
    }
    actions.setIndicatorSettingsModalState(false);
    this.setState({
      initialIndicatorSettingsState: {},
      selectedSectionId: undefined,
      selectedIndicatorsGroupId: undefined,
    });
  };

  onIndicatorSettingsSubmit = (values) => {
    const valuesToSend = { ...values };
    if (valuesToSend.hasGrouping === false
      || valuesToSend.chartVisualizationType === 'by_group'
      || valuesToSend.secondaryGrouping === 'none') {
      valuesToSend.secondaryGrouping = null;
    }
    if (valuesToSend.chartVisualizationType === 'by_secondary') {
      valuesToSend.chartVisualizationType = 'by_group';
    }
    if (valuesToSend.calculationType !== 'real' && valuesToSend.chartVisualizationType === 'by_name') {
      valuesToSend.chartVisualizationType = 'none';
    }
    if (
      valuesToSend.calculationType === 'real'
      && !['by_day', 'by_name', 'none'].includes(valuesToSend.chartVisualizationType)
    ) {
      valuesToSend.chartVisualizationType = 'none';
    }
    if (valuesToSend.calculationType === 'real') {
      valuesToSend.mapGroupingType = 'none';
    }
    const {
      projectId,
      countryId,
    } = this.props.match.params;
    const data = {
      ...valuesToSend,
      countryId,
      projectId,
      sectionId: this.state.selectedSectionId,
      indicatorsGroupId: this.state.selectedIndicatorsGroupId,
    };
    const {
      actions,
    } = this.props;

    actions.updateIndicatorSettingsRequest(data);
  };

  openIndicatorsGroup = (indicatorsGroup) => {
    this.setState({
      showedIndicatorsGroup: { ...indicatorsGroup },
    });
  };

  closeIndicatorsGroup = () => {
    this.setState({
      showedIndicatorsGroup: null,
    });
  };

  getOrderedSections = (src, dest) => {
    const { sections } = this.props;

    const orderedList = [...sections];
    const [cuttedSection] = orderedList.splice(src, 1);
    orderedList.splice(dest, 0, cuttedSection);

    return orderedList;
  };

  orderUpdate = (current, newOrder) => {
    const { actions } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;
    const ids = this.getOrderedSections(current, newOrder).map((section) => section.id);

    actions.updateSectionOrderRequest({
      countryId,
      projectId,
      order: ids,
    });
  };

  onIndicatorsGroupOrderUpdate = (newIndex, oldIndex, sectionId) => {
    const { actions, sections } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    if (newIndex === oldIndex) {
      return;
    }

    const updatedSections = sections.map((section) => ({ ...section }));
    const sectionToUpdate = updatedSections.filter((section) => section.id === sectionId)[0];
    const orderedIndicatorsGroups = getReorderedArray(sectionToUpdate.indicatorGroups, newIndex, oldIndex);
    sectionToUpdate.indicatorGroups = orderedIndicatorsGroups;

    actions.updateLocalIndicatorsGroupOrder(updatedSections);
    actions.updateIndicatorsGroupOrderRequest({
      countryId,
      projectId,
      sectionId,
      order: orderedIndicatorsGroups.map((indicatorsGroup) => indicatorsGroup.id),
    });
  };

  handleIndicatorOrderUpdate = (newIndex, oldIndex, sectionId, indicatorsGroupId) => {
    const { actions, sections } = this.props;
    const {
      projectId,
      countryId,
    } = this.props.match.params;
    if (newIndex === oldIndex) {
      return;
    }

    const updatedSections = sections.map((section) => ({ ...section }));
    const sectionToUpdate = updatedSections.filter((section) => section.id === sectionId)[0];
    sectionToUpdate.indicatorGroups = sectionToUpdate.indicatorGroups.map((item) => ({ ...item }));
    const indicatorsGroupToUpdate = sectionToUpdate.indicatorGroups
      .filter((group) => group.id === indicatorsGroupId)[0];

    const orderedIndicators = getReorderedArray(indicatorsGroupToUpdate.indicators, newIndex, oldIndex);
    indicatorsGroupToUpdate.indicators = orderedIndicators;

    actions.updateLocalIndicatorOrder(updatedSections);
    actions.updateIndicatorOrderRequest({
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      order: orderedIndicators.map((indicatorsGroup) => indicatorsGroup.id),
    });
  };

  render() {
    const {
      sections,
      isSectionModalOpen,
      isSectionFormDisabled,
      isIndicatorOrGroupModalOpen,
      isIndicatorOrGroupEditModalOpen,
      isIndicatorOrGroupFormDisabled,
      isIndicatorSettingsModalOpen,
      isIndicatorFormDisabled,
      isConfirmModalOpen,
    } = this.props;

    const {
      initialSectionsState,
      initialIndicatorsGroupState,
      initialIndicatorSettingsState,
      showedIndicatorsGroup,
      customFields,
      editSettingsDisabled,
    } = this.state;
    const {
      projectId,
      countryId,
    } = this.props.match.params;

    const sectionBlockActions = {
      openIndicatorOrGroupModal: this.openIndicatorOrGroupModal,
      onEditSection: this.openSectionsModal,
      onDeleteSection: this.handleConfirmSectionDelete,
      onEditIndicatorOrGroup: this.openIndicatorOrGroupEditModal,
      onEditIndicatorSettings: this.openIndicatorSettings,
      onEditIndicatorsGroupSettings: this.openIndicatorsGroup,
      onDeleteIndicatorGroup: this.handleConfirmIndicatorGroupDelete,
      onOrderUpdate: this.orderUpdate,
      onIndicatorsGroupOrderUpdate: this.onIndicatorsGroupOrderUpdate,
    };

    const indicatorsGroupBlockActions = {
      openIndicatorModal: this.openIndicatorOrGroupModal,
      closeIndicatorsGroup: this.closeIndicatorsGroup,
      onEditIndicator: this.openIndicatorOrGroupEditModal,
      onEditIndicatorSettings: this.openIndicatorSettings,
      onDeleteIndicator: this.handleConfirmIndicatorDelete,
      onIndicatorOrderUpdate: this.handleIndicatorOrderUpdate,
    };

    return (
      <S.Content>
        <S.Link
          to="/admin/projects"
        >
          <ArrowBackIcon /> Back to projects
        </S.Link>
        {showedIndicatorsGroup ? (
          <IndicatorGroupBlock
            indicatorsGroupActions={indicatorsGroupBlockActions}
            countryId={countryId}
            projectId={projectId}
            sectionId={showedIndicatorsGroup.sectionId}
            indicatorsGroupId={showedIndicatorsGroup.id}
          />
        ) : (
          null
        )}
        {!showedIndicatorsGroup ? (
          <>
            {sections.map((section, index) => (
              <SectionBlock
                key={section.id}
                order={index}
                countryId={countryId}
                maxOrder={sections.length - 1}
                section={section}
                sectionActions={sectionBlockActions}
              />
            ))}
            <AddSection onAdd={this.openSectionsModal} />
          </>
        ) : null}
        <SectionModal
          open={isSectionModalOpen}
          initialValues={initialSectionsState}
          onClose={this.closeSectionsModal}
          onSubmit={this.onSectionsSubmit}
          isFormDisabled={isSectionFormDisabled}
        />
        <CreateIndicatorOrGroup
          type={showedIndicatorsGroup ? 'indicator' : ''}
          open={isIndicatorOrGroupModalOpen}
          onClose={this.closeIndicatorOrGroupModal}
          onSubmit={showedIndicatorsGroup ? this.onIndicatorSubmit : this.onIndicatorOrGroupSubmit}
          isFormDisabled={isIndicatorOrGroupFormDisabled}
        />
        <EditIndicatorOrGroup
          open={isIndicatorOrGroupEditModalOpen}
          onSubmit={this.onIndicatorOrGroupEditSubmit}
          onClose={this.closeIndicatorOrGroupEditModal}
          initialValues={initialIndicatorsGroupState}
          isFormDisabled={isIndicatorOrGroupFormDisabled}
        />
        <EditIndicatorSettings
          key={initialIndicatorSettingsState.id}
          open={isIndicatorSettingsModalOpen}
          onSubmit={this.onIndicatorSettingsSubmit}
          onClose={this.closeIndicatorSettings}
          initialValues={initialIndicatorSettingsState}
          customFields={customFields}
          isFormDisabled={isIndicatorFormDisabled}
          projectId={projectId}
          countryId={countryId}
          sectionId={this.state.selectedSectionId}
          indicatorsGroupId={this.state.selectedIndicatorsGroupId}
          editSettingsDisabled={editSettingsDisabled}
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
  },
  sections: {
    sections,
    isFormDisabled,
    isModalOpen,
    isIndicatorOrGroupModalOpen,
    isIndicatorOrGroupEditModalOpen,
    successMessage: successMessageSection,
    error,
  },
  indicators: {
    isFormDisabled: isIndicatorFormDisabled,
    isIndicatorSettingsModalOpen,
    successMessage: successMessageIndicators,
  },
  indicatorsGroups: {
    isFormDisabled: isIndicatorGroupFormDisabled,
    successMessage: successMessageIndicatorsGroup,
  },
}) => ({
  countriesList: allowedList,
  sections,
  isConfirmModalOpen,
  idForDeletion,
  isSectionFormDisabled: isFormDisabled,
  isSectionModalOpen: isModalOpen,
  isIndicatorOrGroupModalOpen,
  isIndicatorOrGroupEditModalOpen,
  isIndicatorOrGroupFormDisabled: isIndicatorFormDisabled || isIndicatorGroupFormDisabled,
  isIndicatorFormDisabled,
  isIndicatorSettingsModalOpen,
  successMessageSection,
  successMessageIndicators,
  successMessageIndicatorsGroup,
  error,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...modalActions,
    ...sectionActions,
    ...indicatorsActions,
    ...indicatorsGroupActions,
    ...countriesActions,
  }, dispatch),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withSnackbar(withTranslation()(Dashboard)),
  ),
);
