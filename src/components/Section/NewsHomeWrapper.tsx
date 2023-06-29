import React from 'react';
import NewsSectionContainer from './NewsSectionContainer';
import { FireIcon, NewsIcon } from '@/components/Button/Icons';
export default function NewsHomeWrapper() {
  return (
    <div>
      <NewsSectionContainer type={'column'} icon={<FireIcon />} sectionTitle={'요즘 뉴스'} />
      <NewsSectionContainer type={'row'} icon={<NewsIcon />} sectionTitle={'최신 뉴스'} />
    </div>
  );
}
