'use client';

import React from 'react';
import LexicalEditor from '../../Lexical/LexicalEditor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';

interface TripleANoticeViewerProps {
  initialEditorState: string;
}

function TripleANoticeViewer({ initialEditorState }: TripleANoticeViewerProps) {
  const onError: Parameters<typeof LexicalComposer>['0']['initialConfig']['onError'] = (error, editor) => {
    console.log(`%ceditorError`, `color: #fff; background-color: #f57716; font-weight: bold;`);
    console.log('----');
    console.log(`%c${error}`, `color: #fff; background-color: #f57716;`);
    console.log('----');
  };

  return (
    <div className="relative box-border w-full rounded-md border border-black p-4">
      <LexicalEditor
        config={{
          namespace: 'triple-a-editor-viewer',
          theme: {
            root: 'outline-none',
            text: {
              bold: 'font-bold',
              italic: 'italic',
            },
            link: 'text-blue-500 underline',
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
          editable: false,
          onError,
          ...(initialEditorState && {
            editorState: initialEditorState,
          }),
        }}
      />
    </div>
  );
}

export default TripleANoticeViewer;
