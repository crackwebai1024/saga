export const periods = [
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'all',
];

export const periodsWithLabel = [{
  key: 'daily',
  text: 'Daily',
}, {
  key: 'weekly',
  text: 'Weekly',
}, {
  key: 'monthly',
  text: 'Monthly',
}, {
  key: 'yearly',
  text: 'Yearly',
}, {
  key: 'all',
  text: 'All time',
}];

export const getCalendarView = (period) => {
  const view = {};
  switch (period) {
    case 'yearly':
      view.views = ['year'];
      break;
    case 'monthly':
      view.views = ['year', 'month'];
      break;
    default:
      break;
  }
  return view;
};

export const getCalendarLabel = (period) => {
  let label = '';
  switch (period) {
    case 'yearly':
      label = 'Year';
      break;
    case 'monthly':
      label = 'Year and month';
      break;
    case 'weekly':
      label = 'The week of';
      break;
    default:
      label = 'Date';
      break;
  }
  return label;
};
