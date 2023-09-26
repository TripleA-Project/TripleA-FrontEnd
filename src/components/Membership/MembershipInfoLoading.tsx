import { HiOutlineChevronRight } from 'react-icons/hi';

function MembershipInfoLoading() {
  return (
    <div className="mb-8 mt-11 box-border flex items-center justify-between rounded-[10px] bg-[#F5F7F9] px-[18.68px] py-[21px]">
      <div className="pl-[20.82px]">
        <div className="mb-2.5 font-bold">멤버십 / 결제 정보</div>
        <div className={'skeleton_loading'}>
          <span className="inline-block h-6 w-28 rounded-2xl" />
        </div>
      </div>
      <HiOutlineChevronRight className="shrink-0 text-2xl text-[#FD954A]" />
    </div>
  );
}

export default MembershipInfoLoading;
