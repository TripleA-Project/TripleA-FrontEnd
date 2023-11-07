'use client';

import { type ForwardedRef, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { LexicalEditor as Editor } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkNode } from '@lexical/link';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListNode, ListItemNode } from '@lexical/list';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import PlaceHolder from './PlaceHolder';
import { OpenGraphLinkNode } from './Nodes/OpenGraphLinkNode';
import { ImagePlugin, OpenGraphLinkPlugin, ToolbarPlugin } from './Plugin';
import { ImageNode } from './Nodes/ImageNode';
import { twMerge } from 'tailwind-merge';

interface LexicalEditorProps {
  config: Parameters<typeof LexicalComposer>['0']['initialConfig'];
}

export type CleanupCommand = (() => void) | null;

function LexicalEditor({ config }: LexicalEditorProps, ref: ForwardedRef<Editor>) {
  const editorRef = useRef<Editor>(null);

  const classNames = twMerge([`relative`, config.editable && `flex-1 pt-[42px]`]);

  useImperativeHandle(ref, () => {
    return editorRef.current!;
  });

  return (
    <LexicalComposer
      initialConfig={{
        ...config,
        nodes: [LinkNode, OpenGraphLinkNode, ListNode, ListItemNode, ImageNode],
      }}
    >
      <EditorRefPlugin editorRef={editorRef} />
      <ToolbarPlugin />
      <div className={classNames}>
        <RichTextPlugin
          contentEditable={<ContentEditable spellCheck="false" />}
          placeholder={(isEditable) => (isEditable ? <PlaceHolder /> : null)}
          ErrorBoundary={LexicalErrorBoundary}
        />
      </div>
      <HistoryPlugin />
      <TabIndentationPlugin />
      <LinkPlugin />
      <OpenGraphLinkPlugin />
      <ListPlugin />
      <ImagePlugin />
    </LexicalComposer>
  );
}

export default forwardRef(LexicalEditor);
