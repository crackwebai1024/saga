import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { withTranslation } from 'react-i18next';

import * as S from './styled';

const EnhancedTableToolbar = ({ onAdd, t }) => (
  <S.StyledToolbar>
    <S.Title>
      <S.TableTitle id="tableTitle">
        {t('admin.manage_countries')}
      </S.TableTitle>
    </S.Title>
    <S.Spacer />
    <div>
      <Tooltip title={t('admin.add_country')}>
        <S.AddButton aria-label={t('admin.add_country')} color="secondary" onClick={onAdd}>
          <AddIcon color="inherit" />
          {t('admin.add_country')}
        </S.AddButton>
      </Tooltip>
    </div>
  </S.StyledToolbar>
);

EnhancedTableToolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableToolbar);
