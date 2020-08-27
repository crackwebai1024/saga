export const getIsInternetExplorer = () => navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode;

export const blank = () => {};
