const filterDuplicates = (array) => array.filter((v, i, a) => a.indexOf(v) === i);

export default filterDuplicates;
