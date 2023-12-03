import { adminHandler } from './admin';
import { authHandler } from './auth';

export const mswHandler = [...authHandler, ...adminHandler];
