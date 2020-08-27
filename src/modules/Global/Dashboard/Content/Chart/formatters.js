import { STATUSES } from 'helpers/statuses';

export const formatStatusData = (data) => {
  const STATUSES_ORDER = [
    STATUSES['on-target'].key,
    STATUSES['nearly-on-target'].key,
    STATUSES['nearly-not-on-target'].key,
    STATUSES['not-on-target'].key,
  ];

  const items = data.items
    .sort((a, b) => STATUSES_ORDER.indexOf(a.status) - STATUSES_ORDER.indexOf(b.status))
    .map(({ status, count }, index) => ({
      x: status,
      y: count,
      order: index,
    }));

  return {
    ...data,
    items,
  };
};

export const blank = () => {};
