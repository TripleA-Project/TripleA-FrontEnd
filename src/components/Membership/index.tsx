import { MdCheck } from 'react-icons/md';
import SubscribeButton from './SubscribeButton';

function Membership() {
  return (
    <>
      <div className={`box-border justify-center bg-[#F5F7F9] px-9 py-7`}>
        <div className="flex flex-col gap-6">
          <div className="box-border rounded-[10px] bg-white px-6 py-7">
            <h3 className="relative mb-5 w-fit text-xl font-bold">
              <div className="absolute bottom-0.5 left-0 h-[7px] w-full bg-[#FFC499] " />
              <span className="z-1 relative inline-block align-top">유료회원</span>
            </h3>
            <ul className="mb-2 flex flex-col gap-[10px]">
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">뉴스 요약문 무제한 제공</span>
              </li>
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">관심 심볼 및 카테고리 무제한 제공</span>
              </li>
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">기사 북마크 기능 무제한 제공</span>
              </li>
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">차트보기 제공</span>
              </li>
            </ul>
            <p className="my-6 text-center text-lg font-bold">월 {Intl.NumberFormat('ko').format(10000)}원</p>
            <SubscribeButton />
          </div>
          <div className="box-border rounded-[10px] bg-white px-6 py-7">
            <h3 className="relative mb-5 w-fit text-xl font-bold">
              <div className="absolute bottom-0.5 left-0 h-[7px] w-full bg-[#FFC499] " />
              <span className="z-1 relative inline-block align-top">일반회원</span>
            </h3>
            <ul className="mb-2 flex flex-col gap-[10px]">
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">뉴스 요약문 매일 10개 제공</span>
              </li>
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">관심 심볼 및 카테고리 3개까지 제공</span>
              </li>
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">북마크 기능 무제한 제공</span>
              </li>
            </ul>
          </div>
          <div className="box-border rounded-[10px] bg-white px-6 py-7">
            <h3 className="relative mb-5 w-fit text-xl font-bold">
              <div className="absolute bottom-0.5 left-0 h-[7px] w-full bg-[#FFC499] " />
              <span className="z-1 relative inline-block align-top">비회원</span>
            </h3>
            <ul className="mb-2 flex flex-col gap-[10px]">
              <li className="flex items-center gap-2">
                <MdCheck className="shrink-0 text-2xl" />
                <span className="text-sm">뉴스 리스트 무제한 조회</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Membership;
