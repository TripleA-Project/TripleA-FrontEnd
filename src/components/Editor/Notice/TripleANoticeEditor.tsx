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
      <div className="relative box-border flex h-96 w-full shrink-0 flex-col gap-3 border-2 border-[#eee] bg-white">
        <LexicalEditor
          config={{
            namespace: 'triple-a-editor',
            theme: {
              root: 'overflow-y-visible outline-none caret-black box-border px-1 bg-white',
              text: {
                bold: 'font-bold',
                italic: 'italic',
              },
              link: 'text-blue-500 underline cursor-pointer caret-black',
              list: {
                ul: 'list-disc',
                ol: 'list-decimal',
                nested: {
                  listitem: 'list-none',
                },
                olDepth: ['pl-[40px]'],
                ulDepth: ['pl-[40px]'],
              },
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
