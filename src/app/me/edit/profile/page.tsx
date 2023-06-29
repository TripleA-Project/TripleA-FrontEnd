import { Metadata } from 'next';
import { MdPersonOutline, MdOutlineDelete } from 'react-icons/md';
import Profile from '@/components/Profile';
import { getProfile } from '@/service/user';
import { ProfilePayload } from '@/interfaces/Dto/User';
import { ChartNotify } from '@/components/Chart';
import { AxiosError } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '내 정보 수정',
  description: 'Triple A 내 정보 수정',
};

async function EditProfilePage() {
  const profileResponse = await getProfile().catch((error) => (error as AxiosError<APIResponse>).response);

  const payload = profileResponse?.data.data;

  const profile = {
    email: typeof payload !== 'string' ? payload?.email : '',
    fullName: typeof payload !== 'string' ? payload?.fullName : '',
    membership: typeof payload !== 'string' ? payload?.membership : undefined,
  } as ProfilePayload;

  const loginRequired = profileResponse?.data?.status === 401;

  return (
    <>
      <div
        className={`mt-[73px] box-border px-4 ${loginRequired ? 'pointer-events-none overflow-hidden blur-sm' : ''}`}
      >
        <Profile mode="view" userProfile={profile} />
        <div className="divide-y-8 divide-[#F5F7F9]">
          <div className="mb-[61px] mt-11 box-border pl-5 font-semibold text-[#5B6267]">{profile.email}</div>
          <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
            <div className="flex items-center gap-3.5 text-[#5B6267]">
              <MdPersonOutline className="shrink-0 text-2xl" />
              <span className="font-semibold">비밀번호 변경하기</span>
            </div>
            <div className="flex items-center gap-3.5 text-[#5B6267]">
              <MdOutlineDelete className="shrink-0 text-2xl" />
              <span className="font-semibold">회원탈퇴</span>
            </div>
          </div>
          <div />
        </div>
      </div>
      {loginRequired ? (
        <ChartNotify
          title="로그인이 필요합니다"
          content="로그인 후 이용해주세요"
          buttonText="로그인하러 가기"
          linkTarget="/login"
        />
      ) : null}
    </>
  );
}

export default EditProfilePage;
