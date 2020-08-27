import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

import { actions as indicatorsActions } from 'redux/indicators';

import Order from './Order';
import ActionButtons from './ActionButtons';

import * as S from './styled';

class CustomFields extends Component {
  static propTypes = {
    isFormDisabled: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    initialValues: PropTypes.object.isRequired,
    customFields: PropTypes.array.isRequired,
    editSettingsDisabled: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
    countryId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    sectionId: PropTypes.number.isRequired,
    indicatorsGroupId: PropTypes.number.isRequired,
    updateList: PropTypes.func.isRequired,
    actions: PropTypes.shape({
      getCustomFieldsRequest: PropTypes.func.isRequired,
      updateCustomFieldsRequest: PropTypes.func.isRequired,
    }),
    someChanged: PropTypes.bool.isRequired,
  };

  state = {
    list: this.props.customFields,
    value: '',
    isAddOpened: false,
    isEditOpened: false,
    saveDisabled: true,
    currentElement: '',
    errorText: '',
  }

  componentDidMount() {
    const data = {
      countryId: this.props.countryId,
      projectId: this.props.projectId,
      sectionId: this.props.sectionId,
      indicatorsGroupId: this.props.indicatorsGroupId,
      indicatorId: this.props.initialValues.indicatorId,
    };
    const { actions } = this.props;
    if (data.countryId && data.projectId && data.sectionId && data.indicatorsGroupId) {
      actions.getCustomFieldsRequest(data);
    }
  }

  componentDidUpdate() {
    this.props.updateList(this.state.list);
  }

