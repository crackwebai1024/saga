import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapse from '@material-ui/core/Collapse';

import * as S from './styled';
import ListItem from './ListItem';
import MenuLink from '../MenuLink';

class MenuItemCollapsible extends Component {
  componentDidMount() {
    const {
      toggleState,
      items,
      keyItem,
      onItemToggle,
    } = this.props;
    const isExpanded = !!toggleState[keyItem];

    if (this.hasActive(items) && !isExpanded) {
      onItemToggle(keyItem);
    }
  }

  hasActive = (items) => {
    const { isActiveLink } = this.props;
    return items.some((menuItem) => isActiveLink(menuItem.path));
  }

  handleItemToggle = () => {
    const { onItemToggle, keyItem } = this.props;
    onItemToggle(keyItem);
  };

  render() {
    const {
      label,
      keyItem,
      items,
      onItemClick,
      toggleState,
      isActiveLink,
    } = this.props;

    const isExpanded = !!toggleState[keyItem];

    return (
      <S.Wrapper>
        <S.Container>
          <S.ItemWrapper
            onClick={this.handleItemToggle}
          >
            <ListItem
              label={label}
              isExpanded={isExpanded}
            />
          </S.ItemWrapper>
          <Collapse in={toggleState[keyItem]} timeout="auto" unmountOnExit>
            {items.map((subitem) => (
              <MenuLink
                keyItem={subitem.path}
                onItemClick={onItemClick}
                isActiveLink={isActiveLink}
                {...subitem}
                isSubitem
              />
            ))}
          </Collapse>
        </S.Container>
      </S.Wrapper>
    );
  }
}

MenuItemCollapsible.propTypes = {
  label: PropTypes.string.isRequired,
  keyItem: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemToggle: PropTypes.func.isRequired,
  onItemClick: PropTypes.func.isRequired,
  toggleState: PropTypes.object.isRequired,
  isActiveLink: PropTypes.func.isRequired,
};

export default MenuItemCollapsible;
