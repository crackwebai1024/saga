import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { actions as indicatorsActions } from 'redux/indicators';

import Modal from '@material-ui/core/Modal';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormHelperText from '@material-ui/core/FormHelperText';

import TabPanel from './TabPanel';
import Form from './Form';
import CustomFields from './CustomFields';
import GroupsColors from './GroupsColors';

import * as S from './styled';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

class EditIndicatorSettings extends Component {
  state = {
    value: 0,
    list: [],
    hasSecondLevelGrouping: !!this.props.initialValues.hasGrouping,
    indicatorSettingsValues: this.props.initialValues,
    errorModal: '',
    someChanged: false,
  }

  componentDidUpdate() {
    const { colors, t } = this.props;
    const { indicatorSettingsValues, errorModal } = this.state;
    const notValid = indicatorSettingsValues.hasGrouping
      && (indicatorSettingsValues.secondaryGrouping !== null && indicatorSettingsValues.secondaryGrouping !== 'none')
      && !colors.length;

    if (notValid && !errorModal) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        errorModal: t('invalid.please_specify_colors_for_2nd_Level_of_Grouping'),
      });
    }
    if (!notValid && errorModal) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        errorModal: '',
      });
    }
  }

  updateList = (fields) => {
    this.setState({
      list: fields,
    });
  }

  handleChangeIndicatorSettings = ({ values, dirty }) => {
    this.setState({
      indicatorSettingsValues: values,
      someChanged: dirty,
    });
  };

  /**
   * Use for submiting from components other than IndicatorSettingsForm
   * @param { object } values IndicatorSettingsForm values
   */
  handleModalSubmit = (values) => {
    const { onSubmit } = this.props;

    if (!values) {
      onSubmit(this.state.indicatorSettingsValues);
    } else {
      onSubmit(values);
    }
  };

  handleChangeHasGrouping = (value) => {
    const { hasSecondLevelGrouping } = this.state;
    if (hasSecondLevelGrouping !== value) {
      this.setState({
        hasSecondLevelGrouping: value,
      });
    }
  };

  handleTabChange = (event, newValue) => {
    this.setState({
      value: newValue,
    });

    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      initialValues,
      actions,
      editSettingsDisabled,
    } = this.props;
    const {
      list,
      value,
    } = this.state;
    if (value === 1 && !editSettingsDisabled) {
      actions.updateCustomFieldsRequest({
        customFields: list,
        countryId,
        projectId,
        sectionId,
        indicatorsGroupId,
        indicatorId: initialValues.indicatorId,
      });
    }
  }

  render() {
    const { hasSecondLevelGrouping, errorModal, someChanged } = this.state;
    const
      {
        open,
        onSubmit,
        onClose,
        initialValues,
        customFields,
        isFormDisabled,
        countryId,
        projectId,
        sectionId,
        indicatorsGroupId,
        editSettingsDisabled,
      } = this.props;

    return (
      <Modal
        open={open}
        onClose={() => onClose(someChanged)}
      >
        <S.Modal>
          <AppBar position="static">
            <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="Indicator's tabs">
              <Tab label="Indicator Settings" {...a11yProps(0)} />
              <Tab label="Custom Fields" {...a11yProps(1)} />
              <Tab label="Group Colors" {...a11yProps(2)} disabled={!hasSecondLevelGrouping} />
            </Tabs>
          </AppBar>
          <S.Content>
            <TabPanel value={this.state.value} index={0}>
              <Form
                onSubmit={onSubmit}
                initialValues={initialValues}
                isFormDisabled={isFormDisabled || !!errorModal}
                editSettingsDisabled={editSettingsDisabled}
                onClose={onClose}
                handleChangeHasGrouping={this.handleChangeHasGrouping}
                handleChangeIndicatorSettings={this.handleChangeIndicatorSettings}
              />
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <CustomFields
                onSubmit={onSubmit}
                initialValues={initialValues}
                customFields={customFields}
                isFormDisabled={isFormDisabled}
                onClose={onClose}
                countryId={countryId}
                projectId={projectId}
                sectionId={sectionId}
                indicatorsGroupId={indicatorsGroupId}
                editSettingsDisabled={editSettingsDisabled}
                updateList={this.updateList}
                someChanged={someChanged}
              />
            </TabPanel>
            <TabPanel value={this.state.value} index={2}>
              <GroupsColors
                onSubmit={this.handleModalSubmit}
                isFormDisabled={isFormDisabled || !!errorModal}
                editSettingsDisabled={editSettingsDisabled}
                onClose={onClose}
                countryId={countryId}
                projectId={projectId}
                sectionId={sectionId}
                indicatorsGroupId={indicatorsGroupId}
                indicatorId={initialValues.indicatorId}
                someChanged={someChanged}
              />
            </TabPanel>
          </S.Content>
          {errorModal && <FormHelperText error>{errorModal}</FormHelperText>}
        </S.Modal>
      </Modal>
    );
  }
}

EditIndicatorSettings.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isFormDisabled: PropTypes.bool.isRequired,
  initialValues: PropTypes.object.isRequired,
  customFields: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  countryId: PropTypes.number,
  projectId: PropTypes.number,
  sectionId: PropTypes.number,
  indicatorsGroupId: PropTypes.number,
  editSettingsDisabled: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    updateCustomFieldsRequest: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = ({
  indicators: {
    colors,
  },
}) => ({
  colors,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...indicatorsActions,
  }, dispatch),
});

EditIndicatorSettings.defaultProps = {
  actions: {},
  countryId: undefined,
  projectId: undefined,
  sectionId: undefined,
  indicatorsGroupId: undefined,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(EditIndicatorSettings);
