import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Done as DoneIcon } from '@material-ui/icons';

import ActionButtons from './ActionButtons';

const Body = ({
  rows,
  emptyRows,
  onEdit,
  onDelete,
  t,
}) => (
  <TableBody>
    {rows.map((row) => (
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
      >
        <TableCell component="th" scope="row" align="left">
          {row.year ? row.year : 'default year'}
        </TableCell>
        <TableCell align="left">
          {row.sectionTitile}
        </TableCell>
        <TableCell align="left">
          {row.title}
        </TableCell>
        <TableCell align="left">
          { row.value }
        </TableCell>
        <TableCell align="left">
          {row.isPrimary ? <DoneIcon /> : ''}
        </TableCell>
        <TableCell align="left">
          <ActionButtons
            user={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </TableCell>
      </TableRow>
    ))}
    {(emptyRows > 0 && rows.length) ? (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell colSpan={7} />
      </TableRow>
    ) : null}
    {!rows.length ? (
      <TableRow style={{ height: 49 * emptyRows }}>
        <TableCell align="center" colSpan={7}>{t('common.no_targets_to_display')}</TableCell>
      </TableRow>
    ) : null}
  </TableBody>
);

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  emptyRows: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Body);
