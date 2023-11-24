'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import axios, { AxiosError } from 'axios';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useForm } from 'react-hook-form';
import { AppIcons } from '@/components/Icons';
import { TfiClose } from 'react-icons/tfi';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';
import { useEditorDialog } from '@/context/EditorDialogContext';
import { INSERT_OPENGRAPH_LINKNODE_COMMAND } from '../../Lexical/Nodes/OpenGraphLinkNode';

export interface OpenGraphLinkDialogProps {}

interface OpenGraph {
  url?: string;
  title?: string;
  ogImage?: string;
  description?: string;
}

interface OpenGraphResult {
  status: 'success' | 'fail' | 'idle';
  openGraph?: OpenGraph;
}

interface OpenGraphLinkFormData {
  url: string;
}

function OpenGraphLinkDialog(props: OpenGraphLinkDialogProps) {
  const [editor] = useLexicalComposerContext();

  const { close } = useEditorDialog();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<OpenGraphLinkFormData>();

  const resultElementRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<OpenGraphResult>({
    status: 'idle',
  });

  const Preview = () => {
    switch (result.status) {
      case 'idle':
        return null;
      case 'fail':
        return (
          <div className="text-center text-xs text-[#C9C9C9]">
            링크 정보를 불러오는 데 실패했습니다. 링크를 다시 확인해주세요.
          </div>
        );
      case 'success':
        if (!result?.openGraph) return null;

        const { title, ogImage, description, url } = result.openGraph;

        return (
          <div className="box-border flex w-full flex-col border border-gray-300">
            <div className="flex">
              {ogImage ? (
                <div className="relative w-[26%] shrink-0">
                  <Image src={ogImage} alt="og image" className="object-cover" fill />
                </div>
              ) : null}
              <div className="my-2 flex flex-1 flex-col justify-center gap-2 px-3">
                <h3 className="flex">
                  <span className="line-clamp-1 text-sm font-bold text-black">{title}</span>
                </h3>
                <div className="flex">
                  <span className="line-clamp-2 text-xs text-[#B8B8B8]">{description}</span>
                </div>
                <div className="flex">
                  <span className="text-xs text-orange-400">{url}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  const handleClick = () => {
    if (result.status !== 'success' || !result?.openGraph) return;

    const { url, title, ogImage, description } = result.openGraph!;

    editor.dispatchCommand(INSERT_OPENGRAPH_LINKNODE_COMMAND, {
      url: url!,
      title,
      ogImage,
      description,
    });

    close('openGraphLink');
  };

  const handleClose = () => {
    close('openGraphLink');
  };

  const onSubmit = async (data: OpenGraphLinkFormData) => {
    try {
      const res = await axios.post<{ ok: boolean; message: string; payload: OpenGraph }>('/api/og', {
        url: data.url,
      });

      const { title, ogImage, description } = res.data.payload;

      setResult((prev) => ({
        ...prev,
        status: 'success',
        openGraph: {
          url: data.url,
          title,
          ogImage: ogImage && ogImage.startsWith('//') ? `https:` + ogImage : ogImage,
          description,
        },
      }));
    } catch (error) {
      if (error instanceof AxiosError) {
        // const { response } = error as AxiosError<{ ok: boolean; message: string; payload: any }>;

        setResult((prev) => ({ ...prev, status: 'fail' }));

        return;
      }

      setResult((prev) => ({ ...prev, status: 'fail' }));
    }
  };

  useEffect(() => {
    if (!resultElementRef.current) return;

    const resultHeight = resultElementRef.current.children[0]?.scrollHeight ?? 0;

    resultElementRef.current.style.height = `${resultHeight}px`;
  }, [result]);

  return (
    <div className="fixed_inner fixed top-0 z-dimmed flex h-full items-center justify-center bg-black/10">
      {/* wrapper */}
      <form
        className="relative box-border w-[412px] rounded-lg border bg-white p-4 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* header */}
        <div className="absolute right-2 top-2 flex items-center">
          <button type="button" className="shrink-0 p-[4px_0px_4px_4px] align-top" onClick={handleClose}>
            <TfiClose />
          </button>
        </div>
        <h3 className="text-center text-2xl font-bold text-[#828282]">링크</h3>
        {/* content */}
        <div className="mt-5">
          <div className="relative box-border flex items-center justify-center border py-1 pl-2 pr-[120px]">
            <input
              {...register('url', { required: true })}
              className="w-full outline-none"
              placeholder="URL을 입력하세요."
              spellCheck="false"
              autoComplete="off"
            />
            {isSubmitting ? (
              <div className="absolute right-8 inline-flex shrink-0">
                <MuiSpinner size={16} />
              </div>
            ) : null}
            <button
              type="submit"
              className="group absolute right-1 top-0 flex h-full items-center justify-center p-0.5 align-top outline-none"
            >
              <AppIcons.Search className="transition-colors group-hover:[&>*]:stroke-orange-400" />
            </button>
          </div>
          {/* result */}
          <div ref={resultElementRef} className="mt-2 transition-[height] duration-300" style={{ height: '0px' }}>
            <Preview />
          </div>
        </div>
        {/* submit button */}
        <div className="mt-4 flex items-center justify-center">
          <button
            disabled={!isValid || result.status !== 'success'}
            type="button"
            className="group box-border flex h-10 w-[110px] shrink-0 items-center justify-center border border-[#DEDEDE] bg-white align-top outline-none hover:bg-orange-400 disabled:cursor-default disabled:hover:bg-white"
            onClick={handleClick}
          >
            <AppIcons.Check className="shrink-0 text-[24px] text-orange-400 transition-colors group-hover:text-white group-disabled:text-[#B4B4B4] group-disabled:group-hover:text-[#B4B4B4]" />
            <span className="font-bold text-orange-400 transition-colors group-hover:text-white group-disabled:text-[#B4B4B4] group-disabled:group-hover:text-[#B4B4B4]">
              확인
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default OpenGraphLinkDialog;
