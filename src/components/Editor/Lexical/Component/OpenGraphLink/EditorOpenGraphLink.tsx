'use client';

import React, { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import SpeechBalloon from '@/components/UI/Message/SpeechBalloon';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { type EditorConfig, LexicalEditor, $getNodeByKey, $setSelection } from 'lexical';
import { OpenGraphLinkNode } from '../../Nodes/OpenGraphLinkNode';
import { AlignNames, ToolbarIcons } from '@/components/Editor/Toolbar/ToolbarIcons';
import { DATASET_NAME_FOR_HANDLE } from '../../util/toolbar';

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

const ALIGN_OPTIONS: AlignNames[] = ['AlignLeft', 'AlignCenter', 'AlignRight'];

function EditorOpenGraphLink({ editor, active, config, nodeKey, openGraph }: EditorOpenGraphLinkProps) {
  const editable = editor.isEditable();
  const openGraphLinkRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    editor.update(() => {
      const activedOpenGraphLinkNode = document.querySelector(
        `[data-${DATASET_NAME_FOR_HANDLE.NODE_TYPE}=${OpenGraphLinkNode.getType()}].active`,
      );
      if (activedOpenGraphLinkNode) {
        const key = (activedOpenGraphLinkNode as HTMLElement).dataset[DATASET_NAME_FOR_HANDLE.CAMEL_CASE_KEY];

        if (key) {
          const node = $getNodeByKey(key) as OpenGraphLinkNode;
          node.setIsActive(false);
        }
      }

      const node = $getNodeByKey(nodeKey) as OpenGraphLinkNode;

      node.setIsActive(true);

      $setSelection(node.createSelfNodeSelection());
    });

    e.stopPropagation();
  };

  return (
    <StyledEditorOpenGraphLink
      className={`og relative flex w-[331px] max-w-full shrink-0 cursor-pointer border border-[#DEDEDE] bg-white shadow-[0_1px_2px_0_rgba(0,0,0,.08)] outline-none`}
      as={editable ? 'div' : 'a'}
      {
        // @ts-ignore
        ...(!editor.isEditable() && { href: openGraph.url, target: '_blank' })
      }
      {...(editor.isEditable() && {
        ref: openGraphLinkRef,
        onClick: handleClick,
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

  const classNames = {
    openGraphLinkToolbarWrapper: twMerge([
      `absolute left-0 box-border flex w-full h-fit justify-center pointer-events-none`,
      `top-0 -translate-y-[calc(100%+8px+4px)]`,
    ]),
    openGraphLinkToolbarContent: twMerge([`inline-flex h-full items-center gap-1`]),
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

      switch (type) {
        case 'AlignLeft':
          node.setAlign('start');

          break;
        case 'AlignCenter':
          node.setAlign('center');

          break;
        case 'AlignRight':
          node.setAlign('end');

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

  return active ? (
    <div ref={editorOpenGraphLinktoolbarRef} className={classNames.openGraphLinkToolbarWrapper}>
      <SpeechBalloon ballonBorderColor="#f6893b" tailBorderColor="#f6893b" className="pointer-events-auto bg-white">
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
