import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { getAllIndicators } from 'helpers/getIndicators';
import { getYearsRange } from 'helpers/getYears';

import * as S from './styled';

const EnhancedTableToolbar = ({
  onAdd,
  targets,
  onSelectYear,
  yearValue,
  onSelectTarget,
  targetValue,
  details,
  t,
}) => (
  <>
    <S.Title>
      <Typography variant="h6" id="tableTitle">
        {t('admin.manage_targets')}
      </Typography>
    </S.Title>
    <S.StyledToolbar>
      {targets && (
        <S.FormControlSelect>
          <InputLabel htmlFor="year">{t('common.year')}</InputLabel>
          <Select
            value={yearValue}
            onChange={onSelectYear}
          >
            <MenuItem key={targets.items.length + 1} value={0}>{t('common.all_years')}</MenuItem>
            {getYearsRange()
              .map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
          </Select>
        </S.FormControlSelect>
      )}
      <S.SpacerSmall />
      {targets && (
        <S.FormControlSelect>
          <InputLabel htmlFor="target">{t('common.indicator')}</InputLabel>
          <Select
            value={targetValue}
            onChange={onSelectTarget}
          >
            <MenuItem key={targets.items.length + 1} value={0}>{t('common.all_indicators')}</MenuItem>
            {details && getAllIndicators(details.sections)
              .map((option, index) => (
                <MenuItem key={index} value={option}>{option}</MenuItem>
              ))}
          </Select>
        </S.FormControlSelect>
      )}
      <S.Spacer />
      <div>
        <Tooltip title={t('common.add_target')}>
          <S.AddButton aria-label="Add Target" color="primary" onClick={onAdd}>
            <AddIcon color="inherit" />
            {t('common.add_target')}
          </S.AddButton>
        </Tooltip>
      </div>
    </S.StyledToolbar>
  </>
);

EnhancedTableToolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onSelectYear: PropTypes.func.isRequired,
  onSelectTarget: PropTypes.func.isRequired,
  targets: PropTypes.object.isRequired,
  details: PropTypes.object.isRequired,
  yearValue: PropTypes.number.isRequired,
  targetValue: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableToolbar);
