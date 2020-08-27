import filterDuplicates from 'helpers/filterDuplicates';

const getOptions = (array, option) => filterDuplicates(array.map((item) => item[option]));

export default getOptions;
