'use client';

import NewsDetailTranslation from '../NewsDetailTranslation';
import DetailThumbnail from '../DetailThumbnail';
import AINewsAnalysis from '../AINewsAnalysis';
import { ProfilePayload } from '@/interfaces/Dto/User';

interface NewsDetailContentProps {
  user?: ProfilePayload;
  newsId: number;
  onSwitch: (isOn: boolean) => void;
  thumbnail?: string;
  description: {
    kor: string;
    eng: string;
  };
  summary: string;
  keywords: string[];
  isTranslation: boolean;
}

function NewsDetailContent({
  user,
  newsId,
  thumbnail,
  description,
  keywords,
  summary,
  isTranslation,
  onSwitch,
}: NewsDetailContentProps) {
  const getTextLineMap = (content?: string) => {
    return content
      ? content
          .split('\n')
          .join(' ')
          .split(/(?<=\.)\s+/g)
      : [''];
  };

  return (
    <>
      <section className="space-y-2">
        <NewsDetailTranslation
          initValue={description.kor ? true : false}
          disabled={description.kor ? false : true}
          onSwitch={onSwitch}
        />
        <AINewsAnalysis user={user} newsId={newsId} summary={summary} />
      </section>
      <section className="my-4">
        <DetailThumbnail src={thumbnail} />
      </section>
      <section className="break-all text-[15px] font-medium">
        {getTextLineMap(description[isTranslation ? 'kor' : 'eng']).map((lineText, idx, textSourceMap) => {
          return (
            <p key={`${lineText}-${idx}`} className={`${idx === textSourceMap.length - 1 ? '' : 'mb-6'}`}>
              {lineText}
            </p>
          );
        })}
      </section>
      <section className="mt-8 flex gap-0.5 text-[15px] font-medium text-[#FD954A]">
        {keywords.map((keyword, idx) => (
          <p key={`${keyword}-${idx}`}>#{keyword}</p>
        ))}
      </section>
    </>
  );
}

export default NewsDetailContent;
