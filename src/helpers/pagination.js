export const getSuitable = (count, rowsPerPage, values) => {
  if (count < rowsPerPage) {
    return values.filter((value) => value >= count)[0];
  }

  return rowsPerPage;
};

export const shouldUpdate = (newValue, current) => newValue !== current;

export const isPageOutOfRange = (count, rowsPerPage, pageIndex) => (rowsPerPage * pageIndex >= count);
