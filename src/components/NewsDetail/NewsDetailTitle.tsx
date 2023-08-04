import React from 'react';

interface NewsDetailTitleProps {
  title: {
    kor: string;
    eng: string;
  };
  isTranslation: boolean;
}

export function NewsDetailTitleLoading() {
  return (
    <h2 className="skeleton_loading">
      <p className="h-7 w-80 pc:w-[40rem]" />
    </h2>
  );
}

function NewsDetailTitle({ title, isTranslation }: NewsDetailTitleProps) {
  return <h2 className="break-all text-xl font-semibold">{title[isTranslation ? 'kor' : 'eng']}</h2>;
}

export default NewsDetailTitle;
