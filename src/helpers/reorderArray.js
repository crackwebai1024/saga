/**
 * Make copy of incoming array and reorder it's elements
 * @param array  {Array}
 * @param oldIndex {Number}
 * @param newIndex {Number}
 * @returns {Array}
 */
export const getReorderedArray = (array, newIndex, oldIndex) => {
  const reordered = array.map((item) => ({ ...item }));
  const [cuttedItem] = reordered.splice(oldIndex, 1);
  reordered.splice(newIndex, 0, cuttedItem);

  return reordered;
};

export const blank = () => {};
