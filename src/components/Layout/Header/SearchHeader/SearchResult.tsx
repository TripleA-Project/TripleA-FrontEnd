import { AppIcons } from '@/components/Icons';
import CategoryResult from './CategoryResult';
import SymbolResult from './SymbolResult';
import { isEng, isKor } from '@/util/autocomplete';

interface SearchResultProps {
  keyword: string;
}

export function NoResult() {
  return (
    <div className="flex min-h-[inherit] items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex h-[81px] w-[81px] items-center justify-center">
          <AppIcons.Message />
        </div>
        <span className="text-[#9AA2A9]">검색결과가 없습니다</span>
      </div>
    </div>
  );
}

function SearchResult({ keyword }: SearchResultProps) {
  if (isKor(keyword)) return <CategoryResult keyword={keyword} />;
  if (isEng(keyword)) return <SymbolResult keyword={keyword} />;

  return <NoResult />;
}

export default SearchResult;
