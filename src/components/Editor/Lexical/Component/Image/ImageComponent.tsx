'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { EditorConfig, $setSelection, LexicalEditor, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { ImageNode, ImageNodeCommandPayload, RESIZED_IMAGE_COMMAND } from '../../Nodes/ImageNode';
import { Resizable, ResizableProps, Size, ResizeDirection } from 're-resizable';
import { useDocumentResizeEditorNodeCallback } from '@/hooks/useDocumentResizeEditorNodeCallback';
import { useFindByLexicalEditor } from '@/hooks/useFindLexicalEditor';
import beforeKnownNodeActive from '../../util/beforeKnownNodeActive';
// import type { EditorConfig } from 'lexical';
import type { CleanupCommand } from '../../LexicalEditor';

type ResizableDirection = Exclude<ResizeDirection, 'top' | 'bottom' | 'left' | 'right'>;

interface ImageComponentProps extends ImageNodeCommandPayload {
  editor: LexicalEditor;
  config: EditorConfig;
  active: boolean;
  nodeKey: string;
}

/* Image Component */
function ImageComponent({ src, alt, width, height, editor, config, nodeKey, active }: ImageComponentProps) {
  const { findNodeByKey } = useFindByLexicalEditor({ editor });

  const imageWrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!editor.isEditable()) return;
    if (!imageWrapperRef?.current) return;

    editor.update(() => {
      beforeKnownNodeActive({ compareTargetElement: imageWrapperRef.current! });

      const imageNode = findNodeByKey<ImageNode>(nodeKey).node;

      if (imageNode && imageNode.getIsActive() === false) {
        imageNode.setIsActive(true);
        $setSelection(imageNode.createSelfNodeSelection());
      }
    });

    // click 이벤트 전파로 인해 nodeSelection 에서 selection이 변경되는 것을 방지
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
      {editor.isEditable() ? (
        <ResizeImage active={active} nodeKey={nodeKey} src={src} width={width} height={height} />
      ) : null}
    </div>
  );
}

export default ImageComponent;

/* Resize Image Component */
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
  const { findNodeByKey } = useFindByLexicalEditor({ editor });
  const { registerCallback } = useDocumentResizeEditorNodeCallback<ImageNode>({ nodeKey, editor });

  const [size, setSize] = useState<Size>({ width, height });

  const imgRef = useRef<HTMLImageElement>(null);
  const sizeResultRef = useRef<Size>({ width, height });

  /* handler */
  const handleResizing: ResizableProps['onResize'] = (e, direction, ref, delta) => {
    const result = {
      width: width + delta.width,
      height: height + delta.height,
    };

    ref.style.width = `${result.width}px`;
    ref.style.height = `${result.height}px`;

    sizeResultRef.current = {
      ...result,
    };
  };

  const handleResizeStop: ResizableProps['onResizeStop'] = (e, direction, ref, delta) => {
    const imageNode = findNodeByKey<ImageNode>(nodeKey).node;

    if (!imageNode) return;

    editor.update(() => {
      imageNode.setSize({
        width: sizeResultRef.current.width as number,
        height: sizeResultRef.current.height as number,
      });
    });

    setSize({
      ...sizeResultRef.current,
    });
  };

  /* effect */
  useLayoutEffect(() => {
    if (!imgRef.current) return;

    const resizableElement = imgRef.current.parentElement;
    if (!resizableElement) return;

    const handleResizeCallback = (node: ImageNode) => {
      const { width, height } = node.getSize();

      // console.log(`%c[Resize: image] width:${width} height:${height}`, `background-color: violet; color:#fff;`);

      if (sizeResultRef.current) {
        sizeResultRef.current = {
          width,
          height,
        };
      }

      setSize({ width, height });
    };

    registerCallback(handleResizeCallback);
  }, []); /* eslint-disable-line */

  useEffect(() => {
    let cleanupResizedImageCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupResizedImageCommand = editor.registerCommand(
      RESIZED_IMAGE_COMMAND,
      ({ nodeKey: targetNodeKey, width, height }) => {
        if (nodeKey !== targetNodeKey) return false;

        if (sizeResultRef.current) {
          sizeResultRef.current = {
            width,
            height,
          };
        }

        setSize({
          width,
          height,
        });

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupResizedImageCommand) {
        cleanupResizedImageCommand();
      }
    };
  }, [editor, nodeKey]);

  return (
    <Resizable
      {...ComponentConfig.resizableComponent.classNames({ active })}
      {...ComponentConfig.resizableComponent.sizes({ size, editor })}
      lockAspectRatio={true}
      enable={ComponentConfig.resizableComponent.enable}
      onResize={handleResizing}
      onResizeStop={handleResizeStop}
    >
      <Image ref={imgRef} className="opacity-[0.3]" src={src} alt="resize image" fill />
    </Resizable>
  );
}

