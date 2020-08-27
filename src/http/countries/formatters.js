export const formatFields = (country) => {
  const payload = { ...country };

  delete payload.deletedAt;
  delete payload.createdAt;
  delete payload.updatedAt;
  delete payload.id;
  delete payload.lat;
  delete payload.lng;
  delete payload.indicatorsDataCount;

  payload.citizens = +payload.citizens;

  if (payload.logoUpload && payload.logoUpload.length) {
    payload.logo = Array.isArray(payload.logoUpload) && payload.logoUpload[0];
    delete payload.logoUpload;
    const data = new FormData();

    Object.keys(payload).forEach((key) => data.append(key, payload[key]));
    return data;
  }

  delete payload.logoUpload;
  return payload;
};

export const formatFieldsTargets = (target) => {
  const payload = { ...target };

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
