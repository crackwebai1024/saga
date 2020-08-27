import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const ListItem = ({
  isActive,
  to,
  label,
}) => (
  <S.StyledListItem isActive={isActive} to={to}>
    <S.StyledListItemText primary={label} />
  </S.StyledListItem>
);

ListItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default ListItem;
