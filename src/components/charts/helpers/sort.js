export default (order, data) => {
  if (order === 'az') { return data; }

  const copy = [...data];

  if (order === 'za') { return copy.reverse(); }

  const flag = order === 'vup' ? 1 : -1;

  copy.sort((a, b) => {
    if (a.y > b.y) {
      return flag;
    }

    return -flag;
  });

  return copy;
};
