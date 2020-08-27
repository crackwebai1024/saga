import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

import formatInteger from 'helpers/formatInteger';
import ActionButtons from 'modules/Admin/Projects/Table/ActionButtons';

import * as S from './styled';

const Body = ({
  rows,
  emptyRows,
  displayedValues,
  onEdit,
  onDelete,
  history,
  t,
}) => {
  const createCells = (row) => (
    Array.from(displayedValues.keys()).map((key) => {
      switch (key) {
        case 'citizens':
          return <TableCell key={key}>{formatInteger(row[key])}</TableCell>;
        case 'mainColor':
        case 'fontMainColor':
          return (
            <S.StyledTableCell color={row[key]} key={key}>
              <FormatColorFill />
            </S.StyledTableCell>
          );
        case 'logo':
          return (
            <TableCell key={key}>
              <Avatar alt={row.name} src={row[key]} />
            </TableCell>
          );
        default:
          return <TableCell key={key}>{row[key] || '-'}</TableCell>;
      }
    })
  );

  const createRows = () => (
    rows.map((row) => (
      <S.StyledTableRow
        hover
        tabIndex={-1}
        key={row.id}
        onClick={() => history.push(`/admin/country/${row.countryId}/projects/${row.id}/dashboard`)}
        cursor="pointer"
      >
        {createCells(row)}
        <TableCell align="right">
          <ActionButtons
            project={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableCell>
      </S.StyledTableRow>
    ))
  );

  return (
    <TableBody>
      {createRows()}
      {emptyRows > 0 && (
        <S.StyledTableRow style={{ height: 49 * emptyRows }}>
          <TableCell
            align="center"
            colSpan={displayedValues.size + 1}
          >
            {rows.length ? null : t('admin.no_projects')}
          </TableCell>
        </S.StyledTableRow>
      )}
    </TableBody>
  );
};

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  displayedValues: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withTranslation()(Body));
