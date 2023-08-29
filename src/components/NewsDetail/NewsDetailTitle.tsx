import React from 'react';

interface NewsDetailTitleProps {
  title: {
    kor: string;
    eng: string;
  };
  isTranslation: boolean;
}

function NewsDetailTitle({ title, isTranslation }: NewsDetailTitleProps) {
  return <h2 className="break-all text-xl font-semibold">{title[isTranslation ? 'kor' : 'eng']}</h2>;
}

export default NewsDetailTitle;
