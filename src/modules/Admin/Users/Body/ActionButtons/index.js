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
  currentUser,
  t,
}) => (
  <>
    <Tooltip title={t('admin.edit_user')}>
      <Button
        aria-label="Edit User"
        color="primary"
        size="small"
        onClick={() => onEdit(user)}
      >
        <EditIcon color="inherit" />
      </Button>
    </Tooltip>
    <Tooltip title={t('admin.delete_user')}>
      <Button
        aria-label="Delete User"
        size="small"
        disabled={currentUser.id === user.id}
        onClick={() => onDelete(user.id)}
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
  currentUser: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ActionButtons);
