import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from 'react-i18next';

const StyledButton = styled(Button)`
  && {
    padding-left: 0;
    padding-right: 0;
  }
`;

const ActionButtons = ({
  project,
  onEdit,
  onDelete,
  t,
}) => (
  <>
    <Tooltip title={t('admin.edit_project')}>
      <StyledButton
        aria-label={t('admin.edit_project')}
        color="secondary"
        size="small"
        onClick={(e) => onEdit(e, project)}
      >
        <EditIcon color="inherit" />
      </StyledButton>
    </Tooltip>
    <Tooltip title={t('admin.delete_project')}>
      <StyledButton
        aria-label={t('admin.delete_project')}
        color="secondary"
        size="small"
        onClick={(e) => onDelete(e, project.id)}
      >
        <DeleteIcon color="inherit" />
      </StyledButton>
    </Tooltip>
  </>
);

ActionButtons.propTypes = {
  project: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ActionButtons);
