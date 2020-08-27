import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
// import FormatColorFill from '@material-ui/icons/FormatColorFill';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withTranslation } from 'react-i18next';
import { colorOptions } from 'theme';

import formatInteger from 'helpers/formatInteger';
import ActionButtons from 'modules/Admin/Countries/Table/ActionButtons';

import * as S from './styled';

const getColorThemeName = (row) => {
  const keys = Object.keys(colorOptions);
  for (let i = 0; i < keys.length; i += 1) {
    const color = colorOptions[keys[i]];
    if (color.mainColor === row.mainColor.toUpperCase()
    && color.fontMainColor === row.fontMainColor.toUpperCase()) {
      return keys[i];
    }
  }
  return '';
};

const Body = ({
  rows,
  emptyRows,
  displayedValues,
  onEdit,
  onDelete,
  t,
}) => {
  const createCells = (row) => (
    Array.from(displayedValues.keys()).map((key) => {
      switch (key) {
        case 'citizens':
          return <TableCell key={key}>{formatInteger(row[key])}</TableCell>;
        // case 'mainColor':
        // case 'fontMainColor':
        //   return (
        //     <S.StyledTableCell color={row[key]} key={key}>
        //       <FormatColorFill />
        //     </S.StyledTableCell>
        //   );
        case 'color':
          return <TableCell key={key}>{getColorThemeName(row)}</TableCell>;
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
      >
        {createCells(row)}
        <TableCell align="center">
          <ActionButtons
            country={row}
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
        <TableRow style={{ height: 49 * emptyRows }}>
          <TableCell
            align="center"
            colSpan={displayedValues.size + 1}
          >
            {rows.length ? null : t('admin.no_countries')}
          </TableCell>
        </TableRow>
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
};

export default withTranslation()(Body);
