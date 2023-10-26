'use client';

import { $createNodeSelection, $getNodeByKey, $setSelection, EditorConfig, LexicalEditor } from 'lexical';
import { ImageNode, ImageNodeCommandPayload } from '../../Nodes/ImageNode';
import { twMerge } from 'tailwind-merge';
import { Resizable, ResizableProps, ResizeDirection, NumberSize } from 're-resizable';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface ImageComponentProps extends ImageNodeCommandPayload {
  editor: LexicalEditor;
  config: EditorConfig;
  active: boolean;
  nodeKey: string;
}

interface IndicatorProps {
  active: boolean;
  direction?: ResizeDirection;
  delta?: NumberSize;
}

function ImageComponent({ src, alt, width, height, arrange, editor, config, nodeKey, active }: ImageComponentProps) {
  const [indicator, setIndicator] = useState<IndicatorProps>({
    active: false,
  });

  const ref = useRef<HTMLDivElement>(null);

  const enableConfig: ResizableProps['enable'] = {
    topLeft: true,
    topRight: true,
    bottomLeft: true,
    bottomRight: true,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!nodeKey) return;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as ImageNode;

      node.setIsActive(true, editor);

      const nodeSelection = $createNodeSelection();
      nodeSelection.add(nodeKey);
      $setSelection(nodeSelection);
    });
  };

  const imgWrapperClassNames = twMerge([
    `relative h-full w-full outline`,
    active ? `outline-2 outline-orange-500` : `outline-1 outline-transparent hover:outline-[#EFEFEF]`,
  ]);

  const pointClassNames = {
    topLeft: twMerge([
      `!-left-1 !-top-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
    ]),
    topRight: twMerge([
      `!-right-1 !-top-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
    ]),
    bottomLeft: twMerge([
      `!-left-1 !-bottom-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
    ]),
    bottomRight: twMerge([
      `!-right-1 !-bottom-1 !box-border !h-2 !w-2 !border !border-orange-500 bg-white hover:!bg-orange-500`,
    ]),
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!ref.current) return;

      const target = e.target as HTMLElement;

      if (!ref.current.parentElement!.contains(target)) {
        editor.update(() => {
          const node = $getNodeByKey(nodeKey) as ImageNode;

          node.setIsActive(false, editor);
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [editor, nodeKey]);

  return (
    <Resizable
      defaultSize={{ width, height }}
      lockAspectRatio={true}
      maxWidth={'100%'}
      enable={active ? enableConfig : false}
      handleClasses={{
        topLeft: pointClassNames.topLeft,
        topRight: pointClassNames.topRight,
        bottomLeft: pointClassNames.bottomLeft,
        bottomRight: pointClassNames.bottomRight,
      }}
      onResizeStart={(e, direction, ref) => {
        setIndicator((prev) => ({
          ...prev,
          active,
          direction,
        }));
      }}
      onResize={(e, direction, ref, delta) => {
        setIndicator((prev) => ({
          ...prev,
          delta,
        }));
      }}
      onResizeStop={(e, direction, ref, delta) => {
        setIndicator({
          active: false,
          direction: undefined,
          delta: undefined,
        });
      }}
    >
      <div ref={ref} className={imgWrapperClassNames} onClick={handleClick}>
        <Image src={src} alt={alt} fill />
      </div>
      <SizeIndicator active={indicator.active} direction={indicator.direction} delta={indicator.delta} />
    </Resizable>
  );
}

export default ImageComponent;

function SizeIndicator({ active, direction, delta }: IndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!active) return;
    if (!ref.current) return;

    const getPos = () => {
      if (!delta)
        return `
        left: 0px;
        top: 0px;
      `;

      switch (direction) {
        case 'topLeft':
          return `
            left: 0px;
            top: 0px;
          `;
        case 'topRight':
          return `
            right: ${-4 - delta!.width}px;
            top: -4px;
          `;
        case 'bottomLeft':
          return `

          `;
        case 'bottomRight':
          return `
          
          `;
      }
    };

    ref.current.style.cssText = getPos() as string;
  }, [direction, delta, active]);

  return active ? (
    <div className="absolute" ref={ref}>
      {delta?.width} {delta?.height}
    </div>
  ) : null;
}
