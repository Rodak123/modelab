/**
 * A tuple of all the routes in the application.
 */
export const ROOT_ROUTES = {
  LandingPage: () => '/' as const,
  Browser: () => '/browser' as const,
  About: () => '/about' as const,
  ModelDetail: (modelId?: number) => `/models/${modelId ?? ':modelId'}` as const,
  AdminRoot: () => '/admin' as const,
} as const;

/**
 * A tuple of all the admin routes.
 */
export const ADMIN_ROUTES = {
  Login: () => `${ROOT_ROUTES.AdminRoot()}/login/`,
  ModelManage: (action?: number | 'upload') =>
    `${ROOT_ROUTES.AdminRoot()}/manage/${action ?? ':action'}`,
  Panel: () => `${ROOT_ROUTES.AdminRoot()}/panel/`,
  Users: () => `${ROOT_ROUTES.AdminRoot()}/users/`,
  Assets: () => `${ROOT_ROUTES.AdminRoot()}/assets/`,
};