/* helper */
const ComponentUtil = {
  getClassNames({ active }: { active: boolean }) {
    return {
      resizable: getResizeComponentClassNames({ active }),
      point: getPointClassNames(),
    };

    function getResizeComponentClassNames({ active }: { active: boolean }) {
      return twMerge([
        `outline outline-2 outline-orange-500 !absolute !top-0 !box-content z-component`,
        !active && `hidden`,
      ]);
    }

    function getPointClassNames(): Record<ResizableDirection, string> {
      const pointCommonClassNames = `!box-border !h-2 !w-2 !border !border-orange-500 bg-white`;
      const pointHoverClassNames = `hover:!bg-orange-500`;
      const pointActiveClassNames = `active:bg-orange-500`;

      const common = [pointCommonClassNames, pointHoverClassNames, pointActiveClassNames];

      const pointPositionClassNames: Record<ResizableDirection, string> = {
        topLeft: `!-left-1 !-top-1`,
        topRight: `!-right-1 !-top-1`,
        bottomLeft: `!-left-1 !-bottom-1`,
        bottomRight: `!-right-1 !-bottom-1`,
      };

      return {
        topLeft: twMerge([...common, pointPositionClassNames.topLeft]),
        topRight: twMerge([...common, pointPositionClassNames.topRight]),
        bottomLeft: twMerge([...common, pointPositionClassNames.bottomLeft]),
        bottomRight: twMerge([...common, pointPositionClassNames.bottomRight]),
      };
    }
  },
  canResize() {
    return document.body.clientWidth >= ImageNode.MAX_WIDTH;
  },
  getResizableMaxSize({ size, editor }: { size: Size; editor: LexicalEditor }) {
    const rootElement = editor.getRootElement()!;
    const rootPadding = {
      left: Number(getComputedStyle(rootElement).paddingLeft.replace('px', '')),
      right: Number(getComputedStyle(rootElement).paddingRight.replace('px', '')),
    };

    const maxWidth = Number((rootElement.clientWidth - (rootPadding.left + rootPadding.right)).toFixed(0));
    const width = Number(size.width);
    const height = Number(size.height);

    return {
      maxWidth: maxWidth,
      maxHeight: Number((maxWidth * (height / width)).toFixed(0)),
    };
  },
};

const ComponentConfig = {
  resizableComponent: {
    get enable(): ResizableProps['enable'] {
      return ComponentUtil.canResize()
        ? {
            topLeft: true,
            topRight: true,
            bottomLeft: true,
            bottomRight: true,
          }
        : false;
    },
    classNames({ active }: { active: boolean }): {
      className: ResizableProps['className'];
      handleClasses: ResizableProps['handleClasses'];
    } {
      const classNames = ComponentUtil.getClassNames({ active });

      return {
        className: classNames.resizable,
        handleClasses: classNames.point,
      };
    },
    sizes({ size, editor }: { size: Size; editor: LexicalEditor }): {
      size: ResizableProps['size'];
      maxWidth: ResizableProps['maxWidth'];
      maxHeight: ResizableProps['maxHeight'];
    } {
      return {
        size,
        ...ComponentUtil.getResizableMaxSize({ size, editor }),
      };
    },
  },
};
