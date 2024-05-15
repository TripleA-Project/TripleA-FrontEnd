import { mockDeleteFreeTrialUserApi } from './deleteFreeTrialUser';
import { mockGetFreeTrialUsersApi } from './getFreeTrialUsers';
import { mockRegisterFreeTrialApi } from './registerFreeTrial';
import { mockUpdateFreeTrialApi } from './updateFreeTrialDate';

export const mockFreeTrialApi = [
  mockGetFreeTrialUsersApi,
  mockRegisterFreeTrialApi,
  mockUpdateFreeTrialApi,
  mockDeleteFreeTrialUserApi,
];
