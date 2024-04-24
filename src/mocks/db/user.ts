import { SiteUser } from '@/interfaces/Dto/Admin/GetSiteUsersDto';
import { siteUser } from './siteUser';

type User = SiteUser & {
  password: string;
};

export const users: User[] = siteUser.map((user, index) => ({
  ...user,
  password: `passWord${user.id}!`,
}));
