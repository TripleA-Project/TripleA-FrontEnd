'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import ClipboardJS from 'clipboard';
import { ErrorNotification } from '@/components/Notification';
import { AppIcons } from '@/components/Icons';
import { NotificationTemplate } from '@/constants/notification';
import { addNewsBookmark, deleteNewsBookmark } from '@/service/bookmark';
import { toastNotify } from '@/util/toastNotify';
import { useUser } from '@/hooks/useUser';
import type { Bookmark, NewsData } from '@/interfaces/NewsData';

interface NewsCardActionProps extends Pick<NewsData, 'newsId' | 'bookmark'> {
  symbolName?: string;
  showCount?: boolean;
  onBookmark?: (newsId: number) => void | Promise<void>;
}

export function NewsCardActionLoading() {
  return (
    <section className="flex min-w-max gap-3">
      <button>
        <AppIcons.Share />
      </button>
      <div className="skeleton_loading flex items-center">
        <AppIcons.Bookmark.NoFill
          className="opacity-80"
          style={{ clipPath: 'polygon(100% 5%, 100% 100%, 50% 82%, 0 100%, 0 5%)' }}
        />
      </div>
    </section>
  );
}

function NewsCardAction({ newsId, symbolName, bookmark, showCount, onBookmark }: NewsCardActionProps) {
  const { refresh } = useRouter();

  const { user, isLoading: isUserLoading, errorType } = useUser();

  const [bookmarkState, setBookmarkState] = useState<Bookmark>({
    isBookmark: bookmark.isBookmark,
    count: bookmark.count,
  });

  const [showNotification, setShowNotification] = useState(false);

  const shareBtnRef = useRef<HTMLButtonElement>(null);

  const { mutate: bookmarkMutate } = useMutation(
    (type: 'add' | 'delete') => (type === 'add' ? addNewsBookmark({ id: newsId }) : deleteNewsBookmark({ id: newsId })),
    {
      retry: 0,
      onSuccess(data, variables) {
        toastNotify('success', `북마크 ${variables === 'add' ? '생성' : '삭제'} 성공`);

        if (variables === 'add') {
          setBookmarkState((prev) => ({ ...prev, isBookmark: true, count: prev.count + 1 }));
          return;
        }

        setBookmarkState((prev) => ({ ...prev, isBookmark: false, count: prev.count - 1 }));
      },
      onError(error, variables) {
        toastNotify('error', `북마크 ${variables === 'add' ? '생성' : '삭제'} 실패`);
      },
      onSettled: () => {
        onBookmark && onBookmark(newsId);
        refresh();
      },
    },
  );

  function bookmarkHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();

    if (isUserLoading) {
      return;
    }

    if (!user) {
      if (errorType === 'Unauthorized') {
        setShowNotification(true);

        return;
      }

      return;
    }

    bookmarkMutate(bookmarkState.isBookmark ? 'delete' : 'add');
  }

  function shareClickHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  useEffect(() => {
    if (!shareBtnRef?.current) return;

    const shareClipboardButton = new ClipboardJS(shareBtnRef.current, {
      text() {
        return `${location.origin}/detail/${newsId}${symbolName ? `?symbol=${symbolName.toUpperCase()}` : ''}`;
      },
    });

    shareClipboardButton.on('success', () => {
      toastNotify('success', '클립보드 복사 성공');
    });

    shareClipboardButton.on('error', () => {
      toastNotify('error', '클립보드 복사 실패');
    });

    return () => {
      shareClipboardButton.destroy();
    };
  }, []); /* eslint-disable-line */

  return (
    <>
      <section className="flex h-fit min-w-max items-start justify-center gap-3 self-center">
        <button ref={shareBtnRef} onClick={shareClickHandler}>
          <AppIcons.Share />
        </button>
        <section className="flex flex-col items-center">
          <button onClick={bookmarkHandler}>
            {bookmarkState.isBookmark ? <AppIcons.Bookmark.Fill /> : <AppIcons.Bookmark.NoFill />}
          </button>
          {bookmarkState.count && showCount ? (
            <span className="font-medium text-[#4E525D]">{bookmark.count}</span>
          ) : null}
        </section>
      </section>
      <ErrorNotification
        active={showNotification}
        content={NotificationTemplate.BookmarkLoginRequired.content}
        buttonText={NotificationTemplate.BookmarkLoginRequired.buttonText}
        linkURL={NotificationTemplate.BookmarkLoginRequired.linkURL}
        closeOnClick
        onClose={() => {
          setShowNotification(false);
        }}
      />
    </>
  );
}

export default NewsCardAction;
