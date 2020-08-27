import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_API;

const http = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

// if IE append timestamp to the url
// see cashing issue:
// https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/12246819/
// try-fix for AWS cors issue
// TODO: if it works remove condition

if (true) {
  http.interceptors.request.use((config) => {
    if (config.url.indexOf('?') !== -1) {
      config.url = `${config.url}&t=${Date.now()}`;
    } else {
      config.url = `${config.url}?t=${Date.now()}`;
    }

    return config;
  });
}

export default http;
