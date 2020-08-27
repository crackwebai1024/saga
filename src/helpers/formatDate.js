import moment from 'moment';

const formats = {
  global: 'MM/DD/YYYY',
  event: 'MMMM D, YYYY',
  dateTime: 'DD/MM/YYYY HH:mm',
};

export const formatDate = (date, type) => {
  const format = type ? formats[type] : formats.global;

  return date ? moment.utc(date).format(format) : null;
};

export const cleanDate = (date) => (
  moment.utc(date).set({ h: 0, m: 0, s: 0 })
);

export const getMonthYearFormatDate = (date) => (
  date ? moment(date).format('MMMM YYYY') : null
);

export const getFormatedDateTime = (date, format = formats.dateTime) => (
  date ? moment(date).format(format) : null
);
