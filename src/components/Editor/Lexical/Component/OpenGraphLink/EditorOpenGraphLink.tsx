'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import { twMerge } from 'tailwind-merge';
import { LexicalEditor, $setSelection } from 'lexical';
import { OpenGraphLinkNode } from '../../Nodes/OpenGraphLinkNode';
import SpeechBalloon from '@/components/UI/Message/SpeechBalloon';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { OpenGraphLinkAlignToolbar } from '@/components/Editor/Toolbar';
import beforeKnownNodeActive from '../../util/beforeKnownNodeActive';
import { useFindByLexicalEditor } from '@/hooks/useFindLexicalEditor';
import type { EditorConfig } from 'lexical';

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
  const { findNodeByKey } = useFindByLexicalEditor({ editor });

  const editable = editor.isEditable();
  const openGraphLinkRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (!editor.isEditable()) return;
    if (!openGraphLinkRef?.current) return;

    editor.update(() => {
      beforeKnownNodeActive({ compareTargetElement: openGraphLinkRef.current! });

      const targetOpenGrphLinkNode = findNodeByKey<OpenGraphLinkNode>(nodeKey).node;

      if (targetOpenGrphLinkNode && targetOpenGrphLinkNode.getIsActive() === false) {
        targetOpenGrphLinkNode.setIsActive(true);
        $setSelection(targetOpenGrphLinkNode.createSelfNodeSelection());
      }

      // click 이벤트 전파로 인해 node Selection 에서 selection이 변경되는 것을 방지
      e.stopPropagation();
    });
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
  const { findNodeByKey } = useFindByLexicalEditor({ editor });

  const openGraphLinkNode = findNodeByKey<OpenGraphLinkNode>(nodeKey).node!;

  const editorOpenGraphLinktoolbarRef = useRef<HTMLDivElement>(null);
  const toolbarContentRef = useRef<HTMLDivElement>(null);

  const classNames = {
    openGraphLinkToolbarWrapper: twMerge([
      `absolute left-0 box-border flex w-full h-fit justify-center pointer-events-none`,
      `top-0 -translate-y-[calc(100%+8px+4px)]`,
    ]),
    openGraphLinkToolbarContent: twMerge([`inline-flex h-full items-center gap-1`]),
  };

  const removeOpenGraphLinkNode = (e: React.MouseEvent) => {
    e.stopPropagation();

    const targetOpenGraphLinkNode = findNodeByKey<OpenGraphLinkNode>(nodeKey).node;

    if (targetOpenGraphLinkNode) {
      editor.update(() => {
        targetOpenGraphLinkNode.remove();
      });
    }
  };

  return active ? (
    <div ref={editorOpenGraphLinktoolbarRef} className={classNames.openGraphLinkToolbarWrapper}>
      <SpeechBalloon ballonBorderColor="#f6893b" tailBorderColor="#f6893b" className="pointer-events-auto bg-white">
        <div ref={toolbarContentRef} className={classNames.openGraphLinkToolbarContent}>
          <OpenGraphLinkAlignToolbar node={openGraphLinkNode} />
          <button className="shrink-0 align-top" title="openGraph 링크 삭제" onClick={removeOpenGraphLinkNode}>
            <RiDeleteBin6Line className="text-lg text-black" />
          </button>
        </div>
      </SpeechBalloon>
    </div>
  ) : null;
}
