'use client';

import { useQuery } from '@tanstack/react-query';
import { getAINewsAnalysisDemo } from '@/service/news';
import { type AINewsAnalysisParam, type AINewsAnalysisRequest } from '@/interfaces/Dto/News';
import { ProfilePayload } from '@/interfaces/Dto/User';

type AnalysisDemoProps = AINewsAnalysisParam & AINewsAnalysisRequest & { user?: ProfilePayload };

function AnalysisDemo({ id, summary }: AnalysisDemoProps) {
  /* 
    suspense 적용으로 refetch 시
    캐시된 데이터(이전 응답 데이터)가 보여지다가
    api 응답결과 데이터로 대체됨
    로딩 UI없이 데이터가 변경되서
    cacheTime을 0으로 설정함
    (
      같은 요청을 보내도
      ai 분석 데이터가 요청마다 다른 데이터로 응답이 와서,
      staleTime, cacheTime이 무의미 하다고 생각함
    )

    suspense 적용하지 않고
    컴포넌트 자체에서 
    isLoading, isFetching 으로 로딩UI 구현할 수도 있음
  */
  const { data } = useQuery(['news', 'analysis', 'demo', id, summary], () => getAINewsAnalysisDemo({ id }), {
    retry: 0,
    refetchOnWindowFocus: false,
    suspense: true,
    select(response) {
      return response.data;
    },
    cacheTime: 0,
  });

  return (
    <div>
      <div className="box-border flex border-b border-b-[#C6C6C6] py-1">
        <h3 className="w-20 font-bold">평가</h3>
        <p className="flex-1">{data?.impact}</p>
      </div>
      <div className="box-border flex border-b border-b-[#C6C6C6] py-1">
        <h3 className="w-20 font-bold">의견</h3>
        <p className="flex-1">{data?.action}</p>
      </div>
      <div className="box-border flex border-b border-b-[#C6C6C6] py-1">
        <h3 className="w-20 font-bold">분석</h3>
        <p className="flex-1">{data?.comment}</p>
      </div>
      <div className="box-border flex py-1">
        <h3 className="w-20 font-bold">AI</h3>
        <p className="flex-1">{data?.model}</p>
      </div>
      <div className="mt-1 box-border flex w-full items-center justify-center bg-orange-400 py-1 text-sm text-white">
        오늘 남은 횟수:&nbsp;{'-'}회 (데모 계정)
      </div>
    </div>
  );
}

export default AnalysisDemo;
