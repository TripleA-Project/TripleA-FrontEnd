import { APIResponse } from '../Core';
import { SiteUser } from './GetSiteUsersDto';

export interface ChangeUserRoleRequest {
  email: SiteUser['email'];
  role: SiteUser['memberRole'];
}

export interface ChangeUserRoleResponse extends APIResponse {}
