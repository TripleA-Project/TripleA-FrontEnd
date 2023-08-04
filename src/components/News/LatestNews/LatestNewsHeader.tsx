import { MdOutlineArticle } from 'react-icons/md';
import ViewFilter from './ViewFilter';

function LatestNewsHeader() {
  return (
    <div className="flex items-center justify-between">
      <section className="mb-[18px] flex items-center gap-1">
        <MdOutlineArticle className="shrink-0 text-[24px]" />
        <h4 className="font-bold">최신 뉴스</h4>
      </section>
      <ViewFilter />
    </div>
  );
}

export default LatestNewsHeader;
