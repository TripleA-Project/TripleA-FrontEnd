'use client';

import React from 'react';
import Link from 'next/link';
import { NotificationIcons } from '@/components/Notification/NotificationIcons';
import FitPage from '@/components/Layout/FitPage';
import Button from '@/components/Button/Button';
import { NewsDetailNotificationTemplate } from '@/constants/notification';

function NewsNotFound() {
  const { title, content, buttonText, linkURL } = NewsDetailNotificationTemplate.Empty;

  return (
    <FitPage>
      <div className="box-border flex h-full w-full items-center justify-center p-4">
        <div className="flex w-full flex-col items-center">
          <div className="text-4xl">
            <NotificationIcons.VeryDissatisfied />
          </div>
          <h3
            className="my-6 text-center text-xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: title.trim().replaceAll('\n', '<br />'),
            }}
          />
          <p
            className="text-center text-[#4E525D]"
            dangerouslySetInnerHTML={{
              __html: content.trim().replaceAll('\n', '<br />'),
            }}
          />
          <Link href={linkURL}>
            <Button bgColorTheme="orange" textColorTheme="white">
              {buttonText}
            </Button>
          </Link>
        </div>
      </div>
    </FitPage>
  );
}

export default NewsNotFound;
