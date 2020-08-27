import React from 'react';
import PropTypes from 'prop-types';

import * as S from './styled';

const Legend = ({ colorScale, data }) => (
  <S.Container>
    {data.map((item, index) => (
      <S.Item key={index}>
        <S.ColorDot backgroundColor={colorScale[index % colorScale.length] || '#000000'} />
        <S.Label>
          {item.name}
        </S.Label>
      </S.Item>
    ))}
  </S.Container>
);

Legend.propTypes = {
  colorScale: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
};

Legend.defaultProps = {
  colorScale: [],
  data: [],
};

export default Legend;
