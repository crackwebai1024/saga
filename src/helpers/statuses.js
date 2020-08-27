import notOnTarget from 'images/statuses/not-on-target.svg';
import nearlyNotOnTarget from 'images/statuses/nearly-not-on-target.svg';
import nearlyOnTarget from 'images/statuses/nearly-on-target.svg';
import onTarget from 'images/statuses/on-target.svg';
import crossPin from 'images/statuses/map_pins/cross-pin.svg';
import minusPin from 'images/statuses/map_pins/minus-pin.svg';
import plusPin from 'images/statuses/map_pins/plus-pin.svg';
import tickPin from 'images/statuses/map_pins/tick-pin.svg';

export const STATUSES = {
  'not-on-target': {
    key: 'not-on-target',
    name: 'Highly problematic',
    color: '#db6767',
    icon: notOnTarget,
    pin: crossPin,
    i18nKey: 'not_on_target',
  },
  'nearly-not-on-target': {
    key: 'nearly-not-on-target',
    name: 'Problematic',
    color: '#e8a758',
    icon: nearlyNotOnTarget,
    pin: minusPin,
    i18nKey: 'nearly_not_on_target',
  },
  'nearly-on-target': {
    key: 'nearly-on-target',
    name: 'Mixed',
    color: '#e8ce5a',
    icon: nearlyOnTarget,
    pin: plusPin,
    i18nKey: 'nearly_on_target',
  },
  'on-target': {
    key: 'on-target',
    name: 'Good',
    color: '#61c992',
    icon: onTarget,
    pin: tickPin,
    i18nKey: 'on_target',
  },
};

export const INDICATOR_STATUSES = {
  automatic: {
    key: 'automatic',
    name: 'Automatic',
    color: '#61c992',
  },
  ...STATUSES,

};

export const showedStatuses = {
  [STATUSES['on-target'].key]: 'Good',
  [STATUSES['nearly-on-target'].key]: 'Mixed',
  [STATUSES['nearly-not-on-target'].key]: 'Problematic',
  [STATUSES['not-on-target'].key]: 'Highly Problematic',
};