  handleCustomFieldsSubmit = () => {
    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      initialValues,
      onClose,
    } = this.props;
    const {
      list,
    } = this.state;
    const {
      actions,
    } = this.props;
    actions.updateCustomFieldsRequest({
      customFields: list,
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId: initialValues.indicatorId,
    });
    onClose();
  };

  // eslint-disable-next-line consistent-return
  handleChange = (event) => {
    const { t } = this.props;
    if (event.target.value.length > 31) {
      return this.setState({
        errorText: t('invalid.max_length'),
      });
    }

    this.setState({
      value: event.target.value,
      errorText: '',
      saveDisabled: false,
    });
  };

  handleSaveClick = () => {
    const { t } = this.props;
    if (!this.state.value.trim()) {
      return this.setState({
        errorText: t('invalid.no_blank'),
      });
    }
    if (this.state.list.find((item) => item.name === this.state.value.trim())) {
      return this.setState({
        errorText: t('invalid.already_exists'),
      });
    }
    return this.setState((prevState) => ({
      list: prevState.list.concat({ name: prevState.value, order: prevState.list.length + 1 }),
      value: '',
      isAddOpened: false,
      errorText: '',
    }));
  };

  handleCloseClick = () => {
    this.setState({
      value: '',
      isAddOpened: false,
      errorText: '',
    });
  };

  handleCloseEditClick = () => {
    this.setState({
      currentElement: '',
      value: '',
      isEditOpened: false,
      errorText: '',
      saveDisabled: true,
    });
  };

  handleDelete = (name, order) => {
    this.setState((prevState) => ({
      list: prevState.list.filter((item) => item.name !== name)
        .map((item) => {
          if (item.order > order) {
            return { name: item.name, order: item.order - 1 };
          }
          return item;
        }),
    }));
  };

  handleEdit = (name) => {
    this.setState({
      currentElement: name,
      value: name,
      isAddOpened: false,
      isEditOpened: true,
      errorText: '',
    });
  };

  handleAdd = () => {
    if (this.state.isEditOpened) {
      this.handleCloseEditClick();
    }

    this.setState({
      value: '',
      isAddOpened: true,
      errorText: '',
    });
  };

  handleSaveEdit = (name) => {
    const { t } = this.props;
    if (!this.state.value.trim()) {
      return this.setState({
        errorText: t('invalid.no_blank'),
      });
    }
    if (this.state.list.find((item) => item.name === this.state.value.trim())) {
      return this.setState({
        errorText: t('invalid.already_exists'),
      });
    }
    return this.setState((prevState) => ({
      list: prevState.list.map((item) => {
        if (item.name === name) {
          return { name: prevState.value, order: item.order };
        }
        return item;
      }),
      errorText: '',
      isEditOpened: false,
      saveDisabled: true,
    }));
  };

  handleOrderUpdate = (a, b) => {
    this.setState((prevState) => ({
      list: prevState.list.map((item) => {
        if (item.order === a) {
          return { name: item.name, order: b };
        }
        if (item.order === b) {
          return { name: item.name, order: a };
        }
        return item;
      }).sort((v1, v2) => parseInt(v1.order, 10) - parseInt(v2.order, 10)),
    }));
  };

  render() {
    const {
      onClose,
      isFormDisabled,
      editSettingsDisabled,
      t,
      someChanged,
    } = this.props;
    const {
      list,
      isAddOpened,
      isEditOpened,
      currentElement,
      value,
      errorText,
      saveDisabled,
    } = this.state;

    return (
      <S.StyledForm>
        <S.Container>
          <S.Header>
            <S.Title>{t('manageDashboard.custom_fields')}:</S.Title>
            <Tooltip title={t('manageDashboard.add_custom_field')}>
              <S.AddButton
                aria-label="Add Custom Field"
                color="primary"
                onClick={this.handleAdd}
                disabled={editSettingsDisabled}
              >
                <AddIcon color="inherit" />
                {t('manageDashboard.add_custom_field')}
              </S.AddButton>
            </Tooltip>
          </S.Header>
          <S.StyledList>
            <S.AddListItem isAddOpened={isAddOpened}>
              <S.StyledTextField
                id="name"
                label="Name"
                onChange={this.handleChange}
                value={value}
                error={!!errorText}
                helperText={errorText}
              />
              <S.ItemButtons>
                <Button color="primary" onClick={this.handleSaveClick}>{t('common.add')}</Button>
                <Button color="secondary" onClick={this.handleCloseClick}>{t('common.cancel')}</Button>
              </S.ItemButtons>
            </S.AddListItem>
            {list.map((item) => (
              <S.ListItem
                disabled={(editSettingsDisabled || isEditOpened || isAddOpened) && currentElement !== item.name}
              >
                <S.CustomField key={item.position}>
                  <S.LeftSideContent>
                    <Order
                      max={list.length}
                      current={parseInt(item.order, 10)}
                      orderUpdate={this.handleOrderUpdate}
                      disabled={editSettingsDisabled || isEditOpened || isAddOpened}
                    />
                    {item.name}
                  </S.LeftSideContent>
                  <S.RightSideContent>
                    <ActionButtons
                      item={item}
                      onEdit={() => this.handleEdit(item.name)}
                      onDelete={() => this.handleDelete(item.name, item.order)}
                      disabled={editSettingsDisabled || isEditOpened || isAddOpened}
                    />
                  </S.RightSideContent>
                </S.CustomField>
                <S.EditItem isEditOpened={isEditOpened} name={item.name} current={currentElement}>
                  <S.StyledTextField
                    id="name"
                    label="Name"
                    onChange={this.handleChange}
                    value={value}
                    error={!!errorText}
                    helperText={errorText}
                  />
                  <S.ItemButtons>
                    <Button
                      color="primary"
                      onClick={() => this.handleSaveEdit(currentElement)}
                      disabled={saveDisabled}
                    >
                      {t('common.save')}
                    </Button>
                    <Button color="secondary" onClick={this.handleCloseEditClick}>{t('common.close')}</Button>
                  </S.ItemButtons>
                </S.EditItem>
              </S.ListItem>
            ))}
          </S.StyledList>
        </S.Container>
        <DialogActions>
          <Button color="secondary" onClick={() => onClose(someChanged)}>{t('common.close')}</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isFormDisabled || editSettingsDisabled}
            onClick={this.handleCustomFieldsSubmit}
          >
            {t('common.save')}
          </Button>
        </DialogActions>
      </S.StyledForm>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    ...indicatorsActions,
  }, dispatch),
});

CustomFields.defaultProps = {
  actions: {},
};

export default compose(
  connect(null, mapDispatchToProps),
  withTranslation(),
)(CustomFields);
