const googleMapKey = process.env.REACT_APP_GOOGLE_KEY;

export const getGoogleMapLink = () => (
  `https://maps.googleapis.com/maps/api/js?key=${googleMapKey}&v=3.exp&libraries=geometry,drawing,places`
);

export const blank = () => {};
