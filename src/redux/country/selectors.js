import { createSelector } from 'reselect';

const getSections = (details) => (details && details.sections) || [];
const getSectionId = (state, props) => +props.sectionId;

export const getSectionTitle = createSelector(
  [getSections, getSectionId],
  (sections, sectionId) => {
    const section = sections.find((sectionItem) => sectionItem.id === sectionId);

    return (section && section.title) || '';
  },
);

const getGroups = (details) => {
  if (!details) {
    return [];
  }

  return details.sections.map((section) => section.indicatorGroups).flat();
};
const getGroupId = (state, props) => props.groupId && +props.groupId;

export const getGroupTitle = createSelector(
  [getGroups, getGroupId],
  (groups, groupId) => {
    const group = groups.find((groupItem) => groupItem.id === groupId);

    return (group && group.title) || '';
  },
);

export const blank = () => {};
