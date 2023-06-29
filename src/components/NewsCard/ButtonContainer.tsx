'use client';
import { useState } from 'react';

//types
import { Bookmark, NewsData } from '@/interfaces/NewsData';
//components
import IconButton from '@/components/Button/IconButton';

import { addNewsBookmark, deleteNewsBookmark } from '@/service/bookmark';

interface ButtonContainerProps {
  news: NewsData;
}

export default function ButtonContainer({ news }: ButtonContainerProps) {
  const count = news.bookmark?.count;
  const isBookmark = news.bookmark?.isBookmark;
  const newsId = news.newsId;
  const [isMarked, setIsMarked] = useState(isBookmark);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {}
  };
  const shareIconHandler = async () => {
    const href = window.location.href;
    await handleCopyClipBoard(href);
    alert('주소가 복사되었습니다');
  };
  const bookmarkIconHandler = async (newsId: number) => {
    console.log('cloickefsdjhf');
    if (isMarked) {
      setIsMarked(!isMarked);
      await deleteNewsBookmark({ id: newsId });
      return;
    } else {
      setIsMarked(!isMarked);
      await addNewsBookmark({ id: newsId });
      return;
    }
  };

  return (
    // <div className="flex items-center justify-end gap-[6px] relative w-fit pl-[10px] pb-[10px]">
    //   <IconButton icon='export' bgColorTheme='none' textColorTheme='black' onClick={shareClickHandler}/>
    //   <IconButton icon={isMarked ? 'bookmarkfill' :'bookmark'} bgColorTheme='none' textColorTheme='black' onClick={()=>bookmarkClickHandler(newsId)} isBookmark={isBookmark}/>
    // </div>
    <div className="flex items-center justify-end">
      <IconButton
        icon="share"
        textColorTheme="black"
        bgColorTheme="none"
        sizeTheme="icon"
        iconSize="30px"
        onClick={shareIconHandler}
      />
      <IconButton
        icon="bookmark"
        textColorTheme="black"
        bgColorTheme="none"
        sizeTheme="icon"
        iconSize="30px"
        onClick={() => bookmarkIconHandler(newsId)}
      >
        {count}
      </IconButton>
    </div>
  );
}
