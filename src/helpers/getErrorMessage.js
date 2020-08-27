export default (error = {}) => {
  if (typeof error === 'string') {
    return error;
  }

  if (error.response && error.response.data && error.response.data.error) {
    return error.response.data.error;
  }

  if (error.payload && error.payload.response && error.payload.response.data && error.payload.response.data.error) {
    return error.payload.response.data.error;
  }

  if (Array.isArray(error)) {
    return error;
  }

  if (error.payload && error.payload.error) {
    return error.payload.error;
  }

  if (error.message && error.message.error) {
    return error.message.error;
  }

  return error.message || '';
};
