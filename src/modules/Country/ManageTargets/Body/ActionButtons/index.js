import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const ActionButtons = ({
  user,
  onEdit,
  onDelete,
  t,
}) => (
  <>
    <Tooltip title={t('common.edit_target')}>
      <Button
        aria-label="Edit Target"
        color="primary"
        size="small"
        onClick={() => onEdit(user)}
      >
        <EditIcon color="inherit" />
      </Button>
    </Tooltip>
    <Tooltip title={t('common.delete_target')}>
      <Button
        aria-label="Delete Target"
        size="small"
        onClick={() => onDelete(user)}
      >
        <DeleteIcon color="inherit" />
      </Button>
    </Tooltip>
  </>
);

ActionButtons.propTypes = {
  user: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ActionButtons);
