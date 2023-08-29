'use client';

import React from 'react';
import { type NewsDetailPayload, type UserPayload } from '@/interfaces/Dto/News';
import NewsDetailNotification from '../Notification/NewsDetailNotification';

interface NewsContentWrapperProps {
  newsDetail: UserPayload & NewsDetailPayload;
  children: React.ReactNode;
}

function NewsDetailContentWrapper({ newsDetail, children }: NewsContentWrapperProps) {
  return (
    <div className={`relative`}>
      <NewsDetailNotification newsDetail={newsDetail} />
      {children}
    </div>
  );
}

export default NewsDetailContentWrapper;
