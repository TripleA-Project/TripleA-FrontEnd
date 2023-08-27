import CategoryChip from '@/components/UI/Chip/CategoryChip';
import SymbolChip from '@/components/UI/Chip/SymbolChip';

function NewsDetailChipListLoading() {
  return (
    <section className="relative mb-5 overflow-hidden">
      <div className="overflow-auto scrollbar-none">
        <div className="flex w-full gap-4">
          <CategoryChip showHashTagIcon loading />
          <SymbolChip loading />
          <div className="-ml-2.5 w-10 shrink-0 bg-transparent" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-8 w-10 bg-gradient-to-r from-transparent to-white" />
    </section>
  );
}

export default NewsDetailChipListLoading;
