import { AppLogos } from '@/components/Icons';

function NotFoundFreeTierUsers() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-[#eee]">
      <AppLogos.Orange className="w-9" />
      <span className="text-sm font-bold">등록된 무료체험 유저가 없습니다.</span>
    </div>
  );
}

export default NotFoundFreeTierUsers;
