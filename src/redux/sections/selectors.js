import { createSelector } from 'reselect';

const getSections = (state) => state.sections.sections;
const getSectionId = (state, props) => props.sectionId;
const getIndicatorGroupId = (state, props) => props.indicatorsGroupId;

export const getIndicatorsGroup = createSelector(
  [getSections, getSectionId, getIndicatorGroupId],
  (sections, sectionId, indicatorsGroupId) => (
    sections
      .filter((section) => section.id === sectionId)[0]
      .indicatorGroups
      .filter((iGroup) => iGroup.id === indicatorsGroupId)[0]
  ),
);

export const blank = () => {};
