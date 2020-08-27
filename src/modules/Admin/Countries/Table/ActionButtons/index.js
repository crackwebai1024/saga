import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
  country,
  onEdit,
  onDelete,
  t,
}) => (
  <>
    <Tooltip title={t('admin.edit_country')}>
      <StyledButton
        aria-label={t('admin.edit_country')}
        color="secondary"
        size="small"
        onClick={() => onEdit(country)}
      >
        <EditIcon color="inherit" />
      </StyledButton>
    </Tooltip>
    <Tooltip title={t('admin.delete_country')}>
      <StyledButton
        aria-label={t('admin.delete_country')}
        color="secondary"
        size="small"
        onClick={() => onDelete(country.id)}
      >
        <DeleteIcon color="inherit" />
      </StyledButton>
    </Tooltip>
  </>
);

ActionButtons.propTypes = {
  country: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(ActionButtons);
