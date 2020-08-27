import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { formatTitleForCard } from 'helpers/formatTitleForCard';

import Stack from './Stack';

import * as S from './styled';

const IndicatorGroup = ({
  indicatorGroup,
  onEdit,
  onEditSettings,
  onDelete,
  t,
}) => (
  <Stack>
    <S.Card>
      <S.Header
        onClick={() => onEditSettings(indicatorGroup)}
      >
        {formatTitleForCard(indicatorGroup.title)}
      </S.Header>
      <S.CardActions disableSpacing>
        <Tooltip title={t('manageDashboard.edit_indicator_group')}>
          <IconButton
            aria-label={t('manageDashboard.edit_indicator_group')}
            onClick={() => onEdit(indicatorGroup)}
          >
            <S.EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('manageDashboard.configure_indicator_group')}>
          <IconButton
            aria-label={t('manageDashboard.configure_indicator_group')}
            onClick={() => onEditSettings(indicatorGroup)}
          >
            <S.SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('manageDashboard.delete_indicator_group')}>
          <IconButton
            aria-label={t('manageDashboard.delete_indicator_group')}
            onClick={() => onDelete(indicatorGroup.id)}
          >
            <S.DeleteIcon />
          </IconButton>
        </Tooltip>
      </S.CardActions>
    </S.Card>
  </Stack>
);

IndicatorGroup.propTypes = {
  indicatorGroup: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onEditSettings: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(IndicatorGroup);
