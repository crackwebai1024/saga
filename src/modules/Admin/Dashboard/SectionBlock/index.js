import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

import AddCard from '../Components/AddCard';
import Indicator from '../Components/Indicator';
import IndicatorGroup from './IndicatorGroup';
import Header from './Header';

import * as S from './styled';

const SortableItem = SortableElement(({ value }) => <S.Item>{value}</S.Item>);

const SortableList = SortableContainer(({ items, addSectionItem }) => (
  <S.Row>
    {items.map((value, index) => (
      <SortableItem key={`item-${index}`} index={index} value={value} />
    ))}
    <S.Item>
      <AddCard
        onAdd={addSectionItem}
      />
    </S.Item>
  </S.Row>
));

class Section extends Component {
  static propTypes = {
    section: PropTypes.object.isRequired,
    countryId: PropTypes.number.isRequired,
    order: PropTypes.number.isRequired,
    maxOrder: PropTypes.number.isRequired,
    sectionActions: PropTypes.shape({
      openIndicatorOrGroupModal: PropTypes.func.isRequired,
      onEditSection: PropTypes.func.isRequired,
      onDeleteSection: PropTypes.func.isRequired,
      onEditIndicatorOrGroup: PropTypes.func.isRequired,
      onEditIndicatorSettings: PropTypes.func.isRequired,
      onEditIndicatorsGroupSettings: PropTypes.func.isRequired,
      onDeleteIndicatorGroup: PropTypes.func.isRequired,
      onOrderUpdate: PropTypes.func.isRequired,
      onIndicatorsGroupOrderUpdate: PropTypes.func.isRequired,
    }).isRequired,
  };

  handleConfirmPseudoIndicatorsGroupDelete = (indicatorsGroupId) => () => {
    const {
      section,
      sectionActions: {
        onDeleteIndicatorGroup,
      },
    } = this.props;
    onDeleteIndicatorGroup(section.id, indicatorsGroupId, true);
  };

  handleConfirmIndicatorsGroupDelete = (indicatorsGroupId) => {
    const {
      section,
      sectionActions: {
        onDeleteIndicatorGroup,
      },
    } = this.props;
    onDeleteIndicatorGroup(section.id, indicatorsGroupId);
  };

  handleEditIndicatorOrGroup = (initialValues) => {
    const {
      section,
      sectionActions: {
        onEditIndicatorOrGroup,
      },
    } = this.props;
    onEditIndicatorOrGroup(section.id, initialValues);
  };

  handleEditIndicatorSettings = (indicatorsGroupId, initialValues, customFields, dataCount) => {
    const {
      section,
      sectionActions: {
        onEditIndicatorSettings,
      },
    } = this.props;
    onEditIndicatorSettings(section.id, indicatorsGroupId, initialValues, customFields, dataCount);
  };

  onSortEnd = ({ newIndex, oldIndex }) => {
    const {
      section,
      sectionActions: {
        onIndicatorsGroupOrderUpdate,
      },
    } = this.props;
    onIndicatorsGroupOrderUpdate(newIndex, oldIndex, section.id);
  };

  render() {
    const {
      section,
      countryId,
      order,
      maxOrder,
      sectionActions,
    } = this.props;

    const items = section.indicatorGroups.map((indicatorGroup) => (
      indicatorGroup.isSystem ? (
        <Indicator
          indicator={indicatorGroup.indicators[0]}
          onEdit={this.handleEditIndicatorOrGroup}
          onEditSettings={this.handleEditIndicatorSettings}
          onDelete={this.handleConfirmPseudoIndicatorsGroupDelete(indicatorGroup.id)}
        />
      ) : (
        <IndicatorGroup
          indicatorGroup={indicatorGroup}
          onEdit={this.handleEditIndicatorOrGroup}
          onEditSettings={sectionActions.onEditIndicatorsGroupSettings}
          onDelete={this.handleConfirmIndicatorsGroupDelete}
        />
      )
    ));

    return (
      <S.Wrapper>
        <Header
          section={section}
          countryId={countryId}
          order={order}
          maxOrder={maxOrder}
          onEdit={sectionActions.onEditSection}
          onDelete={sectionActions.onDeleteSection}
          onOrderUpdate={sectionActions.onOrderUpdate}
        />
        <SortableList
          helperClass="isIndicatorsGroupDragging"
          axis="xy"
          distance={5}
          items={items}
          onSortEnd={this.onSortEnd}
          addSectionItem={() => sectionActions.openIndicatorOrGroupModal(section.id)}
        />
      </S.Wrapper>
    );
  }
}

export default Section;
