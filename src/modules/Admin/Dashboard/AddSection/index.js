import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import * as S from './styled';

const AddSection = ({ onAdd, t }) => (
  <S.Paper>
    <Tooltip title={t('manageDashboard.add_section')}>
      <Button aria-label={t('manageDashboard.add_section')} color="primary" onClick={() => onAdd()}>
        <AddIcon color="inherit" />
        {t('manageDashboard.add_section')}
      </Button>
    </Tooltip>
  </S.Paper>
);

AddSection.propTypes = {
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AddSection);
