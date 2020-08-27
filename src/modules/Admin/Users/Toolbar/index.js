import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import Tooltip from '@material-ui/core/Tooltip';

import * as S from './styled';

const EnhancedTableToolbar = ({
  onAdd,
  t,
}) => (
  <S.StyledToolbar>
    <S.Title>
      <S.TableTitle>
        {t('admin.manage_users')}
      </S.TableTitle>
    </S.Title>
    <S.Spacer />
    <div>
      <Tooltip title={t('common.add_target')}>
        <S.StyledButton aria-label="Add User" color="primary" onClick={onAdd}>
          {t('admin.new_user')}
        </S.StyledButton>
      </Tooltip>
      {/* <Tooltip title="Import Users">
        <Button aria-label="Import Users" color="primary">
          <AddIcon color="inherit" />
          Import
        </Button>
      </Tooltip> */}
    </div>
  </S.StyledToolbar>
);

EnhancedTableToolbar.propTypes = {
  onAdd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(EnhancedTableToolbar);
