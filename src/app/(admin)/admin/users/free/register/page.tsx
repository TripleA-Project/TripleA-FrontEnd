import { Metadata } from 'next';
import AdminRegisterFreeTrialUserPage from './_components/Page';
import { getFreeTrialUsers, getSiteUsers } from '@/service/admin';
import { SiteUsersPayload } from '@/interfaces/Dto/Admin/GetSiteUsersDto';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A 관리자 | 무료체험 등록',
  description: 'Triple A 관리자 | 무료체험 등록',
};

export default async function RegisterFreeTrialUser() {
  const siteUsersResponse = await getSiteUsers();
  const freeTierUsersResponse = await getFreeTrialUsers();

  const siteUsers = siteUsersResponse.data?.data?.length ? siteUsersResponse.data.data : [];
  const freeTierUsers = freeTierUsersResponse.data?.data?.length ? freeTierUsersResponse.data.data : [];

  const freeTrialableUsers: SiteUsersPayload = !siteUsers.length
    ? []
    : siteUsers.filter(
        (user) => user.memberRole === 'USER' && !freeTierUsers.find((freeTierUser) => freeTierUser.id === user.id),
      );

  return (
    <div className="relative min-h-[calc(100vh-115px)] overflow-auto px-2">
      <div className="relative z-[2] h-[18px] bg-white" />
      <AdminRegisterFreeTrialUserPage freeTrialableUsers={freeTrialableUsers} />
    </div>
  );
}
