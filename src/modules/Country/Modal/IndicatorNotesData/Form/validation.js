const validate = ({
  note,
  highlights,
  lowlights,
}) => {
  const errors = {};

  if (note && note.length > 600) {
    errors.note = 'Note is too long';
  }

  if (highlights && highlights.length > 600) {
    errors.highlights = 'Highlights is too long';
  }

  if (lowlights && lowlights.length > 600) {
    errors.lowlights = 'Lowlights is too long';
  }

  return errors;
};

export default validate;
