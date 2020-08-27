export const options = {
  rowsPerPageOptions: [5, 10, 15, 25],
};

export const columns = [
  {
    label: 'Start date',
    key: 'startDate',
    align: 'left',
  },
  {
    label: 'Estimated completion date',
    key: 'completionDate',
    align: 'left',
  },
  {
    label: 'Milestone',
    key: 'name',
    align: 'left',
  },
  {
    label: 'Responsible Party',
    key: 'responsibleParty',
    align: 'left',
  },
  {
    label: 'Status',
    key: 'status',
    align: 'left',
  },
  {
    label: 'Remarks',
    key: 'remarks',
    align: 'center',
  },
  {
    label: 'Actions',
    key: 'actions',
    align: 'center',
  },
];

export const toggleViewItems = [
  {
    value: 'details',
    label: 'Details',
  },
  {
    value: 'timeline',
    label: 'Timeline',
  },
];
