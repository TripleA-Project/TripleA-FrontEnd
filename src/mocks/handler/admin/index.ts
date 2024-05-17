import { mockFreeTrialApi } from './free-trial';
import { mockAdminManageUserApi } from './user';
import { mockAdminVerifyApi } from './verify';

export const mockAdminApi = [...mockAdminVerifyApi, ...mockAdminManageUserApi, ...mockFreeTrialApi];
