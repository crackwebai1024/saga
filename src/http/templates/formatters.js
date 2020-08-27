export const formatFields = ({
  reportingPeriod,
  deleteOldData,
  file,
}) => {
  const payload = {
    deleteOldData,
    file: file[0],
  };

  if (reportingPeriod) {
    payload.reportingPeriod = reportingPeriod;
  }

  const data = new FormData();
  Object.keys(payload).forEach((key) => data.append(key, payload[key]));

  return data;
};

export const blank = () => {};
