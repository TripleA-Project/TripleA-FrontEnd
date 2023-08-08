import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AxiosError, HttpStatusCode } from 'axios';
import EditProfile from '@/components/Profile/EditProfile';
import { getProfile } from '@/service/user';
import { type ProfilePayload, type ProfileResponse } from '@/interfaces/Dto/User';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Triple A | 내 정보 수정',
  description: 'Triple A 내 정보 수정',
};

async function EditProfilePage() {
  const profileResponse = await getProfile().catch((error) => (error as AxiosError<ProfileResponse>).response);

  const payload = profileResponse?.data;

  const loginRequired =
    profileResponse?.data?.status === HttpStatusCode.Unauthorized || payload?.status === HttpStatusCode.Unauthorized;

  if (loginRequired) {
    redirect('/login?continueURL=/mypage/edit/profile');
  }

  const profile = {
    email: payload?.data?.email ?? '',
    fullName: payload?.data?.fullName ?? '',
    membership: payload?.data?.membership ?? 'BASIC',
  } as ProfilePayload;

  return (
    <>
      <div
        className={`mt-[73px] box-border px-4 ${loginRequired ? 'pointer-events-none overflow-hidden blur-sm' : ''}`}
      >
        <EditProfile
          user={{
            email: profile.email,
            fullName: profile.fullName,
            memberShip: profile.membership,
          }}
        />
      </div>
    </>
  );
}

export default EditProfilePage;
