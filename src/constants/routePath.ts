export const API_ROUTE_PATH = {
  LOGIN: `/api/login`,
  LOGOUT: `/api/auth/logout`,
  REQUEST_ACCESS_TOKEN: '/api/refresh',
  USER: {
    PROFILE: `/api/auth/user/me`,
  },
  ADMIN: {
    GET_SITE_USERS: `/api/admin/user/list`,
    GET_SITE_USERS_NUMS: `/api/admin/user/list/length`,
    SEARCH: `/api/admin/user/list/search`,
    AUTH: {
      SEND_ADMIN_AUTH_EMAIL: `/api/admin/email`,
      ADMIN_EMAIL_VERIFY: `/api/admin/email/verify`,
    },
    MANAGE_USER: {
      CHANGE_USER_ROLE: `/api/admin/user/role`,
      DELETE_USER: (id?: number) => `/api/admin/user/delete/${id ?? ':id'}`,
    },
    NOTICE: {
      CREATE_NOTICE: `/api/admin/notice/save`,
      UPDATE_NOTICE: `/api/admin/notice/update`,
      DELETE_NOTICE: (id?: number) => `/api/admin/notice/delete/${id ?? ':id'}`,
    },
  },
  NOTICE: {
    GET_NOTICE_LIST: `/api/auth/notice/list`,
    GET_NOTICE_DETAIL: (id?: number) => `/api/auth/notice/detail/${id ?? ':id'}`,
  },
};

export const ROUTE_PATH = {
  LOGIN: (continuePath?: string) =>
    continuePath ? `/login?continueURL=${encodeURIComponent(continuePath)}` : '/login',
  LOGOUT: `/logout`,
  ADMIN: {
    DASH_BOARD: '/admin/dashboard',
  },
  NOTICE: {
    LIST: `/notice`,
    DETAIL: (id: number) => `/notice/${id}`,
    POST: `/admin/notice/post`,
    UPDATE: (id: number) => `/admin/notice/post/${id}`,
  },
};
