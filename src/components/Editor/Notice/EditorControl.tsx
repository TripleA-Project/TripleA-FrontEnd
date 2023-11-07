'use client';

import React, { ForwardedRef, MutableRefObject, forwardRef, useRef } from 'react';
import { LexicalEditor as Editor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import Button from '@/components/Button/Button';
import { toastNotify } from '@/util/toastNotify';

interface EditorControlProps {
  open?: boolean;
}

function EditorControl({ open = true }: EditorControlProps, ref: ForwardedRef<Editor>) {
  const noticeTitleInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    if (!noticeTitleInputRef.current?.value) {
      toastNotify('error', '공지사항 제목을 작성해주세요');

      return;
    }

    const editor = (ref as MutableRefObject<Editor>).current;

    editor.getEditorState().read(async () => {
      const stringify = JSON.stringify(editor.toJSON().editorState);
      console.log(`%c\t서버에 요청`, `background-color: #fca903; color: #fff;`);

      // [TODO] 서버 api 요청
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('');
        }, 3000);
      });

      console.log(`%c---`, `background-color: green; color: #fff;`);

      console.log('json글자수', stringify.length);
      console.log(stringify);

      console.log(`%c---`, `background-color: green; color: #fff;`);
    });

    console.log('');

    editor.getEditorState().read(() => {
      const html = $generateHtmlFromNodes(editor);

      console.log(`%c---`, `background-color: green; color: #fff;`);

      console.log('html글자수', html.length);
      console.log(html);

      console.log(`%c---`, `background-color: green; color: #fff;`);
    });
  };

  const onCancel = () => {
    // [TODO] 전체 글 보기로 이동
    toastNotify('success', '취소');
  };

  return open ? (
    <div className="box-border bg-[#0c5191] px-1 py-1">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex flex-1 items-center">
          <input
            id="notice-title"
            ref={noticeTitleInputRef}
            className="box-border w-full px-2 py-1 font-bold outline-none placeholder:font-bold placeholder:text-[#c9c8c7]"
            placeholder="공지사항 제목"
            autoComplete="off"
          />
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            bgColorTheme="lightgray"
            textColorTheme="black"
            className="h-fit w-fit shrink-0 rounded-md bg-[#f7f9fa] px-6 py-1 hover:bg-[#dddfe0]"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button
            bgColorTheme="lightgray"
            textColorTheme="black"
            className="h-fit w-fit shrink-0 rounded-md bg-[#f7f9fa] px-6 py-1 hover:bg-[#dddfe0]"
            onClick={onSubmit}
          >
            작성
          </Button>
        </div>
      </div>
    </div>
  ) : null;
}

export default forwardRef(EditorControl);
