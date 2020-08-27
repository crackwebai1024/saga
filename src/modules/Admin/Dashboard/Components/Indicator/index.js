import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { formatTitleForCard } from 'helpers/formatTitleForCard';

import * as S from './styled';

const Indicator = ({
  indicator,
  onEdit,
  onEditSettings,
  onDelete,
  t,
}) => (
  <S.Card>
    <S.Header
      onClick={() => onEditSettings(indicator.indicatorsGroupId,
        indicator.indicatorsSettings, indicator.customFields, indicator.dataCount)}
    >
      {formatTitleForCard(indicator.title)}
    </S.Header>
    <S.CardActions disableSpacing>
      <Tooltip title={t('manageDashboard.edit_indicator')}>
        <IconButton
          aria-label={t('manageDashboard.edit_indicator')}
          onClick={() => onEdit(indicator)}
        >
          <S.EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('manageDashboard.configure_indicator')}>
        <IconButton
          aria-label={t('manageDashboard.configure_indicator')}
          onClick={() => onEditSettings(indicator.indicatorsGroupId,
            indicator.indicatorsSettings, indicator.customFields, indicator.dataCount)}
        >
          <S.SettingsIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t('manageDashboard.delete_indicator')}>
        <IconButton
          aria-label={t('manageDashboard.delete_indicator')}
          onClick={() => onDelete(indicator.id)}
        >
          <S.DeleteIcon />
        </IconButton>
      </Tooltip>
    </S.CardActions>
  </S.Card>
);

Indicator.propTypes = {
  indicator: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditSettings: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Indicator);
