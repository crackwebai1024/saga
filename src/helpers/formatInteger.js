const regExp = /(\d)(?=(\d{3})+(?!\d))/g;

const separator = ',';

export default function formatInteger(int, sep = separator) {
  const replacer = `$1${sep}`;

  return Math.floor(int).toString().replace(regExp, replacer);
}
