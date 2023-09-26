import React from 'react';
import Tabs from './Tabs';

export type MainPageNewsTab = 'latestNews' | 'interestNews';

function NewsTab() {
  return (
    <div className="border-b border-b-[#E4E4E4] bg-white">
      <Tabs />
    </div>
  );
}

export default NewsTab;
