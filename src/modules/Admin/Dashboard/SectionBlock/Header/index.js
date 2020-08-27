import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Order from '../Order';
import * as S from './styled';

const Header = ({
  section,
  countryId,
  onEdit,
  onDelete,
  onOrderUpdate,
  order,
  maxOrder,
  t,
}) => {
  const { id, projectId } = section;
  return (
    <S.Wrapper>
      <S.Title>{section.title}</S.Title>
      <S.Link to={`/admin/country/${countryId}/projects/${projectId}/dashboard/section/${id}/milestones`}>
        {t('manageDashboard.edit_milestones')}
      </S.Link>
      <S.ActionsArea>
        <Tooltip title={t('manageDashboard.edit_section')}>
          <IconButton
            aria-label={t('manageDashboard.edit_section')}
            onClick={() => onEdit(section)}
          >
            <S.EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('manageDashboard.delete_section')}>
          <IconButton
            aria-label={t('manageDashboard.delete_section')}
            onClick={() => onDelete(section.id)}
          >
            <S.DeleteIcon />
          </IconButton>
        </Tooltip>
        <Order max={maxOrder} current={order} orderUpdate={onOrderUpdate} />
      </S.ActionsArea>
    </S.Wrapper>
  );
};

Header.propTypes = {
  section: PropTypes.object.isRequired,
  countryId: PropTypes.number.isRequired,
  order: PropTypes.number.isRequired,
  maxOrder: PropTypes.number.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onOrderUpdate: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Header);
