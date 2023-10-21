'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { type EditorConfig, LexicalEditor, $getNodeByKey, $createNodeSelection, $setSelection } from 'lexical';
import styled from '@emotion/styled';
import { OpenGraphLinkNode } from '../../Nodes/OpenGraphLinkNode';
import SpeechBalloon from '@/components/UI/Message/SpeechBalloon';
import { ALIGN_OPTIONS } from '../../Plugin/ToolbarPlugin';
import { AlignNames, ToolbarIcons } from '@/components/Editor/Toolbar/ToolbarIcons';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { twMerge } from 'tailwind-merge';

interface EditorOpenGraphLinkProps {
  editor: LexicalEditor;
  config: EditorConfig;
  nodeKey: string;
  openGraph: {
    url: string;
    title?: string;
    ogImage?: string;
    description?: string;
  };
  active: boolean;
}

function EditorOpenGraphLink({ editor, active, config, nodeKey, openGraph }: EditorOpenGraphLinkProps) {
  const editable = editor.isEditable();

  return (
    <StyledEditorOpenGraphLink
      className={`og relative flex w-[331px] max-w-full shrink-0 cursor-pointer border border-[#DEDEDE] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,.08)] outline-none`}
      as={editable ? 'div' : 'a'}
      {
        // @ts-ignore
        ...(!editor.isEditable() && { href: openGraph.url, target: '_blank' })
      }
      {...(editor.isEditable() && {
        onClick: () => {
          if (!nodeKey) return;

          editor.update(() => {
            const node = $getNodeByKey(nodeKey) as OpenGraphLinkNode;

            node.setIsActive(true, editor);

            const nodeSelection = $createNodeSelection();
            nodeSelection.add(nodeKey);
            $setSelection(nodeSelection);
          });
        },
      })}
    >
      {openGraph.ogImage ? (
        <div className="relative w-[26%] max-w-full shrink-0">
          <Image src={openGraph.ogImage} alt="og image" className="object-cover" fill sizes="30vw" />
        </div>
      ) : null}
      <div className="my-2 flex flex-1 flex-col justify-center gap-2 px-3">
        <h3 className="flex">
          <span className="line-clamp-1 text-sm font-bold text-black">{openGraph.title ?? ''}</span>
        </h3>
        <div className="flex">
          <span className="line-clamp-2 text-xs text-[#B8B8B8]">{openGraph.description ?? ''}</span>
        </div>
        <div className="flex">
          <span className="text-xs text-orange-400">{openGraph.url}</span>
        </div>
      </div>
      {/* tool */}
      <EditorOpenGraphLinkToolBar active={active} editor={editor} nodeKey={nodeKey} />
    </StyledEditorOpenGraphLink>
  );
}

export default EditorOpenGraphLink;

const StyledEditorOpenGraphLink = styled.div``;

function EditorOpenGraphLinkToolBar({
  active,
  editor,
  nodeKey,
}: {
  active: boolean;
  editor: LexicalEditor;
  nodeKey: string;
}) {
  const editorOpenGraphLinktoolbarRef = useRef<HTMLDivElement>(null);
  const toolbarContentRef = useRef<HTMLDivElement>(null);

  const [overflow, setOverflow] = useState(false);

  const classNames = {
    openGraphLinkToolbarWrapper: twMerge([
      `absolute left-0 box-border flex w-full h-fit justify-center`,
      overflow
        ? `bottom-0 origin-bottom translate-y-[calc(23px+16px)] rotate-180`
        : `top-0 -translate-y-[calc(100%+23px+16px)]`,
    ]),
    openGraphLinkToolbarContent: twMerge([`inline-flex h-full items-center gap-1`, overflow && `rotate-180`]),
  };

  const getActiveFromNodeAlign = (type: AlignNames) => {
    let result = false;

    editor.getEditorState().read(() => {
      const node = $getNodeByKey(nodeKey) as OpenGraphLinkNode | null;
      if (!node) {
        return;
      }

      switch (type) {
        case 'AlignLeft':
          result = node.getAlign() === 'start';

          break;
        case 'AlignCenter':
          result = node.getAlign() === 'center';

          break;
        case 'AlignRight':
          result = node.getAlign() === 'end';

          break;
      }
    });

    return result;
  };

  const getAlignButtonTitle = (type: AlignNames) => {
    switch (type) {
      case 'AlignLeft':
        return '왼쪽으로 정렬';
      case 'AlignCenter':
        return '중앙으로 정렬';
      case 'AlignRight':
        return '오른쪽으로 정렬';
    }
  };

  const align = (e: React.MouseEvent, type: AlignNames) => {
    e.stopPropagation();

    if (!nodeKey) return;

    editor.update(() => {
      const node = $getNodeByKey(nodeKey) as OpenGraphLinkNode;

      node.setIsActive(true, editor);

      switch (type) {
        case 'AlignLeft':
          node.setAlign('start', editor);

          break;
        case 'AlignCenter':
          node.setAlign('center', editor);

          break;
        case 'AlignRight':
          node.setAlign('end', editor);

          break;
      }
    });
  };

  const removeOpenGraphLinkNode = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!nodeKey) return;

    editor.update(() => {
      const openGraphLinkNode = $getNodeByKey(nodeKey) as OpenGraphLinkNode;

      openGraphLinkNode.remove();
    });
  };

  useLayoutEffect(() => {
    if (!editorOpenGraphLinktoolbarRef.current) return;

    const toolbarElement = editor.getRootElement()!.parentElement!.firstElementChild as HTMLElement;
    const openGraphLinkElement = editorOpenGraphLinktoolbarRef.current.parentElement!;
    const openGraphLinkToolElement = editorOpenGraphLinktoolbarRef.current;

    const isOverflow =
      openGraphLinkElement.offsetTop - 16 - 23 - openGraphLinkToolElement.offsetHeight < toolbarElement.offsetHeight;

    setOverflow(isOverflow);
  }, [active, editor]);

  return active ? (
    <div ref={editorOpenGraphLinktoolbarRef} className={classNames.openGraphLinkToolbarWrapper}>
      <SpeechBalloon ballonBorderColor="#f6893b" tailBorderColor="#f6893b" className="bg-white">
        <div ref={toolbarContentRef} className={classNames.openGraphLinkToolbarContent}>
          {ALIGN_OPTIONS.map((alignType) => {
            const AlignIcon = ToolbarIcons[alignType];

            return (
              <button
                key={alignType}
                className="shrink-0 align-top"
                onClick={(e) => align(e, alignType)}
                title={getAlignButtonTitle(alignType)}
              >
                <AlignIcon active={getActiveFromNodeAlign(alignType)} />
              </button>
            );
          })}
          <button className="shrink-0 align-top" title="openGraph 링크 삭제" onClick={removeOpenGraphLinkNode}>
            <RiDeleteBin6Line className="text-xl text-black" />
          </button>
        </div>
      </SpeechBalloon>
    </div>
  ) : null;
}
