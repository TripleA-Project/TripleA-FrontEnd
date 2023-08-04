import { Symbol } from '@/interfaces/Symbol';
import SymbolCard, { SymbolCardLoading } from './SymbolCard';
import LikeButton from '@/components/Layout/Header/LikeHeader/LikeButton';
import SkeletonLike from '@/components/Layout/Header/LikeHeader/SkeletonLike';
import { DeltaPriceColor, DeltaPriceType, getPriceInfo } from '@/util/chart';
import Link from 'next/link';
import SymbolLogoImage from '@/components/Image/SymbolLogoImage';

interface SymbolLikeCardProps {
  symbol: Symbol;
}

export function SymbolLikeCardLoading() {
  return (
    <div className='className="box-border flex justify-between border-b border-b-[#EEEEEE]'>
      <div className="w-[66%] card:w-[74%] mobile:w-[74%] pc:w-[64%]">
        <SymbolCardLoading hideBorder />
      </div>
      <div className="flex -translate-y-2 items-center">
        <SkeletonLike />
      </div>
    </div>
  );
}

function SymbolLikeCard({ symbol }: SymbolLikeCardProps) {
  const symbolPrice = getPriceInfo({ today: symbol.price.today ?? 0, yesterday: symbol.price.yesterday ?? 0 });

  return (
    <Link
      href={`/chart/symbol?name=${symbol.symbol.toUpperCase()}&resample=daily`}
      className={`box-border flex w-full border-b border-b-[#EEEEEE] pb-4`}
    >
      <div className="flex w-full shrink-0 items-center gap-4">
        <SymbolLogoImage type="Card" symbol={symbol.symbol} src={symbol.logo} />
        <div className="flex flex-1 justify-between">
          <div className="w-[50%] space-y-1">
            <p className="text-sm font-semibold text-black">{symbol.symbol.toUpperCase()}</p>
            <p className="max-w-full truncate text-xs text-[#AEAEAE]">{symbol.companyName ?? ''}</p>
          </div>
          <div className="flex w-[30%] shrink-0 flex-col items-center justify-center">
            <p className="text-sm font-semibold text-black">{symbol.price.today.close.toFixed(3)}</p>
            <div className="text-xs" style={{ color: DeltaPriceColor[symbolPrice.delta.type] }}>
              <span>
                {`${DeltaPriceType[symbolPrice.delta.type]}`}
                {`${symbolPrice.delta.value.toFixed(1)}`}
              </span>{' '}
              <span>({`${DeltaPriceType[symbolPrice.delta.type]}${symbolPrice.delta.percent.toFixed(2)}%`})</span>
            </div>
          </div>
          <div
            className="flex w-[10%] items-center justify-end"
            onClick={(e) => {
              const target = e.target as HTMLElement;

              if (target.closest('button')) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
          >
            <LikeButton symbol={symbol} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SymbolLikeCard;
