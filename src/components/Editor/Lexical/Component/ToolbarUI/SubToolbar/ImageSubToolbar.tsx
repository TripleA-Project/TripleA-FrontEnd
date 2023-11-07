import React, { useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Toolbar from '../Toolbar';
import {
  CHANGE_IMAGE_NODE_ALIGN,
  CHANGE_IMAGE_RESIZE_FORMAT,
  ImageNode,
  ImageNodeAlign,
  ImageResizeFormat,
  RESIZED_IMAGE_COMMAND,
} from '../../../Nodes/ImageNode';
import { MdPhotoSizeSelectLarge } from 'react-icons/md';
import { BsFillLockFill } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { toastNotify } from '@/util/toastNotify';
import { $getNodeByKey, COMMAND_PRIORITY_EDITOR } from 'lexical';
import type { CleanupCommand } from '../../../LexicalEditor';

interface ResizeState {
  width: string;
  height: string;
}

interface ImageSubToolbarProps {
  node: ImageNode;
}

export function ImageSubToolbar({ node }: ImageSubToolbarProps) {
  return (
    <Toolbar.GroupWrapper>
      <div className="flex items-center gap-1">
        <ImageAlignToolbar node={node} />
        <ImageResizeFormatToolbar node={node} />
        <ImageLockAspectResizeToolbar node={node} />
      </div>
    </Toolbar.GroupWrapper>
  );
}

function ImageLockAspectResizeToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const defaultResizeState: ResizeState = {
    width: '',
    height: '',
  };

  const [resizeValue, setResizeValue] = useState<ResizeState>({
    ...defaultResizeState,
  });

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

  const handleSubmit = (e: React.MouseEvent) => {
    editor.update(() => {
      if (!widthInputRef.current || !heightInputRef.current) {
        return;
      }

      const width = Number(widthInputRef.current.value);
      const height = Number(heightInputRef.current.value);

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

  useEffect(() => {
    let cleanupResizedImageCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupResizedImageCommand = editor.registerCommand(
      RESIZED_IMAGE_COMMAND,
      ({ nodeKey, width, height }) => {
        console.log(`%cResized Image`, `background-color:green; color:#fff;`);
        console.log({ nodeKey, width, height });

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
    <div className="flex items-center gap-0.5">
      <button
        className="group inline-flex shrink-0 items-center justify-center gap-1 rounded-md border border-black bg-white px-1 py-0.5 align-top text-xs hover:border-transparent hover:bg-orange-400"
        onClick={handleSubmit}
      >
        <MdPhotoSizeSelectLarge className="shrink-0 text-xs group-hover:text-white" />
      </button>
      <div className="flex gap-0.5">
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
      </div>
    </div>
  );
}

function ImageAlignToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const [align, setAlign] = useState<ImageNodeAlign>(getImageNodeAlign());

  const imageNodeAlign = {
    start(e: React.MouseEvent) {
      editor.update(() => {
        node.setAlign('start');
      });

      e.stopPropagation();
    },
    center(e: React.MouseEvent) {
      editor.update(() => {
        node.setAlign('center');
      });

      e.stopPropagation();
    },
    end(e: React.MouseEvent) {
      editor.update(() => {
        node.setAlign('end');
      });

      e.stopPropagation();
    },
  };

  function getImageNodeAlign() {
    const result = {
      align: 'start' as ImageNodeAlign,
    };

    editor.getEditorState().read(() => {
      const imageNode = $getNodeByKey(node.getKey()) as ImageNode;

      result.align = imageNode.getAlign();
    });

    return result.align;
  }

  useEffect(() => {
    let cleanupChangedImageAlignCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupChangedImageAlignCommand = editor.registerCommand(
      CHANGE_IMAGE_NODE_ALIGN,
      ({ nodeKey, align }) => {
        console.log(`%c[changeImageNodeAlign]`, `background-color: #3432a8; color: #fff;`);
        console.log({ nodeKey, align });

        if (node.getKey() === nodeKey) {
          setAlign(align);
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupChangedImageAlignCommand) {
        cleanupChangedImageAlignCommand();
      }
    };
  }, [editor, node]);

  return (
    <div className="flex items-center gap-1">
      <Toolbar.Button
        icon="AlignLeft"
        iconClassName="text-sm"
        title="왼쪽 정렬"
        active={align === 'start'}
        onClick={imageNodeAlign.start}
      />
      <Toolbar.Button
        icon="AlignCenter"
        iconClassName="text-sm"
        title="가운데 정렬"
        active={align === 'center'}
        onClick={imageNodeAlign.center}
      />
      <Toolbar.Button
        icon="AlignRight"
        iconClassName="text-sm"
        title="오른쪽 정렬"
        active={align === 'end'}
        onClick={imageNodeAlign.end}
      />
    </div>
  );
}

function ImageResizeFormatToolbar({ node }: { node: ImageNode }) {
  const [editor] = useLexicalComposerContext();

  const [resizeFormat, setResizeFormat] = useState<ImageResizeFormat>(getResizeFormat());

  function getResizeFormat() {
    const result = {
      resizeFormat: null as ImageResizeFormat,
    };

    editor.getEditorState().read(() => {
      const imageNode = $getNodeByKey(node.getKey()) as ImageNode;

      result.resizeFormat = imageNode.getResizeFormat();
    });

    return result.resizeFormat;
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
