import { login } from './login';
import { logout } from './logout';
import { profile } from './profile';
import { requestAccessToken } from './requestAccessToken';
import { signup } from './signup';
import { mockAuthVerifyApi } from './verify';
import { withDrawl } from './withDrawal';

export const authHandler = [login, logout, signup, withDrawl, profile, requestAccessToken, ...mockAuthVerifyApi];
