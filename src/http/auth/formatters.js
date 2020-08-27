export const formatData = (data) => ({
  ...data,
  user: {
    ...data.user,
    cities: data.user.isAccessToAllCities
      ? [{ id: -1, name: 'All Cities', status: null }, ...data.user.cities]
      : data.user.cities,
  },
});

export const blank = () => {};
