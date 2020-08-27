import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';
import ListItem from './ListItem';

const MenuLink = ({
  label,
  path,
  keyItem,
  onItemClick,
  isActiveLink,
  isSubitem,
}) => {
  const handleItemClick = () => {
    onItemClick(keyItem);
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.ItemWrapper
          isActive={isActiveLink(path)}
          onClick={handleItemClick}
          isSubitem={isSubitem}
        >
          <ListItem
            isActive={isActiveLink(path)}
            to={path}
            label={label}
          />
        </S.ItemWrapper>
      </S.Container>
    </S.Wrapper>
  );
};

MenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  keyItem: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
  isActiveLink: PropTypes.func.isRequired,
  isSubitem: PropTypes.bool,
};

MenuLink.defaultProps = {
  isSubitem: false,
};

export default MenuLink;
