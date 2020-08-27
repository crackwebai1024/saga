import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import * as S from './styled';

const mapIconType = {
  publish: <S.PublishIcon />,
  edit: <S.EditIcon />,
};

const ImportButtonCorner = ({
  onImport, iconType, titleType, t,
}) => (
  <S.Tooltip title={titleType}>
    <S.IconButton aria-label={t('common.import')} onClick={(e) => onImport(e)}>
      {mapIconType[iconType] || <S.PublishIcon />}
    </S.IconButton>
  </S.Tooltip>
);

ImportButtonCorner.propTypes = {
  onImport: PropTypes.func.isRequired,
  iconType: PropTypes.string,
  t: PropTypes.func.isRequired,
  titleType: PropTypes.string.isRequired,
};

ImportButtonCorner.defaultProps = {
  iconType: 'publish',
};

export default withTranslation()(ImportButtonCorner);
