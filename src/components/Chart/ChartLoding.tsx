import Image from 'next/image';
import LineChartLoading from '../../../public/mockLineChart.png';

function ChartLoading() {
  return (
    <div className="space-y-4 divide-y-2 divide-dashed">
      <div className="skeleton_loading relative h-[8.75em] w-full">
        <Image src={LineChartLoading} alt="loading" fill={true} className="skeleton_loading opacity-70" />
      </div>
      <div className="pt-4">
        <div className="skeleton_loading mt-4 flex items-end justify-between gap-1">
          <div className="h-5 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-2 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-3 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="skeleton_loading h-10 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-[8.75em] flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-24 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
          <div className="h-14 flex-1 rounded-tl-lg rounded-tr-lg bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}

export default ChartLoading;
