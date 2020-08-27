import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from 'react-i18next';

const ActionButtons = ({
  onEdit,
  onDelete,
  t,
}) => (
  <>
    <Tooltip title={t('common.edit_field')}>
      <Button
        aria-label="Edit Field"
        color="primary"
        size="small"
        onClick={onEdit}
      >
        <EditIcon color="inherit" />
      </Button>
    </Tooltip>
    <Tooltip title={t('common.delete_field')}>
      <Button
        aria-label="Delete Field"
        size="small"
        onClick={onDelete}
      >
        <DeleteIcon color="inherit" />
      </Button>
    </Tooltip>
  </>
);

ActionButtons.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ActionButtons);
