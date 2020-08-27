const maxLength = 30;

export const formatTitleForCard = (title) => (title.length > maxLength ? `${
  title.substr(0, maxLength).trim()
}...` : title);

export const noop = () => {};
