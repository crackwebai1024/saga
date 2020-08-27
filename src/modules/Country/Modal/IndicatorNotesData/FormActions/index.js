import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Button } from 'components/material';

const FormActions = ({
  isEditableMode,
  switchToEditableMode,
  t,
}) => ((isEditableMode) ? (
  <Button
    color="primary"
    variant="contained"
    type="submit"
  >
    {t('common.save')}
  </Button>
) : (
  <Button
    color="primary"
    variant="contained"
    onClick={switchToEditableMode}
  >
    {t('common.edit')}
  </Button>
));

FormActions.propTypes = {
  switchToEditableMode: PropTypes.func.isRequired,
  isEditableMode: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(FormActions);
