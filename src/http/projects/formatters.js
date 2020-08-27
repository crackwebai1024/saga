export const formatFields = (project) => {
  const payload = { ...project };

  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.deletedAt;
  delete payload.countryId;
  delete payload.id;

  return payload;
};

export const noop = () => {};
