import { AppIcons } from '@/components/Icons';
import SwitchTranslation from '../SwitchTranslation';

function NewsDetailTranslationLoading() {
  return (
    <div className="flex justify-end">
      <div className="flex w-max items-center gap-2">
        <div className="flex items-center gap-1">
          <AppIcons.Translation />
          <span className="text-xs font-semibold leading-none text-[#4E525D]">한글 번역</span>
        </div>
        <SwitchTranslation />
      </div>
    </div>
  );
}

export default NewsDetailTranslationLoading;
