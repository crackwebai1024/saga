export const formatFields = (section) => {
  const payload = { ...section };

  delete payload.projectId;
  delete payload.countryId;
  delete payload.id;

  return payload;
};

export const formatOrderFields = (data) => {
  const payload = { ...data };
  delete payload.projectId;

  return payload;
};
