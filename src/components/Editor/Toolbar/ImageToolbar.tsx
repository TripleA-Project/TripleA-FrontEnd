'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import {
  CHANGE_IMAGE_NODE_ALIGN,
  CHANGE_IMAGE_RESIZE_FORMAT,
  ChangeImageNodeAlignCommandPayload,
  INSERT_IMAGE_COMMAND,
  ImageNode,
  ImageNodeAlign,
  ImageResizeFormat,
  RESIZED_IMAGE_COMMAND,
} from '../Lexical/Nodes/ImageNode';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { BsFillLockFill } from 'react-icons/bs';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import { useFindByLexicalEditor } from '@/hooks/useFindLexicalEditor';
import { toastNotify } from '@/util/toastNotify';
import type { ComponentProps } from 'react';
import type { PickToolbarIconsKey } from './ToolbarIcons';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

interface ResizeState {
  width: string;
  height: string;
}

const imageSubToolbarStorage = {
  expanded: false,
};

export type ImageToolbarNames = 'Image';

export function ImageToolbar() {
  const [editor] = useLexicalComposerContext();
  const [disabled, setDisabled] = useState(true);

  const handleUpload = (e: React.MouseEvent) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      const files = target.files;

      if (!files?.length) {
        return;
      }

      const file = files[0];

      if (!file.type.includes('image')) {
        toastNotify('error', '이미지 파일만 업로드 가능합니다.');

        return;
      }

      const fileReader = new FileReader();

      fileReader.onloadend = (e) => {
        const result = e.target?.result as string;

        const img = document.createElement('img');

        img.onload = (e) => {
          const maxWidth = ImageNode.MAX_WIDTH;

          const width = img.width > maxWidth ? maxWidth : img.width;
          const height = img.width > maxWidth ? Number((maxWidth * (img.height / img.width)).toFixed(0)) : img.height;

          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src: result,
            alt: 'img',
            width,
            height,
          });
        };

        img.src = result;
      };

      fileReader.readAsDataURL(file);
    };

    fileInput.click();
  };

  useEffect(() => {
    setDisabled(Boolean(!editor?.getRootElement()));
  }, [editor]);

  return (
    <Toolbar.GroupWrapper>
      <Toolbar.Button
        disabled={disabled}
        active={false}
        icon={'Image'}
        title="이미지 파일 업로드"
        onClick={handleUpload}
      />
    </Toolbar.GroupWrapper>
  );
}

export function ImageResizeFormatToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const { findNodeByKey } = useFindByLexicalEditor({ editor });

  const [resizeFormat, setResizeFormat] = useState<ImageResizeFormat>(getResizeFormat());

  function getResizeFormat() {
    return findNodeByKey<ImageNode>(node.getKey()).transform((node) => node.getResizeFormat());
  }

  const resize = {
    fullWidth(e: React.MouseEvent) {
      editor.update(() => {
        node.setResizeFormat('full-width');
      });

      e.stopPropagation();
    },
  };

  useEffect(() => {
    let cleanupChangeResizeFormatCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupChangeResizeFormatCommand = editor.registerCommand(
      CHANGE_IMAGE_RESIZE_FORMAT,
      ({ nodeKey, resizeFormat }) => {
        if (node.getKey() === nodeKey) {
          setResizeFormat(resizeFormat);
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupChangeResizeFormatCommand) {
        cleanupChangeResizeFormatCommand();
      }
    };
  }, [editor, node]);

  return (
    <div className="flex items-center gap-1">
      <Toolbar.Button
        icon="FullWidth"
        iconClassName="text-sm"
        active={resizeFormat === 'full-width'}
        title="문서 너비"
        onClick={resize.fullWidth}
      />
    </div>
  );
}

