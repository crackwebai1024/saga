const pathsToIgnoreOnIsAuthenticatedFailure = [
  'login',
  'forgot-password',
  'password/set',
  'password/reset',
  'terms/agreement',
  'terms/policy',
];

export const isAuthenticatedFailureIgroredPathsInclude = (path) => (
  pathsToIgnoreOnIsAuthenticatedFailure.some((item) => (
    path.toLowerCase().includes(item.toLowerCase())
  ))
);

export const blank = {};
