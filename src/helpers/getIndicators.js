import filterDuplicates from 'helpers/filterDuplicates';

function find(array, id) {
  return array ? array.find((elem) => elem.id === parseInt(id, 10)) : array;
}

export const getIndicatorsAndName = (sections, sectionId, groupId) => {
  const section = find(sections, sectionId);
  if (!section) {
    return null;
  }
  const groups = section.indicatorGroups;
  const group = find(groups, groupId);

  return [group.title, group.indicators];
};

export const getAllIndicators = (sections) => {
  const array = sections
    .map((item) => item.indicatorGroups)
    .flat()
    .map((item) => item.indicators)
    .map((item) => item.map((innerItem) => innerItem.title))
    .flat();
  return filterDuplicates(array);
};
