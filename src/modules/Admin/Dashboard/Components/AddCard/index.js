import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import Tooltip from '@material-ui/core/Tooltip';
import * as S from './styled';

const AddCard = ({ onAdd, t }) => (
  <S.Card>
    <Tooltip title={t('manageDashboard.create_indicator')}>
      <S.IconButton
        aria-label={t('manageDashboard.create_indicator')}
        onClick={onAdd}
      >
        <S.AddIcon />
      </S.IconButton>
    </Tooltip>
  </S.Card>
);

AddCard.propTypes = {
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(AddCard);
