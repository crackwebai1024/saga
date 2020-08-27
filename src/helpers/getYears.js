export const getCurrentYear = () => new Date().getFullYear();

export const getYearsRange = () => {
  const currentYear = getCurrentYear();
  const range = [];
  for (let i = -5; i <= 5; i += 1) {
    range.push(currentYear + i);
  }
  return range;
};
