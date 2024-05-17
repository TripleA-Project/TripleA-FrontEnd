import { mockChangeUserRoleApi } from './chageUserRole';
import { mockDeleteUserApi } from './deleteUser';
import { mockGetNumOfSiteUsersApi } from './getNumOfSiteUsers';
import { mockGetSiteUsersApi } from './getSiteUsers';
import { mockSearchSiteUserApi } from './searchUser';

export const mockAdminManageUserApi = [
  mockGetSiteUsersApi,
  mockGetNumOfSiteUsersApi,
  mockSearchSiteUserApi,
  mockChangeUserRoleApi,
  mockDeleteUserApi,
];
