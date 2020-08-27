import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <S.Wrapper
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <S.Content>{children}</S.Content>
    </S.Wrapper>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

TabPanel.defaultProps = {
  children: null,
};

export default TabPanel;
