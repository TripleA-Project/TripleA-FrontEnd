import React from 'react';
import Header from '..';

function HistoryHeader() {
  return (
    <Header fixed headerClassName="border-b border-b-[#E5E7EC]" className="!justify-center">
      <span className="font-semibold">내가 본 기사</span>
    </Header>
  );
}

export default HistoryHeader;
