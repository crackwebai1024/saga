export const accuracy = 6;

const toFloat = (value) => parseFloat(value);

const canParse = (value) => toFloat(value) === +value;

const outOfRange = (value, limit) => toFloat(value) > limit || toFloat(value) < -limit;

const hasFraction = (value) => /\d\.\d+$/.test(toFloat(value));

const isAcceptedAccuracy = (value) => {
  const accuracyRegExp = new RegExp(`\\.\\d{1,${accuracy}}$`);

  return canParse(value) && (!hasFraction(value) || accuracyRegExp.test(toFloat(value)));
};

export const isLatValid = (value) => {
  if (!canParse(value) || outOfRange(value, 90) || !isAcceptedAccuracy(value)) {
    return false;
  }

  return true;
};

export const isLngValid = (value) => {
  if (!canParse(value) || outOfRange(value, 180) || !isAcceptedAccuracy(value)) {
    return false;
  }

  return true;
};

export const geoJsonCoordToLatLng = (arr) => {
  if (!arr[0] || !arr[0][0] || !arr[0][0][0]) {
    return [];
  }

  if (Array.isArray(arr[0][0][0])) {
    return arr.map((polygon) => polygon[0].map((coord) => ({
      lat: coord[1],
      lng: coord[0],
    })));
  }

  return arr[0].map((coord) => ({
    lat: coord[1],
    lng: coord[0],
  }));
};
