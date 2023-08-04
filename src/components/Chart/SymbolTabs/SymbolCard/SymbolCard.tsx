import Link from 'next/link';
import SymbolLogoImage from '@/components/Image/SymbolLogoImage';
import { DeltaPriceColor, DeltaPriceType, getPriceInfo } from '@/util/chart';
import { type Symbol } from '@/interfaces/Symbol';

interface SymbolCardProps {
  symbol: Symbol;
  hideBorder?: boolean;
}

interface SymbolCardLoadingProps {
  hideBorder?: boolean;
}

export function SymbolCardLoading({ hideBorder }: SymbolCardLoadingProps) {
  return (
    <div className={`box-border flex w-full justify-between pb-4 ${hideBorder ? '' : 'border-b border-b-[#EEEEEE]'}`}>
      <div className="skeleton_loading flex shrink-0 items-center gap-4">
        <div className="h-[42px] w-[42px] overflow-hidden rounded-full bg-[#E5E7EC]" />
        <div className="space-y-1 ![background:none]">
          <p className="h-5 w-20" />
          <p className="h-4 w-36" />
        </div>
      </div>
      <div className="skeleton_loading flex w-max shrink-0 flex-col items-center justify-center gap-1">
        <p className="h-5 w-28" />
        <div className="![background:none]">
          <span className="inline-block h-4 w-10 align-top" /> <span className="inline-block h-4 w-10 align-top" />
        </div>
      </div>
    </div>
  );
}

function SymbolCard({ symbol, hideBorder = false }: SymbolCardProps) {
  const symbolPrice = getPriceInfo({ today: symbol.price.today ?? 0, yesterday: symbol.price.yesterday ?? 0 });

  return (
    <Link
      href={`/chart/symbol?name=${symbol.symbol.toUpperCase()}&resample=daily`}
      className={`box-border flex w-full justify-between pb-4 ${hideBorder ? '' : 'border-b border-b-[#EEEEEE]'}`}
    >
      <div className="flex shrink-0 items-center gap-4">
        <SymbolLogoImage type="Card" symbol={symbol.symbol} src={symbol.logo} />
        <div className="space-y-1">
          <p className="text-sm font-semibold text-black">{symbol.symbol.toUpperCase()}</p>
          <p className="text-xs text-[#AEAEAE]">{symbol.companyName ?? ''}</p>
        </div>
      </div>
      <div className="flex w-max shrink-0 flex-col items-center justify-center">
        <p className="text-sm font-semibold text-black">{symbol.price.today.close.toFixed(3)}</p>
        <div className="text-xs" style={{ color: DeltaPriceColor[symbolPrice.delta.type] }}>
          <span>
            {`${DeltaPriceType[symbolPrice.delta.type]}`}
            {`${symbolPrice.delta.value.toFixed(1)}`}
          </span>{' '}
          <span>({`${DeltaPriceType[symbolPrice.delta.type]}${symbolPrice.delta.percent.toFixed(2)}%`})</span>
        </div>
      </div>
    </Link>
  );
}

export default SymbolCard;
