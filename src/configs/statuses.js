/* eslint-disable import/no-duplicates, max-len */
import React from 'react';

import ActionNeeded from 'images/status-action-needed.svg';
import MinorRisks from 'images/status-minor-risks.svg';
import InProgressIcon from 'images/in-progress.svg';
import OnTrack from 'images/status-on-track.svg';
import SupportCritical from 'images/status-support-critical.svg';
import NotYetStartedIcon from 'images/not-yet-started.svg';
import nearlyOnTarget from 'images/statuses/nearly-on-target.svg';
import onTarget from 'images/statuses/on-target.svg';
import notOnTarget from 'images/statuses/not-on-target.svg';

import { ReactComponent as ActionNeededIcon } from 'images/status-action-needed.svg';
import { ReactComponent as AtRiskIcon } from 'images/at-risk.svg';
import { ReactComponent as MinorRisksIcon } from 'images/status-minor-risks.svg';
import { ReactComponent as OnTrackIcon } from 'images/status-on-track.svg';
import { ReactComponent as SupportCriticalIcon } from 'images/status-support-critical.svg';

import theme from '../theme';

export const STATUSES_DATA = {
  actionNeeded: {
    key: 'actionNeeded',
    color: theme().colors.statusOrange,
    description: 'Problematic',
    icon: ActionNeeded,
    iconComponent: <ActionNeededIcon />,
    order: 3,
    text: 'Problematic',
  },
  minorRisks: {
    key: 'minorRisks',
    color: theme().colors.statusYellow,
    description: 'Mixed',
    icon: MinorRisks,
    iconComponent: <MinorRisksIcon />,
    order: 2,
    text: 'Mixed',
  },
  onTrack: {
    key: 'onTrack',
    color: theme().colors.statusGreen,
    description: 'Good',
    icon: OnTrack,
    iconComponent: <OnTrackIcon />,
    order: 1,
    text: 'Good',
  },
  supportCritical: {
    key: 'supportCritical',
    color: theme().colors.statusRed,
    description: 'Highly \n Problematic',
    icon: SupportCritical,
    iconComponent: <SupportCriticalIcon />,
    order: 4,
    text: 'Highly \n Problematic',
  },
};

export const MILESTONES_STATUSES = {
  complete: {
    key: 'complete',
    color: '#61c992',
    description: 'Done',
    icon: onTarget,
    iconComponent: <OnTrackIcon />,
    order: 1,
    text: 'Done',
  },
  'in-progress': {
    key: 'in-progress',
    color: '#e8ce5a',
    description: 'In Progress',
    icon: nearlyOnTarget,
    iconComponent: <InProgressIcon />,
    order: 2,
    text: 'In Progress',
  },
  'at-risk': {
    key: 'at-risk',
    color: '#db6767',
    description: 'At Risk',
    icon: notOnTarget,
    iconComponent: <AtRiskIcon />,
    order: 3,
    text: 'At Risk',
  },
  'seriously-at-risk': {
    key: 'seriously-at-risk',
    color: theme().colors.statusRed,
    description: 'Seriously at Risk',
    icon: SupportCritical,
    iconComponent: <SupportCritical />,
    order: 4,
    text: 'Seriously at Risk',
  },
  'not-yet-started': {
    key: 'not-yet-started',
    color: theme().colors.statusGray,
    description: 'Not started',
    icon: NotYetStartedIcon,
    iconComponent: <NotYetStartedIcon />,
    order: 5,
    text: 'Not started',
  },
};
