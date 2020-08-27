export const formatFields = (user) => {
  const payload = { ...user };

  delete payload.deletedAt;
  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.id;

  return { ...payload };
};

export const makeFormData = (file) => {
  const data = new FormData();
  data.append('file', file);
  return data;
};
