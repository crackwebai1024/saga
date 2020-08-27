import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
  MenuItem,
  IconButton,
  Menu,
} from '@material-ui/core';

const originConfig = {
  vertical: 'top',
  horizontal: 'right',
};

class MenuControl extends Component {
  state = {
    anchor: null,
    open: false,
  };

  static propTypes = {
    items: PropTypes.array.isRequired,
    IconComponent: PropTypes.elementType.isRequired,
    t: PropTypes.func.isRequired,
  }

  handleMenu = (event) => {
    this.setState({ anchor: event.currentTarget, open: true });
  }

  handleClose = () => {
    this.setState({ anchor: null, open: false });
  }

  render() {
    const {
      anchor,
      open,
    } = this.state;
    const {
      items,
      IconComponent,
      t,
    } = this.props;

    return (
      <>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <IconComponent />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={originConfig}
          transformOrigin={originConfig}
          open={open}
          onClose={this.handleClose}
        >
          {items.map((menuItem, index) => (
            <MenuItem key={index} onClick={menuItem.onClick}>
              {menuItem.i18nKey ? t(`common.${menuItem.i18nKey}`) : menuItem.label}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }
}

export default withTranslation()(MenuControl);