export function ImageLockAspectResizeToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const defaultResizeState: ResizeState = {
    width: '',
    height: '',
  };

  const [resizeValue, setResizeValue] = useState<ResizeState>({
    ...defaultResizeState,
  });

  const [expanded, setExpanded] = useState(imageSubToolbarStorage.expanded);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);

  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNumberRegExp = new RegExp(`^[0-9]{${e.target.value.length}}$`, 'g');
    const isValid = onlyNumberRegExp.test(e.target.value);

    if (!isValid) {
      return;
    }

    if (e.currentTarget === widthInputRef.current) {
      setResizeValue((prev) => ({
        ...prev,
        ...getResizeLockAspect('width'),
        width: e.target.value,
      }));

      return;
    }

    setResizeValue((prev) => ({
      ...prev,
      ...getResizeLockAspect('height'),
      height: e.target.value,
    }));
  };

  const handleExpand = (e: React.MouseEvent) => {
    setExpanded((prev) => !prev);
    imageSubToolbarStorage.expanded = !imageSubToolbarStorage.expanded;

    e.stopPropagation();
  };

  const handleSubmit = (e: React.MouseEvent) => {
    if (!widthInputRef.current || !heightInputRef.current) return;
    if (!widthInputRef.current.value || !heightInputRef.current.value) return;

    editor.update(() => {
      const width = Number(widthInputRef.current!.value);
      const height = Number(heightInputRef.current!.value);

      const { width: maxWidth, height: maxHeight } = node.maxSize;

      if (width > maxWidth || height > maxHeight) {
        node.setSize({
          width: maxWidth,
          height: maxHeight,
        });

        displayPlaceHolder();

        toastNotify('error', '문서 너비에 맞추어 크기가 변경되었습니다');

        return;
      }

      node.setSize({
        width,
        height,
      });

      displayPlaceHolder();
    });

    e.stopPropagation();
  };

  function getResizeLockAspect(resizeTarget: 'width' | 'height') {
    const result = {
      width: '',
      height: '',
    };

    editor.getEditorState().read(() => {
      if (!widthInputRef?.current || !heightInputRef?.current) {
        return;
      }

      const currentSize = node.getSize();

      if (resizeTarget === 'width') {
        const changedWidth = widthInputRef.current.value;

        if (!changedWidth) {
          return;
        }

        const ratio = currentSize.height / currentSize.width;

        result.width = changedWidth;
        result.height = (Number(changedWidth) * ratio).toFixed(0);

        return;
      }

      const changedHeight = heightInputRef.current.value;
      if (!changedHeight) {
        return;
      }
      const ratio = currentSize.width / currentSize.height;

      result.width = (Number(changedHeight) * ratio).toFixed(0);
      result.height = changedHeight;
    });

    return result;
  }

  function displayPlaceHolder() {
    if (!widthInputRef?.current || !heightInputRef?.current) return;

    setResizeValue({ ...defaultResizeState });
  }

  useLayoutEffect(() => {
    if (!wrapperRef?.current) return;
    if (!expandButtonRef?.current) return;

    if (expanded) {
      wrapperRef.current.style.width = `${wrapperRef.current.scrollWidth}px`;

      return;
    }

    wrapperRef.current.style.width = `${expandButtonRef.current.scrollWidth + 4}px`;
  }, [expanded]);

  useEffect(() => {
    let cleanupResizedImageCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupResizedImageCommand = editor.registerCommand(
      RESIZED_IMAGE_COMMAND,
      ({ nodeKey, width, height }) => {
        if (!widthInputRef?.current || !heightInputRef?.current) return false;
        if (node.getKey() !== nodeKey) return false;

        widthInputRef.current.placeholder = `${width}`;
        heightInputRef.current.placeholder = `${height}`;

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupResizedImageCommand) {
        cleanupResizedImageCommand();
      }
    };
  }, [editor, node]);

  return (
    <div className="flex gap-0.5">
      <div
        ref={wrapperRef}
        className="box-border flex items-center gap-0.5 overflow-hidden px-1 transition-[width] duration-300"
      >
        <button
          ref={expandButtonRef}
          className="group inline-flex shrink-0 items-center justify-center gap-1 rounded-md bg-white p-1 align-top text-xs hover:border-transparent hover:bg-orange-400"
          title={expanded ? '크기 변경 닫기' : '크기 변경 열기'}
          onClick={handleExpand}
        >
          <MdPhotoSizeSelectLarge className="pointer-events-none shrink-0 text-xs group-hover:text-white" />
          <span className="pointer-events-none shrink-0 text-xs group-hover:text-white">크기</span>
        </button>
        <div className="flex items-center gap-0.5">
          <div className="flex items-center">
            <label htmlFor="image-width" className="mr-0.5 text-xs">
              W
            </label>
            <input
              ref={widthInputRef}
              inputMode="numeric"
              id="image-width"
              className="box-border w-[50px] border border-black px-1"
              placeholder={`${node.getSize().width}`}
              onChange={onChange}
              value={resizeValue.width}
            />
          </div>
          <div className="mx-0.5 flex items-center justify-center">
            <BsFillLockFill className="shrink-0 text-xs text-[#dedede]" />
          </div>
          <div className="flex items-center">
            <label htmlFor="image-height" className="mr-0.5 text-xs">
              H
            </label>
            <input
              ref={heightInputRef}
              id="image-height"
              inputMode="numeric"
              className="box-border w-[50px] border border-black px-1"
              placeholder={`${node.getSize().height}`}
              onChange={onChange}
              value={resizeValue.height}
            />
          </div>
          <button
            className="box-border inline-flex h-full w-max items-center justify-center bg-slate-400 px-1 py-0.5 text-xs text-white"
            onClick={handleSubmit}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export function ImageAlignToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const [align, setAlign] = useState<ImageNodeAlign>(node.getAlign());

  const ALIGN_OPTIONS: ImageNodeAlign[] = ['start', 'center', 'end'];

  function handleAlign(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const alignType = e.currentTarget.name as ImageNodeAlign;

    imageNodeAlign(alignType);
  }

  function imageNodeAlign(alignType: ImageNodeAlign) {
    editor.update(() => {
      node.setAlign(alignType);
    });

    setAlign(alignType);
  }

  const $updateAlign = useCallback(
    ({ nodeKey, align: targetAlign }: ChangeImageNodeAlignCommandPayload) => {
      // console.log(`%c[changeImageNodeAlign]`, `background-color: #3432a8; color: #fff;`);
      // console.log({ nodeKey, targetAlign, align });

      if (node.getKey() === nodeKey && align !== targetAlign) {
        setAlign(targetAlign);
      }
    },
    [node, align],
  );

  useEffect(() => {
    let cleanupChangedImageAlignCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupChangedImageAlignCommand = editor.registerCommand(
      CHANGE_IMAGE_NODE_ALIGN,
      (payload) => {
        $updateAlign(payload);

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupChangedImageAlignCommand) {
        cleanupChangedImageAlignCommand();
      }
    };
  }, [editor, $updateAlign]);

  return (
    <div className="flex items-center gap-1">
      {ALIGN_OPTIONS.map((alignOption) => {
        return (
          <Toolbar.Button
            key={`imageNodeAlign-${alignOption}`}
            onClick={handleAlign}
            {...alignPropsFactory(alignOption, { align })}
          />
        );
      })}
    </div>
  );
}

function alignPropsFactory(
  alignType: ImageNodeAlign,
  { align }: { align: ImageNodeAlign },
): ComponentProps<typeof Toolbar.Button> {
  const {
    iconName,
    title,
  }: { iconName: PickToolbarIconsKey<'AlignLeft' | 'AlignCenter' | 'AlignRight'>; title: string } = ((
    alignType: ImageNodeAlign,
  ) => {
    switch (alignType) {
      case 'start':
        return {
          iconName: 'AlignLeft',
          title: '왼쪽 정렬',
        };
      case 'center':
        return {
          iconName: 'AlignCenter',
          title: '가운데 정렬',
        };
      case 'end':
        return {
          iconName: 'AlignRight',
          title: '오른쪽 정렬',
        };
    }
  })(alignType);

  return {
    name: alignType,
    active: align === alignType,
    title,
    icon: iconName,
    iconClassName: 'text-xs',
  };
}
