import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import { getIndicatorsGroup } from 'redux/sections/selectors';
import AmplitudeService from 'services/amplitude';
import AddCard from '../Components/AddCard';
import Indicator from '../Components/Indicator';
import Header from './Header';

import * as S from './styled';

const SortableItem = SortableElement(({ value }) => <S.Item>{value}</S.Item>);

const SortableList = SortableContainer(({ items, addIndicator }) => (
  <S.Row>
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} value={value} />
    ))}
    <S.Item>
      <AddCard
        onAdd={addIndicator}
      />
    </S.Item>
  </S.Row>
));

class IndicatorGroup extends Component {
  static propTypes = {
    countryId: PropTypes.number.isRequired,
    sectionId: PropTypes.number.isRequired,
    indicatorsGroupId: PropTypes.number.isRequired,
    indicatorsGroup: PropTypes.object.isRequired,
    indicatorsGroupActions: PropTypes.shape({
      openIndicatorModal: PropTypes.func.isRequired,
      closeIndicatorsGroup: PropTypes.func.isRequired,
      onEditIndicator: PropTypes.func.isRequired,
      onEditIndicatorSettings: PropTypes.func.isRequired,
      onDeleteIndicator: PropTypes.func.isRequired,
      onIndicatorOrderUpdate: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { indicatorsGroup, countryId, sectionId } = this.props;
    AmplitudeService.logEvent('Page has been visited', {
      pageTitle: 'Indicator Group',
      countryId,
      sectionId,
      groupId: indicatorsGroup.id,
      groupTitle: indicatorsGroup.title,
    });
  }

  handleConfirmDelete = (indicatorId) => {
    const {
      sectionId,
      indicatorsGroupId,
      indicatorsGroupActions: {
        onDeleteIndicator,
      },
    } = this.props;
    onDeleteIndicator(sectionId, indicatorsGroupId, indicatorId);
  };

  handleEditIndicator = (initialValues) => {
    const {
      sectionId,
      indicatorsGroupActions: {
        onEditIndicator,
      },
    } = this.props;
    onEditIndicator(sectionId, initialValues);
  };

  handleEditIndicatorSettings = (indicatorsGroupId, initialValues, customFields, dataCount) => {
    const {
      sectionId,
      indicatorsGroupActions: {
        onEditIndicatorSettings,
      },
    } = this.props;
    onEditIndicatorSettings(sectionId, indicatorsGroupId, initialValues, customFields, dataCount);
  };

  onSortEnd = ({ newIndex, oldIndex }) => {
    const {
      sectionId,
      indicatorsGroupId,
      indicatorsGroupActions: {
        onIndicatorOrderUpdate,
      },
    } = this.props;
    onIndicatorOrderUpdate(newIndex, oldIndex, sectionId, indicatorsGroupId);
  };

  render() {
    const {
      sectionId,
      indicatorsGroup,
      indicatorsGroupActions,
    } = this.props;

    const items = indicatorsGroup.indicators.map((indicator) => (
      <Indicator
        key={indicator.id}
        indicator={indicator}
        onEdit={this.handleEditIndicator}
        onEditSettings={this.handleEditIndicatorSettings}
        onDelete={this.handleConfirmDelete}
      />
    ));

    return (
      <S.Wrapper>
        <Header
          title={indicatorsGroup.title}
          onBack={indicatorsGroupActions.closeIndicatorsGroup}
        />
        <SortableList
          helperClass="isIndicatorDragging"
          axis="xy"
          distance={5}
          items={items}
          onSortEnd={this.onSortEnd}
          addIndicator={() => indicatorsGroupActions.openIndicatorModal(sectionId)}
        />
      </S.Wrapper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  indicatorsGroup: getIndicatorsGroup(state, props),
});

export default connect(mapStateToProps)(IndicatorGroup);
