'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { FallbackProps } from 'react-error-boundary';
import { MdOutlineRefresh } from 'react-icons/md';

function DashBoardErrorBoundary({ error, resetErrorBoundary }: FallbackProps) {
  const { refresh } = useRouter();

  const queryClient = useQueryClient();
  const refetchDashBoardAPI = () => queryClient.refetchQueries(['statistics']);

  const refetch = async () => {
    refresh();
    refetchDashBoardAPI();
  };

  return (
    <div>
      유저 통계 데이터를 가져오지 못했습니다.
      <button
        className={`group box-border flex items-center justify-center gap-1 rounded-2xl px-2 py-1 text-[#FFA500] transition-colors hover:bg-[#FFA500]`}
        onClick={refetch}
      >
        <MdOutlineRefresh className={`text-xl group-hover:animate-[rotateOut_300ms] group-hover:text-white`} />
        <p className="font-bold group-hover:text-white">다시 시도</p>
      </button>
    </div>
  );
}

export default DashBoardErrorBoundary;
