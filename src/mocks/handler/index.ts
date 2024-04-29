import { adminHandler } from './admin';
import { authHandler } from './auth';
import { noticeHandler } from './notice';
import { mockStibeeApi } from './stibee';

export const mswHandler = [...authHandler, ...adminHandler, ...noticeHandler, ...mockStibeeApi];
