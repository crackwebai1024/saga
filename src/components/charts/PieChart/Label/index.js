import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { STATUSES } from 'helpers/statuses';
import * as S from './styled';

const BASE_X = 265;
const ITEM_Y_INITIAL = 35;
const ITEM_Y_DELTA = 60;

/* eslint-disable */
const Label = ({ isMobileView, datum, t }) => (datum.isOther
  ? null
  : (
    <g>
      <text
        style={S.inlineStyles.labelStyle}
        x={BASE_X}
        y={ITEM_Y_INITIAL + (datum.order * ITEM_Y_DELTA) - 5}
      >
        {t(`manageDashboard.${STATUSES[datum.x].i18nKey}`)}
      </text>
      <image
        xlinkHref={STATUSES[datum.x].icon}
        height={24}
        width={24}
        x={BASE_X}
        y={ITEM_Y_INITIAL + 3 + (datum.order * ITEM_Y_DELTA)}
      />
      <text
        style={{...S.inlineStyles.valueStyle, fill: STATUSES[datum.x].color}}
        x={BASE_X + 32}
        y={ITEM_Y_INITIAL + 25 + (datum.order * ITEM_Y_DELTA)}
      >
        {datum.y}
      </text>
    </g>
  )
);

Label.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Label);
