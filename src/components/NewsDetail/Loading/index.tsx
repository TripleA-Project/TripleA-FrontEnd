import React from 'react';
import NewsDetailTitleLoading from './NewsDetailTitleLoading';
import NewsDetailMetaLoaing from './NewsDetailMetaLoading';
import NewsDetailChipListLoading from './NewsDetailChipListLoading';
import NewsDetailTranslationSwitchLoading from './NewsDetailTranslationSwitchLoading';
import AINewsSwitchLoading from './AINewsSwitchLoading';
import NewsDetailThumbnailLoading from './NewsDetailThumbnailLoading';

function NewsDetailLoading() {
  return (
    <article className={`mt-3 box-border px-4`}>
      <section className="mb-2.5">
        <NewsDetailTitleLoading />
      </section>
      <section className="mb-6">
        <NewsDetailMetaLoaing />
      </section>
      <section className="mb-5">
        <NewsDetailChipListLoading />
      </section>
      <section className="space-y-2">
        <NewsDetailTranslationSwitchLoading />
        <AINewsSwitchLoading />
      </section>
      <section className="my-4">
        <NewsDetailThumbnailLoading />
      </section>
    </article>
  );
}

export default NewsDetailLoading;
