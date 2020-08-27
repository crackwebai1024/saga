import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import * as S from './styled';

const RenderSheet = ({
  className,
  columns,
  children,
}) => (
  <S.Table className={classNames(className, 'my-awesome-extra-class')}>
    <thead>
      <S.Tr>
        {columns.map((col, index) => (<S.Th className={col.key} key={index}>{col.title}</S.Th>))}
      </S.Tr>
    </thead>
    <S.Tbody>
      {
        children
      }
    </S.Tbody>
  </S.Table>
);

RenderSheet.propTypes = {
  columns: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
};

export default RenderSheet;
