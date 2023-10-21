'use client';

import React, { useRef } from 'react';
import { LexicalEditor as Editor } from 'lexical';
import LexicalEditor from '../Lexical/LexicalEditor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import EditorControl from './EditorControl';

interface TripleAEditorProps {
  editable?: boolean;
  initialEditorState?: string;
}

function TripleANoticeEditor({ editable = true, initialEditorState }: TripleAEditorProps) {
  const editorRef = useRef<Editor>(null);

  const onError: Parameters<typeof LexicalComposer>['0']['initialConfig']['onError'] = (error, editor) => {
    console.log(`%ceditorError`, `color: #fff; background-color: #f57716; font-weight: bold;`);
    console.log('----');
    console.log(`%c${error}`, `color: #fff; background-color: #f57716;`);
    console.log('----');
  };

  return (
    <div>
      <EditorControl ref={editorRef} open={editable} />
      <div className="relative box-border flex h-96 w-full shrink-0 flex-col border-2 border-[#eee]">
        <LexicalEditor
          config={{
            namespace: 'triple-a-editor',
            theme: {
              root: 'overflow-y-auto outline-none caret-black flex-1 box-border px-1 scrollbar-thin',
              text: {
                bold: 'font-bold',
                italic: 'italic',
              },
              link: 'text-blue-500 underline cursor-pointer caret-black',
            },
            editable,
            onError,
            ...(initialEditorState && {
              editorState: initialEditorState,
            }),
          }}
          ref={editorRef}
        />
      </div>
    </div>
  );
}

export default TripleANoticeEditor;
