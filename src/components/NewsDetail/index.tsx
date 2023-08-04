'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import { AxiosResponse, HttpStatusCode, isAxiosError } from 'axios';
import { MdOutlineLink } from 'react-icons/md';
import NewsDetailTitle, { NewsDetailTitleLoading } from './NewsDetailTitle';
import NewsDetailMeta, { NewsDetailMetaLoaing } from './NewsDetailMeta';
import { DetailThumbnailLoading } from './DetailThumbnail';
import Button from '../Button/Button';
import NoDescription from './NoDescription';
import OtherNews from './OtherNews';
import { NewsDetailTranslationLoading } from './NewsDetailTranslation';
import NewsDetailChipList, { NewsDetailChipListLoading } from './Chip/NewsDetailChipList';
import NewsDetailContent from './NewsDetailContent';
import AddCategoryForm from './AddCategoryForm';
import AddSymbolForm from './AddSymbolForm';
import BenefitBar from './BenefitBar';
import { HorizontalLine } from '../UI/DivideLine';
import { NewsDetailNotification } from '../Notification';
import TimeoutNotification from '../Notification/TimeoutNotification';
import TopScrollButton from './TopScrollButton';
import { getNewsDetail } from '@/service/news';
import { NewsDetailNotificationTemplate, ServerErrorNotificationTemplate } from '@/constants/notification';
import { TIMEOUT_CODE } from '@/service/axios';
import { type NewsDetailSymbol, type NewsDetailResponse } from '@/interfaces/Dto/News';

interface NewsDetailProps {
  newsId: string;
  requestSymbol?: NewsDetailSymbol;
}

function NewsDetailLoading() {
  return (
    <article className="mt-3 box-border px-4">
      <section className="mb-2.5">
        <NewsDetailTitleLoading />
      </section>
      <section id="detail-meta" className="mb-6">
        <NewsDetailMetaLoaing />
      </section>
      <section id="detail-chips" className="mb-5">
        <NewsDetailChipListLoading />
      </section>
      <section>
        <NewsDetailTranslationLoading />
      </section>
      <section className="my-4">
        <DetailThumbnailLoading />
      </section>
    </article>
  );
}

