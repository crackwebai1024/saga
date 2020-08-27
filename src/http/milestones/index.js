import http from 'http/index';

export const getResponsibleParties = () => http.get('/responsibleParties').then((res) => res.data);

export const getIndicatorGroups = ({ sectionId, countryId, projectId }) => http
  .get(`/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group`).then((res) => res.data);

export const getMilestones = ({
  countryId,
  projectId,
  sectionId,
  indicatorsGroupId,
  indicatorId,
  ...params
}) => (
  http.get(
    // eslint-disable-next-line max-len
    `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorsGroupId}/indicator/${indicatorId}/milestones`,
    { params },
  ).then((res) => res.data));

export const getMilestonesGraph = ({
  countryId,
  projectId,
  sectionId,
  indicatorsGroupId,
  indicatorId,
}) => (
  http.get(
    // eslint-disable-next-line max-len
    `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorsGroupId}/indicator/${indicatorId}/milestones/graph`,
  ).then((res) => res.data)
);

export const getUpcomingMilestones = ({
  countryId,
  projectId,
  sectionId,
  indicatorsGroupId,
  indicatorId,
}) => (
  http.get(
    // eslint-disable-next-line max-len
    `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorsGroupId}/indicator/${indicatorId}/milestones/upcoming`,
  ).then((res) => res.data)
);

export const createMilestone = ({
  countryId,
  projectId,
  sectionId,
  indicatorGroupId,
  milestoneData,
}) => {
  const { indicatorId } = milestoneData;
  return http.post(
    // eslint-disable-next-line max-len
    `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorGroupId}/indicator/${indicatorId}/milestones`,
    milestoneData,
  );
};

export const updateMilestone = ({
  countryId,
  projectId,
  sectionId,
  indicatorGroupId,
  milestoneData,
  milestoneId,
}) => {
  const { indicatorId } = milestoneData;
  return http.put(
    // eslint-disable-next-line max-len
    `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorGroupId}/indicator/${indicatorId}/milestones/${milestoneId}`,
    milestoneData,
  );
};

export const deleteMilestone = ({
  indicatorId,
  countryId,
  projectId,
  sectionId,
  indicatorGroupId,
  milestoneId,
}) => http.delete(
  // eslint-disable-next-line max-len
  `/countries/${countryId}/projects/${projectId}/sections/${sectionId}/indicator-group/${indicatorGroupId}/indicator/${indicatorId}/milestones/${milestoneId}`,
);
