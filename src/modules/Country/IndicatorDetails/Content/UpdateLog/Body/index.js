import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { getFormatedDateTime } from 'helpers/formatDate';
import * as S from './styled';

const Body = ({
  rows,
  t,
}) => (
  <TableBody>
    {rows.map((row, index) => (
      <S.StyledRow
        hover
        tabIndex={-1}
        key={index}
      >
        <S.Cell align="left">
          {`${getFormatedDateTime(row.time)}`}
        </S.Cell>
        <S.Cell align="left">
          {`${row.title}${row.updated ? `, ${row.updated}` : ', map, graph'}`}
        </S.Cell>
        {/* <S.Cell align="left">
          {row.note}
        </S.Cell> */}
        <S.Cell align="left">
          {row.name}
        </S.Cell>
      </S.StyledRow>
    ))}
    {!rows.length ? (
      <S.StyledRow style={{ height: 55 }}>
        <TableCell align="center" colSpan={7}>{t('country.log_not_found')}</TableCell>
      </S.StyledRow>
    ) : null}
  </TableBody>
);

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Body);
