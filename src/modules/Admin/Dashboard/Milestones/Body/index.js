import React from 'react';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import NotesIcon from '@material-ui/icons/Notes';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

import Loader from 'components/Loader/index';
import { getMilestoneStatusProperty } from 'helpers/milestonesStatuses';

import ActionButtons from './ActionButtons';
import * as S from './styled';

const prepareDateToShow = (date) => moment(date).format('MMM YYYY');

const Body = ({
  rows,
  onEdit,
  onDelete,
  isLoading,
}) => (
  <TableBody>
    {isLoading}
    {rows.map((row) => (
      <TableRow
        hover
        tabIndex={-1}
        key={row.id}
      >
        <S.Cell component="th" scope="row" align={row.align}>
          {row.startDate ? prepareDateToShow(row.startDate) : '-'}
        </S.Cell>
        <S.Cell component="th" scope="row" align={row.align}>
          {row.completionDate ? prepareDateToShow(row.completionDate) : '-'}
        </S.Cell>
        <S.Cell align={row.align}>
          {row.name}
        </S.Cell>
        <S.Cell align={row.align}>
          {row.responsibleParty}
        </S.Cell>
        <S.Cell align={row.align}>
          <S.StatusWrapper>
            <S.StatusImage
              alt={getMilestoneStatusProperty(row.status, 'text')}
              src={getMilestoneStatusProperty(row.status, 'icon')}
              width={20}
            /> {getMilestoneStatusProperty(row.status, 'text')}
          </S.StatusWrapper>
        </S.Cell>
        <S.Cell align={row.align}>
          {row.remarks && (
            <Tooltip title={row.remarks}>
              <NotesIcon color="inherit" />
            </Tooltip>
          )}
        </S.Cell>
        <S.Cell align={row.align}>
          <ActionButtons
            milestone={row}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </S.Cell>
      </TableRow>
    ))}
    {isLoading && (
      <TableRow style={{ height: 49 * 5 }}>
        <S.Cell align="center" colSpan={6}><Loader /></S.Cell>
      </TableRow>
    )}
    {!isLoading && !rows.length ? (
      <TableRow style={{ height: 49 * 5 }}>
        <S.Cell align="center" colSpan={6}>Milestones not found</S.Cell>
      </TableRow>
    ) : null}
  </TableBody>
);

Body.propTypes = {
  rows: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Body;
