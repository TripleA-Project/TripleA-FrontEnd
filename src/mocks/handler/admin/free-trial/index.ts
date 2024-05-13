import { mockDeleteFreeTrialUserApi } from './deleteFreeTrialUser';
import { mockGetFreeTrialUsersApi } from './getFreeTrialUsers';
import { mockRegisterFreeTrialApi } from './registerFreeTrial';
import { mockUpdateFreeTrialDateApi } from './updateFreeTrialDate';

export const mockFreeTrialApi = [
  mockGetFreeTrialUsersApi,
  mockRegisterFreeTrialApi,
  mockUpdateFreeTrialDateApi,
  mockDeleteFreeTrialUserApi,
];
