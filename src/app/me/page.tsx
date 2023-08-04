import { Metadata } from 'next';
import { MdOutlineContentPaste, MdOutlineSettings } from 'react-icons/md';
import Link from 'next/link';
import Profile from '@/components/Profile';
import { ChartNotify } from '@/components/Chart';
import { getProfile } from '@/service/user';
import { AxiosError } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';
import { ProfilePayload } from '@/interfaces/Dto/User';
import SubscribeInfo from '@/components/Subscribe/SubscribeInfo';

export const revalidate = 0;

export const metadata: Metadata = {
  title: '마이 페이지',
  description: 'Triple A 마이페이지',
};

async function MyPage() {
  const profileResponse = await getProfile().catch((error) => (error as AxiosError<APIResponse>).response);

  const payload = profileResponse?.data.data;

  console.log({ payload });

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
        <Profile userProfile={profile} />
        <SubscribeInfo membership={profile.membership} />
        <div className="divide-y-8 divide-[#F5F7F9]">
          <div />
          <div className="box-border flex flex-col justify-center gap-5 px-5 py-[34px]">
            <div className="flex items-center gap-3.5 text-[#5B6267]">
              <MdOutlineContentPaste className="shrink-0 text-2xl" />
              <span className="font-semibold">약관 및 개인정보 처리 동의서</span>
            </div>
            <Link href="/logout" className="flex items-center gap-3.5 text-[#5B6267]">
              <MdOutlineSettings className="shrink-0 text-2xl" />
              <span className="font-semibold">로그아웃</span>
            </Link>
          </div>
          <div className="box-border flex justify-center pt-[18px] text-[15px] font-semibold text-[#5B6267]">
            앱 버전
          </div>
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

export default MyPage;
