'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import NewsDetailTitle from './NewsDetailTitle';
import NewsDetailMeta from './NewsDetailMeta';
import NewsDetailChipList from './Chip/NewsDetailChipList';
import NoDescription from './NoDescription';
import NewsDetailContentWrapper from './Content/NewsDetailContentWrapper';
import NewsDetailContent from './NewsDetailContent';
import Button from '../Button/Button';
import { MdOutlineLink } from 'react-icons/md';
import { HorizontalLine } from '../UI/DivideLine';
import OtherNews from './OtherNews';
import AddCategoryForm from './AddCategoryForm';
import AddSymbolForm from './AddSymbolForm';
import TopScrollButton from './TopScrollButton';
import BenefitBar from './BenefitBar';
import { type NewsDetailPayload, type NewsDetailSymbol, type UserPayload } from '@/interfaces/Dto/News';

interface DetailProps {
  newsDetailPayload?: UserPayload & NewsDetailPayload;
  requestSymbol?: NewsDetailSymbol;
}

function Detail({ newsDetailPayload, requestSymbol }: DetailProps) {
  const [isTransition, setIsTransition] = useState(!!newsDetailPayload?.kor.title);

  if (!newsDetailPayload) return null;

  return (
    <>
      <article className={`mt-3 box-border ${newsDetailPayload.user.membership === 'BASIC' ? 'pb-14' : ''} px-4`}>
        <section className="mb-2.5">
          <NewsDetailTitle
            title={{ kor: newsDetailPayload.kor.title, eng: newsDetailPayload.eng.title }}
            isTranslation={isTransition}
          />
        </section>
        <section className="mb-6">
          <NewsDetailMeta
            newsId={newsDetailPayload.newsId}
            symbolName={requestSymbol?.name}
            bookmark={newsDetailPayload.bookmark}
            source={newsDetailPayload.source}
            publishedDate={newsDetailPayload.publishedDate}
          />
        </section>
        <section className="mb-5">
          <NewsDetailChipList
            category={newsDetailPayload.category}
            symbol={requestSymbol ?? newsDetailPayload.symbol}
          />
        </section>
        <NewsDetailContentWrapper newsDetail={newsDetailPayload}>
          {/* content */}
          <div>
            {!newsDetailPayload.eng.description ? (
              <NoDescription />
            ) : (
              <NewsDetailContent
                newsId={newsDetailPayload.newsId}
                thumbnail={newsDetailPayload.thumbnail}
                description={{
                  kor:
                    newsDetailPayload.kor.summary && newsDetailPayload.kor.summary !== ' '
                      ? newsDetailPayload.kor.summary
                      : newsDetailPayload.kor.description ?? '한글 요약을 제공할 수 없습니다.',
                  eng:
                    newsDetailPayload.eng.summary && newsDetailPayload.eng.summary !== ' '
                      ? newsDetailPayload.eng.summary
                      : newsDetailPayload.eng.description!,
                }}
                summary={newsDetailPayload.eng.summary ?? ''}
                keywords={newsDetailPayload.keyword}
                isTranslation={isTransition}
                onSwitch={(isOn) => setIsTransition(isOn)}
              />
            )}
          </div>
          <Link href={newsDetailPayload.url} className="mt-9 w-full">
            <Button fullWidth bgColorTheme="orange" textColorTheme="white" className="mt-14 gap-2">
              <MdOutlineLink className="text-2xl text-white" />
              기사 원문 보러가기
            </Button>
          </Link>
          <section className="my-6">
            <HorizontalLine />
            <div>
              <h3 className="mb-4 mt-6 text-xl font-semibold">다른 기사 더 보기</h3>
              <OtherNews currentNewsId={newsDetailPayload.newsId} category={newsDetailPayload.category} />
            </div>
          </section>
          {newsDetailPayload.eng.description ? (
            <>
              <section className="my-5">
                <HorizontalLine />
                <div className="pb-7 pt-5">
                  <AddCategoryForm category={newsDetailPayload.category} />
                </div>
                <HorizontalLine style={{ marginTop: '-8px' }} />
              </section>
              <section className="mb-9">
                <AddSymbolForm symbol={requestSymbol ?? newsDetailPayload.symbol} />
              </section>
            </>
          ) : null}
          <TopScrollButton />
        </NewsDetailContentWrapper>
      </article>
      {newsDetailPayload.user.membership === 'BASIC' ? (
        <BenefitBar benefitCount={newsDetailPayload.user.leftBenefitCount ?? 0} />
      ) : null}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default Detail;
