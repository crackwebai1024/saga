import React from 'react';
import PropTypes from 'prop-types';

import ExpandIcon from './ExpandIcon';
import * as S from './styled';

const ListItem = ({
  isExpanded,
  label,
}) => (
  <S.StyledListItem isToggleable>
    <S.StyledListItemText primary={label} />
    <ExpandIcon isExpanded={isExpanded} />
  </S.StyledListItem>
);

ListItem.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default ListItem;
