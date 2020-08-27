import moment from 'moment';

export const quarters = ['Q1', 'Q2', 'Q3', 'Q4'];
export const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const now = moment(`${moment().year()}/${moment().months() + 1}/28`);

export const formatMilestones = (data) => {
  let minYear = now.year();
  let maxYear = now.year() + 1;

  const body = [];
  const header = [];

  data.forEach((item) => {
    const startMonth = moment(item.startDate).months();
    const startYear = moment(item.startDate).year();
    const endYear = moment(item.completionDate).year();
    const endMonth = moment(item.completionDate).months();

    const width = Math.round(
      moment.duration(
        moment(`${endYear}/${endMonth}/28`).diff(moment(`${startYear}/${startMonth}/01`)),
      ).asMonths(),
    );

    if (startYear < minYear) {
      minYear = startYear;
    }

    if (endYear > maxYear) {
      maxYear = endYear;
    }

    body.push({
      title: item.name,
      status: item.status,
      startMonth,
      startYear,
      width,
    });
  });

  const bodyStartYear = minYear;
  const bodyRowData = [];

  do {
    header.push({
      year: minYear,
      quarters,
      monthes,
    });
    minYear += 1;
    bodyRowData.push(...monthes);
  } while (minYear <= maxYear);

  return {
    header,
    body,
    bodyConfig: {
      rowData: bodyRowData,
      start: bodyStartYear,
    },
    currentYear: now.year(),
    currentMonth: now.format('MMM'),
  };
};

export const getCurrentPosition = (startYear) => Math.round(
  moment
    .duration(now.diff(moment(`${startYear}-01-01`)))
    .asMonths() - 1,
);

export const getStartBlockIndex = (startYear, dataStartYear, dataStartMonth) => Math.round(
  moment
    .duration(moment(`${dataStartYear}-${dataStartMonth}-01`, 'YYYY-MM-DD').diff(moment(`${startYear}-01-01`)))
    .asMonths(),
);
