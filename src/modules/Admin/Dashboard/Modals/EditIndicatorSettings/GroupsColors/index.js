import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@material-ui/core/DialogActions';

import { actions as indicatorsActions } from 'redux/indicators';

import ColorForm from './ColorForm';
import * as S from './styled';

class GroupsColors extends Component {
  static propTypes = {
    colors: PropTypes.array.isRequired,
    isFormDisabled: PropTypes.bool.isRequired,
    editSettingsDisabled: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
    countryId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    sectionId: PropTypes.number.isRequired,
    indicatorsGroupId: PropTypes.number.isRequired,
    indicatorId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
      getIndicatorColorsRequest: PropTypes.func.isRequired,
      createIndicatorColorRequest: PropTypes.func.isRequired,
      updateIndicatorColorRequest: PropTypes.func.isRequired,
      deleteIndicatorColorRequest: PropTypes.func.isRequired,
    }).isRequired,
    someChanged: PropTypes.bool.isRequired,
  };

  state = {
    isAddOpened: false,
    isEditOpened: false,
    initialValues: {},
  };

  componentDidMount() {
    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
      actions,
    } = this.props;

    actions.getIndicatorColorsRequest({
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
    });
  }

  handleAddOpen = () => {
    if (this.state.isEditOpened) {
      this.handleEditClose();
    }
    this.setState({
      isAddOpened: true,
      initialValues: {
        secondaryGroupName: '',
        color: '#000000',
      },
    });
  };

  handleAddClose = () => {
    this.setState({
      isAddOpened: false,
      initialValues: {},
    });
  };

  handleAddSubmit = (values) => {
    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
      actions,
    } = this.props;

    actions.createIndicatorColorRequest({
      ...values,
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
    });
    this.handleAddClose();
  };

  handleEditOpen = (colorItem) => {
    if (this.state.isAddOpened) {
      this.handleAddClose();
    }
    this.setState({
      isEditOpened: true,
      initialValues: { ...colorItem },
    });
  };

  handleEditClose = () => {
    this.setState({
      isEditOpened: false,
      initialValues: {},
    });
  };

  handleEditSubmit = (values) => {
    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
      actions,
    } = this.props;

    actions.updateIndicatorColorRequest({
      ...values,
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
    });
    this.handleEditClose();
  };

  handleDelete = (color) => {
    const {
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
      actions,
    } = this.props;

    actions.deleteIndicatorColorRequest({
      id: color.id,
      countryId,
      projectId,
      sectionId,
      indicatorsGroupId,
      indicatorId,
    });
  };

  render() {
    const {
      colors,
      onSubmit,
      onClose,
      isFormDisabled,
      editSettingsDisabled,
      t,
      someChanged,
    } = this.props;
    const {
      isAddOpened,
      isEditOpened,
      initialValues,
    } = this.state;

    return (
      <S.Container>
        <S.Header>
          <S.Title>{t('manageDashboard.group_colors')}:</S.Title>
          <Tooltip title={t('manageDashboard.add_color')}>
            <S.AddButton
              aria-label={t('manageDashboard.add_color')}
              color="primary"
              onClick={this.handleAddOpen}
              disabled={isEditOpened || isAddOpened}
            >
              <AddIcon color="inherit" />
              {t('manageDashboard.add_color')}
            </S.AddButton>
          </Tooltip>
        </S.Header>

        {isAddOpened && (
          <S.AddColorContainer>
            <ColorForm
              colors={colors}
              initialValues={initialValues}
              onSubmit={this.handleAddSubmit}
              onClose={this.handleAddClose}
            />
          </S.AddColorContainer>
        )}
        <S.List>
          {colors.map((item) => {
            const disabled = (isEditOpened || isAddOpened)
              && initialValues.secondaryGroupName !== item.secondaryGroupName;

            return (
              <S.ListItem
                key={item.secondaryGroupName}
                disabled={disabled}
              >
                <S.CurrentValues>
                  <S.FieldsWrapper>
                    <S.TitleCell>
                      {item.secondaryGroupName}
                    </S.TitleCell>
                    <S.ColorCell>
                      <S.ColorView color={item.color} />
                    </S.ColorCell>
                  </S.FieldsWrapper>
                  <DialogActions>
                    <Tooltip title="Edit Color">
                      <Button
                        aria-label="Edit Color"
                        color="primary"
                        size="small"
                        onClick={() => this.handleEditOpen(item)}
                        disabled={isEditOpened || isAddOpened}
                      >
                        <EditIcon color="inherit" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Color">
                      <Button
                        aria-label="Delete Color"
                        size="small"
                        onClick={() => this.handleDelete(item)}
                        disabled={isEditOpened || isAddOpened}
                      >
                        <DeleteIcon color="inherit" />
                      </Button>
                    </Tooltip>
                  </DialogActions>
                </S.CurrentValues>
                {isEditOpened && initialValues.secondaryGroupName === item.secondaryGroupName && (
                  <S.EditItem>
                    <ColorForm
                      isEditing
                      colors={colors}
                      initialValues={initialValues}
                      onSubmit={this.handleEditSubmit}
                      onClose={this.handleEditClose}
                    />
                  </S.EditItem>
                )}
              </S.ListItem>
            );
          })}
        </S.List>
        <DialogActions>
          <Button color="secondary" onClick={() => onClose(someChanged)}>{t('common.close')}</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isFormDisabled || editSettingsDisabled}
            onClick={() => onSubmit(null)}
          >
            {t('common.save')}
          </Button>
        </DialogActions>
      </S.Container>
    );
  }
}

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

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
)(GroupsColors);
