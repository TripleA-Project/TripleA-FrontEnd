import { login } from './login';
import { logout } from './logout';
import { profile } from './profile';
import { requestAccessToken } from './requestAccessToken';

export const authHandler = [login, logout, profile, requestAccessToken];
