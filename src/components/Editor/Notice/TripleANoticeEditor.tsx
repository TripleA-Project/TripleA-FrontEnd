'use client';

import React, { useEffect } from 'react';
import LexicalEditor from '../Lexical/LexicalEditor';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { EDITOR_NAMESPACE } from '@/constants/editor';
import { $getRoot } from 'lexical';
import { useLexicalEditor } from '@/hooks/useLexicalEditor';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

interface TripleAEditorProps {
  editable?: boolean;
  initialEditorState?: string;
}

function TripleANoticeEditor({ editable = true, initialEditorState }: TripleAEditorProps) {
  const { editor } = useLexicalEditor({ namespace: EDITOR_NAMESPACE });

  const onError: Parameters<typeof LexicalComposer>['0']['initialConfig']['onError'] = (error, editor) => {
    console.log(`%ceditorError`, `color: #fff; background-color: #f57716; font-weight: bold;`);
    console.log('----');
    console.log(`%c${error}`, `color: #fff; background-color: #f57716;`);
    console.log('----');
  };

  useEffect(() => {
    let removeRootListener: CleanupCommand = null;

    if (!editable) return;
    if (!editor) return;

    removeRootListener = editor.registerRootListener((root, prevRoot) => {
      const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          editor.getEditorState().read(() => {
            const root = $getRoot();

            const lastChild = root.getLastChild();

            if (lastChild) {
              const key = lastChild.getKey();

              const targetElement = editor.getElementByKey(key);
              targetElement?.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      };

      root?.addEventListener('keydown', handleEnter);
      prevRoot?.removeEventListener('keydown', handleEnter);
    });

    return () => {
      if (removeRootListener) {
        removeRootListener();
      }
    };
  }, [editor, editable]);

  return (
    <div className="mt-5">
      <div className="relative box-border flex min-h-[500px] w-full shrink-0 flex-col border-2 border-[#eee] bg-white">
        <LexicalEditor
          config={{
            namespace: EDITOR_NAMESPACE,
            theme: {
              root: 'overflow-y-visible outline-none caret-black box-border pb-1 px-1 bg-white',
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
        />
      </div>
    </div>
  );
}

export default TripleANoticeEditor;
