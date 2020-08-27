const regExp = /(\d)(?=(\d{3})+(?!\d))/g;

const isFloatExp = /^[-+]?[0-9]+\.[0-9]+$/;

const separator = ',';
export const getRoundedValue = (
  value,
  decPlaces = 2,
  withLimit = true,
  limit = 9999,
) => {
  const dec = 10 ** decPlaces;
  let number;

  if (typeof value === 'string') {
    number = Number(value.replace(',', ''));
  } else {
    number = Number(value);
  }

  if (Number.isNaN(number) || (withLimit && number <= limit)) {
    return value;
  }

  if (isFloatExp.test(number)) {
    number = number.toFixed(2);
  }

  const abbrev = ['K', 'M', 'B', 'T'];

  for (let i = abbrev.length - 1; i >= 0; i -= 1) {
    const size = 10 ** ((i + 1) * 3);

    if (size <= number) {
      number = Math.round(number * dec / size) / dec;
      if ((number === 1000) && (i < abbrev.length - 1)) {
        number = 1;
        i += 1;
      }

      number += abbrev[i];
      if (number.length > 5) {
        number = number.split('.')[0] + abbrev[i];
      }
      break;
    }
  }

  return number;
};

export default function getPraparedValueForShow(int, sep = separator) {
  const replacer = `$1${sep}`;

  if (int > 999999) {
    return getRoundedValue(int);
  }
  return Math.floor(int).toString().replace(regExp, replacer);
}
