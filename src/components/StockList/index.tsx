import { useQuery } from '@tanstack/react-query';
import Marquee from 'react-fast-marquee';
import { NotificationIcons } from '../Notification/NotificationIcons';
import { getStockMarketIndex } from '@/service/stock';
import { HttpStatusCode } from 'axios';

function StockListLoading() {
  return (
    <div className="skeleton_loading flex gap-2.5">
      <div className="h-5 w-20 rounded-full border-2 bg-[#E5E7EC] px-2.5 py-0.5 leading-5"> </div>
      <div className="h-5 w-20 rounded-full border-2 bg-[#E5E7EC] px-2.5 py-0.5 leading-5"> </div>
      <div className="h-5 w-20 rounded-full border-2 bg-[#E5E7EC] px-2.5 py-0.5 leading-5"> </div>
    </div>
  );
}

function StockListError() {
  return (
    <div className="flex items-center gap-2">
      <NotificationIcons.Error />
      <span className="text-xs font-semibold text-slate-600">3대 주가지수를 제공할 수 없습니다</span>
    </div>
  );
}

function StockList() {
  const { data: stockData, status } = useQuery(['stockMarket'], () => getStockMarketIndex(), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const getPercentClassName = (percent: string) => {
    return percent.includes('+') ? 'text-[#FF0000]' : percent.includes('-') ? 'text-[#0038FF]' : 'text-black';
  };

  if (status === 'loading') return <StockListLoading />;
  if (status === 'error' || stockData.status !== HttpStatusCode.Ok) return <StockListError />;

  return (
    <Marquee gradient={true} gradientWidth={10}>
      {stockData.data?.stocks.map((market) => {
        const getMarketName = () => {
          switch (market.symbol) {
            case '^IXIC':
              return '나스닥';
            case '^DJI':
              return '다우존스';
            case '^GSPC':
              return 'S&P';
            default:
              return '';
          }
        };

        return (
          <div
            key={market.symbol}
            className="mr-2.5 box-border flex items-center justify-center gap-2 rounded-full border-2 border-[#E5E7EC] px-2.5 py-0.5 text-xs leading-5"
          >
            <div>{getMarketName()}</div>
            <div>
              <span>{market.price}</span>
              <span className={`${getPercentClassName(market.percent)}`}>
                {market.percent.replace('+', '▲').replace('-', '▼')}
              </span>
            </div>
          </div>
        );
      })}
    </Marquee>
  );
}

export default StockList;
