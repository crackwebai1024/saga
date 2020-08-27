const getIdByTitle = (sections, title) => sections
  .map((section) => section.indicatorGroups).flat()
  .map((indicatorGroup) => indicatorGroup.indicators).flat()
  .find((indicator) => indicator.title === title).id;

export default getIdByTitle;
