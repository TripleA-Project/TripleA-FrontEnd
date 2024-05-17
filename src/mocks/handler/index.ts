import { mockAdminApi } from './admin';
import { authHandler } from './auth';
import { noticeHandler } from './notice';
import { mockStibeeApi } from './stibee';

export const mswHandler = [...authHandler, ...mockAdminApi, ...noticeHandler, ...mockStibeeApi];
