import { adminHandler } from './admin';
import { authHandler } from './auth';
import { noticeHandler } from './notice';

export const mswHandler = [...authHandler, ...adminHandler, ...noticeHandler];
