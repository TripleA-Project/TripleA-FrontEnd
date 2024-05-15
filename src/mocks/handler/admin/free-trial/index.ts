import { mockDeleteFreeTrialUserApi } from './deleteFreeTrialUser';
import { mockGetFreeTrialUsersApi } from './getFreeTrialUsers';
import { mockRegisterFreeTrialApi } from './registerFreeTrial';
import { mockUpdateFreeTrialApi } from './updateFreeTrial';

export const mockFreeTrialApi = [
  mockGetFreeTrialUsersApi,
  mockRegisterFreeTrialApi,
  mockUpdateFreeTrialApi,
  mockDeleteFreeTrialUserApi,
];
