'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $setSelection, type EditorConfig, LexicalEditor } from 'lexical';
import { ImageNode, ImageNodeCommandPayload } from '../../Nodes/ImageNode';
import { Resizable, ResizableProps } from 're-resizable';
import { DATASET_NAME_FOR_HANDLE } from '../../util/toolbar';

interface ImageComponentProps extends ImageNodeCommandPayload {
  editor: LexicalEditor;
  config: EditorConfig;
  active: boolean;
  nodeKey: string;
}

function ImageComponent({ src, alt, width, height, editor, config, nodeKey, active }: ImageComponentProps) {
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    editor.update(() => {
      const activedImageNode = document.querySelector(
        `[data-${DATASET_NAME_FOR_HANDLE.NODE_TYPE}=${ImageNode.getType()}].active`,
      );
      if (activedImageNode) {
        const key = (activedImageNode as HTMLElement).dataset[DATASET_NAME_FOR_HANDLE.CAMEL_CASE_KEY];

        if (key) {
          const node = $getNodeByKey(key) as ImageNode;
          node.setIsActive(false);
        }
      }

      const node = $getNodeByKey(nodeKey) as ImageNode;

      node.setIsActive(true);

      $setSelection(node.createSelfNodeSelection());
    });

    e.stopPropagation();
  };

  const imgWrapperClassNames = twMerge([
    `relative inline-block align-top outline max-w-full outline-transparent`,
    active ? `outline-2` : `outline-1`,
    editor.isEditable() ? `cursor-grab hover:outline-[#EFEFEF]` : `cursor-pointer`,
  ]);

  return (
    <div ref={imageWrapperRef} className={imgWrapperClassNames} onClick={handleClick}>
      <Image width={width} height={height} src={src} alt={alt} className="max-w-full" />
      <ResizeImage active={active} nodeKey={nodeKey} src={src} width={width} height={height} />
    </div>
  );
}

export default ImageComponent;

function ResizeImage({
  active,
  nodeKey,
  src,
  width,
  height,
}: {
  active: boolean;
  nodeKey: string;
  src: string;
  width: number;
  height: number;
}) {
  const [editor] = useLexicalComposerContext();

  const imgRef = useRef<HTMLImageElement>(null);

  const maxSize = getMaxSize();

  const resizeComponentClassNames = twMerge([
    `outline outline-2 outline-orange-500 !absolute !z-[2] !top-0 !box-content`,
    !active && `hidden`,
  ]);

  const pointClassNames = {
    topLeft: twMerge([
      `!-left-1 !-top-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
      `active:bg-orange-500`,
    ]),
    topRight: twMerge([
      `!-right-1 !-top-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
      `active:bg-orange-500`,
    ]),
    bottomLeft: twMerge([
      `!-left-1 !-bottom-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
      `active:bg-orange-500`,
    ]),
    bottomRight: twMerge([
      `!-right-1 !-bottom-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
      `active:bg-orange-500`,
    ]),
  };

  const enableConfig: ResizableProps['enable'] = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  };

  function getMaxSize() {
    const rootElement = editor.getRootElement()!;
    const rootPadding = {
      left: Number(getComputedStyle(rootElement).paddingLeft.replace('px', '')),
      right: Number(getComputedStyle(rootElement).paddingRight.replace('px', '')),
    };

    const maxWidth = Number((rootElement.clientWidth - (rootPadding.left + rootPadding.right)).toFixed(0));

    return {
      width: maxWidth,
      height: Number((maxWidth * (height / width)).toFixed(0)),
    };
  }

  const handleResizeStop: ResizableProps['onResizeStop'] = (e, direction, ref, delta) => {
    editor.update(() => {
      const imageNode = $getNodeByKey(nodeKey) as ImageNode;

      const { width, height } = imageNode.getSize();

      const targetWidth = width + delta.width;
      const targetHeight = height + delta.height;

      console.log({ width, height });
      console.log({ delta });
      console.log({ targetWidth, targetHeight });

      imageNode.setSize({
        width: targetWidth,
        height: targetHeight,
      });
    });
  };

  useLayoutEffect(() => {
    if (!imgRef?.current) return;

    const resizableElement = imgRef.current.parentElement;

    if (resizableElement) {
      resizableElement.style.width = `${width}px`;
      resizableElement.style.height = `${height}px`;
    }
  }, [width, height]);

  return (
    <Resizable
      className={resizeComponentClassNames}
      defaultSize={{ width, height }}
      lockAspectRatio={true}
      maxWidth={maxSize.width}
      maxHeight={maxSize.height}
      enable={active ? enableConfig : false}
      handleClasses={pointClassNames}
      onResizeStop={handleResizeStop}
    >
      <Image ref={imgRef} className="opacity-[0.3]" src={src} alt="resize image" fill />
    </Resizable>
  );
}
