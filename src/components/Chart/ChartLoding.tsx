import { LineChartLoading } from '@/components/Chart/LineChartLoading';

function ChartLoading() {
  return (
    <>
      <div className="w-full">
        <LineChartLoading />
      </div>
      <div className="pb-7 pt-4">
        <div className="skeleton_loading mt-4 flex items-end justify-between gap-1">
          <div className="h-5 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-2 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-3 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-10 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-[8.75em] flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-24 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-14 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-16 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-12 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-20 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
        </div>
      </div>
    </>
  );
}

export default ChartLoading;
