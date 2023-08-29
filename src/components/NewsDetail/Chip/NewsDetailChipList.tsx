import CategoryChip from '@/components/UI/Chip/CategoryChip';
import SymbolChip from '@/components/UI/Chip/SymbolChip';
import { type Category } from '@/interfaces/Category';
import { type NewsDetailSymbol } from '@/interfaces/Dto/News';

interface NewsDetailChipListProps {
  category?: Category;
  symbol?: NewsDetailSymbol;
}

function NewsDetailChipList({ category, symbol }: NewsDetailChipListProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="overflow-auto scrollbar-none">
        <div className="flex w-full gap-4">
          {category ? <CategoryChip showHashTagIcon category={category} /> : null}
          {symbol ? <SymbolChip symbol={symbol as any} showPrice /> : null}
          <div className="-ml-2.5 w-10 shrink-0 bg-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-10 bg-gradient-to-r from-transparent to-white" />
    </section>
  );
}

export default NewsDetailChipList;