export function NewsDetail({ newsId, requestSymbol }: NewsDetailProps) {
  const {
    data: newsDetailPayload,
    status: newsDetailStatus,
    error: newsDetailError,
  } = useQuery(['news', 'detail', newsId], () => getNewsDetail({ id: Number(newsId) }), {
    retry: 0,
    refetchOnWindowFocus: false,
    select(response) {
      return response.data;
    },
  });

  const [isRender, setIsRender] = useState(false);
  const [isTranslation, setIsTranslation] = useState(!!newsDetailPayload?.data?.kor?.title);
  const [detailNewsNotification, setDetailNewsNotification] = useState<{
    type: keyof typeof NewsDetailNotificationTemplate;
    active: boolean;
    dimHeight?: number;
  }>({
    type: 'NewsDetailLoginRequired',
    active: false,
  });
  const [showTimeoutNotification, setShowTimeoutNotification] = useState(false);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });

    if (newsDetailStatus === 'loading') return;

    if (newsDetailStatus === 'error') {
      if (isAxiosError(newsDetailError)) {
        const { code, response } = newsDetailError;

        if (code === TIMEOUT_CODE) {
          setShowTimeoutNotification(true);

          return;
        }

        if ((response as AxiosResponse<NewsDetailResponse>).status === HttpStatusCode.Unauthorized) {
          setDetailNewsNotification((prev) => ({
            ...prev,
            type: 'NewsDetailLoginRequired',
            active: true,
            dimHeight: 54,
          }));

          return;
        }
      }

      return;
    }

    if (newsDetailPayload.status === HttpStatusCode.Unauthorized) {
      setDetailNewsNotification((prev) => ({ ...prev, type: 'NewsDetailLoginRequired', active: true, dimHeight: 54 }));

      return;
    }

    if (!!newsDetailPayload?.data?.kor?.title) {
      if (!isTranslation) setIsTranslation(true);
    }

    if (newsDetailPayload.data?.user.leftBenefitCount === 0) {
      const getDimHeight = () => {
        const hasDescription = newsDetailPayload.data?.kor.description;

        const headerElement = document.querySelector('header')!;
        const targetElement = document.getElementById(hasDescription ? 'detail-chips' : 'detail-meta')!;

        return headerElement.getBoundingClientRect().height + targetElement.getBoundingClientRect().bottom + 8;
      };

      setDetailNewsNotification((prev) => ({
        ...prev,
        active: true,
        type: 'NoReadToday',
        dimHeight: getDimHeight(),
      }));

      setTimeout(() => {
        setIsRender(true);
      }, 200);

      return;
    }

    setIsRender(true);
  }, [newsDetailStatus]); /* eslint-disable-line */

  return (
    <>
      {!isRender ? <NewsDetailLoading /> : null}
      {isRender && newsDetailPayload?.data ? (
        <article
          className={`mt-3 box-border ${newsDetailPayload.data?.user?.membership === 'BASIC' ? 'pb-14' : ''} px-4`}
        >
          <section className="mb-2.5">
            <NewsDetailTitle
              title={{ kor: newsDetailPayload.data.kor.title, eng: newsDetailPayload.data.eng.title }}
              isTranslation={isTranslation}
            />
          </section>
          <section id="detail-meta" className="mb-6">
            <NewsDetailMeta
              newsId={Number(newsId)}
              bookmark={newsDetailPayload.data.bookmark}
              source={newsDetailPayload.data.source}
              publishedDate={newsDetailPayload.data.publishedDate}
            />
          </section>
          {!newsDetailPayload.data.category || (!newsDetailPayload.data.symbol && !requestSymbol) ? null : (
            <section id="detail-chips" className="mb-5">
              <NewsDetailChipList
                category={newsDetailPayload.data.category}
                symbol={requestSymbol ?? newsDetailPayload.data.symbol}
              />
            </section>
          )}
          {!newsDetailPayload.data.kor.description && !newsDetailPayload.data.eng.description ? (
            <NoDescription />
          ) : (
            <>
              <NewsDetailContent
                thumbnail={newsDetailPayload.data.thumbnail}
                description={{
                  kor:
                    newsDetailPayload.data.kor.summary && newsDetailPayload.data.kor.summary !== ' '
                      ? newsDetailPayload.data.kor.summary
                      : newsDetailPayload.data.kor.description!,
                  eng:
                    newsDetailPayload.data.eng.summary && newsDetailPayload.data.eng.summary !== ' '
                      ? newsDetailPayload.data.eng.summary
                      : newsDetailPayload.data.eng.description!,
                }}
                keywords={newsDetailPayload.data.keyword}
                isTranslation={isTranslation}
                onSwitch={(isOn) => setIsTranslation(isOn)}
              />
            </>
          )}
          <Link href={newsDetailPayload.data.url} className="mt-9 w-full">
            <Button fullWidth bgColorTheme="orange" textColorTheme="white" className="mt-14 gap-2">
              <MdOutlineLink className="text-2xl text-white" />
              기사 원문 보러가기
            </Button>
          </Link>
          <section className="my-6">
            <HorizontalLine />
            <div>
              <h3 className="mb-4 mt-6 text-xl font-semibold">다른 기사 더 보기</h3>
              <OtherNews currentNewsId={Number(newsId)} category={newsDetailPayload.data.category} />
            </div>
          </section>
          {!newsDetailPayload.data.kor.description && !newsDetailPayload.data.eng.description ? null : (
            <>
              <section className="my-5">
                <HorizontalLine />
                <div className="pb-7 pt-5">
                  <AddCategoryForm category={newsDetailPayload.data.category} />
                </div>
                <HorizontalLine style={{ marginTop: '-8px' }} />
              </section>
              <section className="mb-9">
                <AddSymbolForm symbol={requestSymbol ?? newsDetailPayload.data.symbol} />
              </section>
            </>
          )}
          <TopScrollButton />
        </article>
      ) : null}
      {isRender && newsDetailPayload?.data?.user.membership === 'BASIC' ? (
        <BenefitBar benefitCount={newsDetailPayload.data.user.leftBenefitCount ?? 0} />
      ) : null}
      <NewsDetailNotification
        active={detailNewsNotification.active}
        dimHeight={detailNewsNotification.dimHeight}
        notificationType={detailNewsNotification.type}
        newsId={Number(newsId)}
        symbol={requestSymbol ? requestSymbol.name.toUpperCase() : undefined}
        onClose={() => setDetailNewsNotification((prev) => ({ ...prev, active: false }))}
      />
      <TimeoutNotification
        active={showTimeoutNotification}
        title={ServerErrorNotificationTemplate.Timeout.title}
        content={ServerErrorNotificationTemplate.Timeout.content}
        onClose={() => {
          setShowTimeoutNotification(false);
        }}
      />
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

export default NewsDetail;
