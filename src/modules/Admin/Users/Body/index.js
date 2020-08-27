import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import ActionButtons from './ActionButtons';

import * as S from './styled';

const Body = ({
  rows,
  emptyRows,
  onEdit,
  onDelete,
  currentUser,
  t,
}) => (
  <TableBody>
    {rows.map((row) => (
      <S.StyledRow
        hover
        tabIndex={-1}
        key={row.email}
      >
        <S.Cell component="th" scope="row" align="left">
          {row.firstName}
        </S.Cell>
        <S.Cell align="left">
          {row.lastName}
        </S.Cell>
        <S.Cell align="left">
          {row.email}
        </S.Cell>
        <S.Cell align="left">
          {
            row.countries.length
              ? row.countries
                .map((country) => country.name)
                .join(', ')
              : ''
          }
        </S.Cell>
        <S.Cell align="left">
          {row.position}
        </S.Cell>
        <S.Cell align="left">
          {row.role}
        </S.Cell>
        <S.StyledTableCellActions align="left">
          <ActionButtons
            user={row}
            currentUser={currentUser}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </S.StyledTableCellActions>
      </S.StyledRow>
    ))}
    {(emptyRows > 0 && rows.length) ? (
      <S.StyledRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={7} />
      </S.StyledRow>
    ) : null}
    {!rows.length ? (
      <S.StyledRow style={{ height: 49 * emptyRows }}>
        <TableCell align="center" colSpan={7}>{t('admin.users_not_found')}</TableCell>
      </S.StyledRow>
    ) : null}
  </TableBody>
);

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Body);
