export const getIsSystemIndicatorsGroups = (indicatorsGroups) => indicatorsGroups
  .filter((group) => group.indicators.length);

export default getIsSystemIndicatorsGroups;
