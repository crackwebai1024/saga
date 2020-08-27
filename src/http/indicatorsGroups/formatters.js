export const formatFields = (indicatorsGroup) => {
  const payload = {};
  payload.title = indicatorsGroup.title;

  // delete payload.deletedAt;
  // delete payload.createdAt;
  // delete payload.updatedAt;
  //
  // delete payload.indicators;
  // delete payload.isSystem;
  // delete payload.countryId;
  // delete payload.sectionId;
  // delete payload.indicatorsGroupId;
  // delete payload.order;
  // delete payload.id;

  return payload;
};

export const formatOrderFields = (data) => {
  const payload = { ...data };
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;

  return payload;
};

export const formatGroupData = (data) => {
  const payload = {
    groupTarget: +data.groupTarget || null,
    status: data.status || null,
    value: +data.value || null,
    valueType: data.valueType,
    year: data.year,
  };

  return payload;
};
