import { INDICATOR_STATUSES } from 'helpers/statuses';

export const formatFields = (indicator) => {
  const payload = { ...indicator };

  delete payload.deletedAt;
  delete payload.createdAt;
  delete payload.updatedAt;

  delete payload.indicatorsSettings;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;
  delete payload.order;
  delete payload.id;
  delete payload.customFields;
  delete payload.dataCount;
  delete payload.note;
  delete payload.highlightsTitle;
  delete payload.highlights;
  delete payload.lowlightsTitle;
  delete payload.lowlights;

  return payload;
};

export const formatDataTable = (data) => {
  const fields = [...data.fields, { title: 'Delete', key: 'delete', className: 'delete' }];

  const newData = data.data.map((item) => fields.map((field) => {
    if (field.key === 'date' || field.key === 'regionId') {
      return {
        value: null,
        dataValue: item[field.key],
        rowId: item.id,
        key: field.key,
        readOnly: true,
      };
    }

    if (field.key === 'year' && data.reportingPeriodType === 'year') {
      return {
        value: item[field.key],
        rowId: item.id,
        key: field.key,
        readOnly: true,
      };
    }

    if (field.isCustom) {
      return {
        value: item.customFields[field.key],
        rowId: item.id,
        key: field.key,
        isCustom: field.isCustom,
      };
    }

    return { value: item[field.key], rowId: item.id, key: field.key };
  }));

  return { ...data, data: newData, fields };
};

export const formatData = (data) => (
  data.data.map((item) => {
    const newFormat = {
      indicatorId: Number(data.indicatorId),
    };

    item.forEach((obj) => {
      if (obj.key === 'date' || obj.key === 'regionId') {
        newFormat[obj.key] = obj.dataValue || obj.dateValue;
      } else if (obj.isCustom) {
        newFormat.customFields = {
          ...(newFormat.customFields || {}),
          [obj.key]: obj.value,
        };
      } else if (obj.key !== 'delete') {
        newFormat[obj.key] = obj.value;
      }
    });

    return newFormat;
  })
);

export const formatNotesFields = (indicator) => {
  const payload = { ...indicator };

  delete payload.deletedAt;
  delete payload.createdAt;
  delete payload.updatedAt;

  delete payload.requestedYear;
  delete payload.indicatorsSettings;
  delete payload.countrySlug;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;
  delete payload.order;
  delete payload.id;
  delete payload.customFields;
  delete payload.dataCount;
  delete payload.title;
  delete payload.year;
  delete payload.status;

  return payload;
};

export const formatSettings = (settings) => {
  const payload = { ...settings };

  delete payload.deletedAt;
  delete payload.createdAt;
  delete payload.updatedAt;

  delete payload.id;
  delete payload.indicatorId;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;

  return payload;
};

export const formatCustomFields = (fields) => {
  const payload = { ...fields };
  delete payload.indicatorId;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;

  return payload;
};

export const formatOrderFields = (data) => {
  const payload = { ...data };
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;

  return payload;
};

export const formatDetailFields = (details) => {
  const payload = { ...details };

  delete payload.countryId;
  delete payload.projectId;
  delete payload.id;
  delete payload.year;
  delete payload.selector;
  delete payload.selectedPeriod;

  return payload;
};

export const formatColor = (colorData) => {
  const payload = { ...colorData };

  delete payload.id;
  delete payload.indicatorId;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;

  return payload;
};

export const formatStatus = (statusData) => {
  const payload = { ...statusData };
  payload.status = payload.status !== INDICATOR_STATUSES.automatic.key ? payload.status : null;

  delete payload.id;
  delete payload.countrySlug;
  delete payload.countryId;
  delete payload.projectId;
  delete payload.note;
  delete payload.highlightsTitle;
  delete payload.highlights;
  delete payload.lowlightsTitle;
  delete payload.lowlights;
  delete payload.projectId;
  delete payload.sectionId;
  delete payload.indicatorsGroupId;
  return payload;
};
