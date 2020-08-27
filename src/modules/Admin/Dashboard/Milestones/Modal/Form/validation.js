import moment from 'moment';

export const validate = ({
  indicatorId,
  name,
  status,
  remarks,
  completionDate,
  startDate,
}) => {
  const errors = {};

  if (!indicatorId) {
    errors.indicatorId = 'Indicator is required';
  }

  if (!name || (name && !name.trim())) {
    errors.name = 'Milestone is required';
  }

  if (!status) {
    errors.status = 'Status is required';
  }

  if (remarks && remarks.length > 600) {
    errors.remarks = 'Remark is too long';
  }

  if (completionDate && startDate && moment(startDate).isAfter(completionDate)) {
    errors.startDate = 'Start date cannot be after Estimated completion date';
    errors.completionDate = 'Estimated completion date cannot be before Start date';
  }

  return errors;
};

export const blank = () => {};
