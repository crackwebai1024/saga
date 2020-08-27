import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { MILESTONES_STATUSES } from 'configs/statuses';
import * as S from './styled';

const BASE_X = 420;
const ITEM_Y_INITIAL = 50;
const ITEM_Y_DELTA = (small) => (small ? 70 : 90);

/* eslint-disable */
const Label = ({ datum, small }) => (datum.isOther
  ? null
  : (
    <g>
      <text
        style={small ? S.inlineStyles.smallLabelStyle : S.inlineStyles.labelStyle}
        x={BASE_X}
        y={ITEM_Y_INITIAL + Math.max(0, (datum.order - 1) * ITEM_Y_DELTA(small))}
      >
        {MILESTONES_STATUSES[datum.x].description}
      </text>
      <image
        xlinkHref={MILESTONES_STATUSES[datum.x].icon}
        height={small ? 24 : 30}
        width={small ? 24 : 30}
        x={BASE_X}
        y={ITEM_Y_INITIAL + 15 + Math.max(0, (datum.order - 1) * ITEM_Y_DELTA(small))}
      />
      <text
        style={{...(small ? S.inlineStyles.smallValueStyle : S.inlineStyles.valueStyle), fill: MILESTONES_STATUSES[datum.x].color}}
        x={BASE_X + (small ? 40 : 45)}
        y={ITEM_Y_INITIAL + (small ? 40 : 45) + Math.max(0, (datum.order - 1) * ITEM_Y_DELTA(small))}
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
