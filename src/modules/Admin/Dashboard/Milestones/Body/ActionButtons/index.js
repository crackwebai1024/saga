import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import * as S from './styled';

const ActionButtons = ({
  milestone,
  onEdit,
  onDelete,
}) => (
  <>
    <S.Container>
      <Tooltip title="Edit Milestone">
        <IconButton
          aria-label="Edit Milestone"
          color="primary"
          onClick={() => onEdit(milestone)}
        >
          <EditIcon color="inherit" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Milestone">
        <IconButton
          aria-label="Delete Milestone"
          onClick={() => onDelete(milestone.id)}
        >
          <DeleteIcon color="inherit" />
        </IconButton>
      </Tooltip>
    </S.Container>
  </>
);

ActionButtons.propTypes = {
  milestone: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionButtons;
