'use client';

import { type ForwardedRef, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { LexicalEditor as Editor } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import PlaceHolder from './PlaceHolder';
import ToolbarPlugin from './Plugin/ToolbarPlugin';
import { OpenGraphLinkNode } from './Nodes/OpenGraphLinkNode';
import OpenGraphLinkPlugin from './Plugin/OpenGraphLinkPlugin';
import { EditorInActiveUtil } from './util/inActiveNode';

interface LexicalEditorProps {
  config: Parameters<typeof LexicalComposer>['0']['initialConfig'];
}

export type CleanupCommand = (() => void) | null;

function LexicalEditor({ config }: LexicalEditorProps, ref: ForwardedRef<Editor>) {
  const editorRef = useRef<Editor>(null);

  useImperativeHandle(ref, () => {
    return editorRef.current!;
  });

  useEffect(() => {
    if (!editorRef.current) return;

    const handleClick = (e: MouseEvent) => {
      if (!editorRef.current) return;

      const target = e.target as HTMLElement;

      if (config.editable) {
        EditorInActiveUtil.inActiveLinkNode({ target, editor: editorRef.current });
        EditorInActiveUtil.inActiveOpenGraphLinkNode({ target, editor: editorRef.current });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [config]);

  return (
    <LexicalComposer
      initialConfig={{
        ...config,
        nodes: [LinkNode, OpenGraphLinkNode],
      }}
    >
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable spellCheck="false" />}
        placeholder={(isEditable) => (isEditable ? <PlaceHolder /> : null)}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <LinkPlugin />
      <EditorRefPlugin editorRef={editorRef} />
      <OpenGraphLinkPlugin />
    </LexicalComposer>
  );
}

export default forwardRef(LexicalEditor);
