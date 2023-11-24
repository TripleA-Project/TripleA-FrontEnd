'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';
import { FieldErrors, useForm } from 'react-hook-form';
import Header from '..';
import { AppLogos } from '@/components/Icons';
import { useLexicalEditor } from '@/hooks/useLexicalEditor';
import { toastNotify } from '@/util/toastNotify';
import { EDITOR_NAMESPACE } from '@/constants/editor';

interface NoticeFormData {
  title: string;
  content: string;
}

function PostNoticeHeader() {
  return createPortal(
    <Header fixed headerClassName="border-b border-b-[#E5E7EC] shadow-[0px_1px_4px_-2px_rgba(0,0,0,.3)]">
      <AppLogos.Orange className="shrink-0" />
      <NoticeForm />
    </Header>,
    document.body,
  );
}

export default PostNoticeHeader;

function NoticeForm() {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
    setValue,
  } = useForm<NoticeFormData>();

  const { editor, getEditorContent } = useLexicalEditor({ namespace: EDITOR_NAMESPACE });

  const formRef = useRef<HTMLFormElement>(null);

  const titleInputClassNames = twMerge([
    `outline-none box-border px-0.5 flex-1 min-w-[calc(100%-75px)] font-bold border-b focus:border-b-orange-400 transition-colors duration-200`,
  ]);
  const buttonClassNames = (classNames?: string) =>
    twMerge([`shrink-0 rounded-lg px-2 py-0.5 transition-colors duration-200 text-xs`, classNames]);

  const onBeforeSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!formRef.current) return;

    const JSONContent = getEditorContent('JSON');
    // const HTMLContent = getEditorContent('HTML');

    setValue('content', JSONContent);

    formRef.current.requestSubmit();
  };

  const onCancel = async (e: React.MouseEvent) => {
    console.log('작성 취소');
    // [TODO] 작성 취소
  };

  const onSubmit = async (data: NoticeFormData) => {
    editor?.blur();

    console.log('[submit]', { data });

    /*
      [TODO]
      백엔드 완료시
      백엔드에 데이터 전송(api)
    */
  };

  const onInvalid = async (errors: FieldErrors<NoticeFormData>) => {
    if (errors.title) {
      toastNotify('error', errors.title.message!);

      return;
    }
    if (errors.content) {
      editor?.focus();

      toastNotify('error', errors.content.message!);

      return;
    }
  };

  return (
    <form className={`ml-4 flex flex-1`} ref={formRef} onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="flex max-w-[calc(100%-102px)] flex-1 gap-1">
        <label className="shrink-0 font-bold text-gray-400" htmlFor="notice-title">
          [공지사항]
        </label>
        <input
          className={titleInputClassNames}
          id="notice-title"
          {...register('title', { required: '제목을 작성해주세요' })}
          placeholder="제목을 입력해주세요"
        />
        <input {...register('content', { required: '본문을 작성해주세요' })} hidden />
      </div>
      <div className="flex w-max gap-1">
        <button className={buttonClassNames('hover:bg-orange-500 hover:text-white')} type="button" onClick={onCancel}>
          취소
        </button>
        <button
          className={buttonClassNames(`bg-orange-400 text-white hover:bg-orange-500`)}
          type="button"
          onClick={onBeforeSubmit}
        >
          작성
        </button>
      </div>
    </form>
  );
}
