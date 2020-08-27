/* eslint-disable import/no-duplicates, max-len */
import theme from 'theme';

import { STATUSES_DATA, MILESTONES_STATUSES } from 'configs/statuses';

// order in this array matters
const KEY_STATUSES = ['onTrack', 'minorRisks', 'actionNeeded', 'supportCritical'];

export const getStatusKeys = () => KEY_STATUSES;

export const getStatusProperty = (statusKey, property) => (
  (statusKey && property && STATUSES_DATA[statusKey]) ? STATUSES_DATA[statusKey][property] : null
);

export const getMilestoneStatusProperty = (statusKey, property) => (
  (statusKey && property && MILESTONES_STATUSES[statusKey]) ? MILESTONES_STATUSES[statusKey][property] : null
);

export const getMilestonesStatusKeys = () => Object.keys(MILESTONES_STATUSES);

export const getCurrentPerformanceStatus = (curentPerformance) => {
  if (typeof curentPerformance === 'number') {
    if (curentPerformance >= 0) {
      return {
        text: 'increase',
        type: 'increase',
        color: theme.colors.statusRed,
      };
    }

    return {
      text: 'decrease',
      type: 'decrease',
      color: theme.colors.statusGreen,
    };
  }

  return {
    text: '',
    type: 'N/A',
    color: '',
  };
};
