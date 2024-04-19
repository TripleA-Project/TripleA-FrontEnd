'use client';

import { styled } from '@mui/material/styles';
import { EDITOR_NAMESPACE } from '@/constants/editor';
import { useLexicalEditor } from '@/hooks/useLexicalEditor';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { useEffect } from 'react';
import { toastNotify } from '@/util/toastNotify';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { useCreateNoticeMutation } from '@/hooks/noticeMutation/useCreateNoticeMutation';
import { useUpdateNoticeMutation } from '@/hooks/noticeMutation/useUpdateNoticeMutation';
import { AxiosError, HttpStatusCode } from 'axios';
import { APIResponse } from '@/interfaces/Dto/Core';
import { FaRegCircleCheck } from 'react-icons/fa6';
import Link from 'next/link';
import { revalidateNoticeListPage } from '@/util/actions/revalidate';

export type NoticeAction = 'create' | 'change';

interface NoticeFormData {
  title: string;
  content: string;
}

interface NoticeFormProps {
  action: NoticeAction;
  title?: string;
  content?: string;
  noticeId?: number;
}

const TitleInput = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    height: '32px',
    '&:hover fieldset': {
      borderColor: 'rgba(251,141,60,.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange !important',
    },
  },
});

function NoticeForm({ noticeId, title, content, action }: NoticeFormProps) {
  const { replace } = useRouter();
  const { editor, getEditorContent } = useLexicalEditor({ namespace: EDITOR_NAMESPACE });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    control,
  } = useForm<NoticeFormData>({
    values: {
      title: title ?? '',
      content: content ?? '',
    },
  });

  const { createNoticeMutate, createNoticeMutateStatus } = useCreateNoticeMutation({
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>;

        if (response?.status === HttpStatusCode.Unauthorized) {
          replace('/login');
          return;
        }

        toastNotify('error', '공지사항 작성에 실패했습니다.');
        return;
      }

      const { message } = error as Error;
      toastNotify('error', '공지사항 작성에 실패했습니다.');
    },
  });

  const { updateNoticeMutate, updateNoticeMutateStatus } = useUpdateNoticeMutation({
    onError(error) {
      if (error instanceof AxiosError) {
        const { response } = error as AxiosError<APIResponse>;

        if (response?.status === HttpStatusCode.Unauthorized) {
          replace('/login');
          return;
        }

        toastNotify('error', '공지사항 수정에 실패했습니다.');
        return;
      }

      const { message } = error as Error;
      toastNotify('error', '공지사항 수정에 실패했습니다.');
    },
  });

  const buttonClassNames = (classNames?: string) =>
    twMerge([`shrink-0 rounded-lg px-2 py-0.5 transition-colors duration-200 text-xs`, classNames]);

  const onCancel = () => {
    replace('/admin/notice');
  };

  const onSubmit = async ({ title, content }: NoticeFormData) => {
    if (action === 'create') {
      createNoticeMutate({ title, content });
      return;
    }

    if (noticeId !== undefined) {
      updateNoticeMutate({ id: noticeId, title, content });
    }
  };

  const onInvalid = (errors: FieldErrors<NoticeFormData>) => {
    if (errors.title) {
      toastNotify('error', errors.title.message!);
      return;
    }

    if (errors.content) {
      toastNotify('error', errors.content.message!);
      return;
    }
  };

  useEffect(() => {
    let cleanupListener: (() => void) | null = null;

    if (!editor) return;

    if (!cleanupListener) {
      cleanupListener = editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          const json = getEditorContent('JSON');

          setValue('content', json);
        });
      });
    }

    return () => {
      cleanupListener && cleanupListener();
    };
  }, [editor]); /* eslint-disable-line */

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="relative flex w-full items-center">
      <Controller
        control={control}
        name="title"
        rules={{
          required: '제목을 입력해주세요',
        }}
        render={({ field, fieldState }) => (
          <div className="flex-1">
            <TitleInput
              {...field}
              fullWidth
              placeholder={'공지사항 제목'}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? ' '}
            />
          </div>
        )}
      />
      <input
        className="sr-only"
        {...register('content', {
          required: '공지 내용을 입력해주세요',
        })}
      />
      <div className="flex h-8 items-center gap-2 self-start px-2">
        <button className={buttonClassNames('hover:bg-[#222] hover:text-white')} type="button" onClick={onCancel}>
          취소
        </button>
        <button className={buttonClassNames(`bg-orange-400 text-white hover:bg-orange-500`)} type="submit">
          {action === 'create' ? '작성' : '수정'}
        </button>
      </div>
      <StatusIndicator
        action={action}
        isLoading={!editor || editor.isEditable() === undefined}
        isSubmit={isSubmitting || createNoticeMutateStatus === 'loading' || updateNoticeMutateStatus === 'loading'}
        isSuccess={createNoticeMutateStatus === 'success' || updateNoticeMutateStatus === 'success'}
      />
    </form>
  );
}

export default NoticeForm;

function StatusIndicator({
  action,
  isLoading,
  isSubmit,
  isSuccess,
}: {
  action: NoticeAction;
  isLoading: boolean;
  isSubmit: boolean;
  isSuccess?: boolean;
}) {
  const open = isLoading || isSubmit || isSuccess;

  useEffect(() => {
    if (isSuccess) {
      revalidateNoticeListPage();
    }
  }, [isSuccess]);

  return open ? (
    <div className="fixed_inner fixed top-[52px] z-[5] flex h-[calc(100vh-113.5px)]">
      <div className="flex h-full w-full items-center justify-center bg-white/70">
        {isLoading || isSubmit ? <MuiSpinner size={20} /> : null}
        {!isLoading && isSuccess ? (
          <div className="flex flex-col items-center gap-4">
            <div className="h-5 w-5 overflow-hidden rounded-full bg-white">
              <FaRegCircleCheck className="text-xl text-emerald-400" />
            </div>
            <span className="font-bold">{action === 'create' ? '공지사항 작성' : '공지사항 수정'}을 성공했습니다.</span>
            <Link
              href={'/admin/notice'}
              className="rounded-lg bg-green-500 px-2 py-1 text-sm font-bold text-white transition-colors duration-200 hover:bg-emerald-600"
            >
              목록 보기
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;
}
