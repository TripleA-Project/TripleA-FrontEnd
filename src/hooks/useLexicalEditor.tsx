'use client';

import { useCallback, useEffect, useState } from 'react';
import { $getRoot, $isParagraphNode, LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { EDITOR_CONTENT_CASE } from '@/constants/editor';

type ContentType = 'JSON' | 'HTML';

type EditorRootElement = (HTMLElement & { __lexicalEditor?: LexicalEditor }) | null;

interface UseLexicalEditorOption {
  namespace: string;
}

export function useLexicalEditor({ namespace }: UseLexicalEditorOption) {
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);
  const [editor, setEditor] = useState<LexicalEditor | null>(null);

  const getRoot = ({ namespace }: Pick<UseLexicalEditorOption, 'namespace'>) => {
    return document.querySelector(`[data-lexical-editor="true"][data-lexical-namespace="${namespace}"]`);
  };

  const updateState = () => {
    const targetRootElement = getRoot({ namespace });
    const targetEditor = (targetRootElement as EditorRootElement | null)?.__lexicalEditor ?? null;

    setRootElement(targetRootElement as HTMLElement);
    setEditor(targetEditor);
  };

  const contentIsEmpty = useCallback(() => {
    if (!editor) return EDITOR_CONTENT_CASE.EMPTY;

    let isEmpty: Boolean = EDITOR_CONTENT_CASE.NON_EMPTY;

    editor.getEditorState().read(() => {
      const root = $getRoot();

      const children = root.getChildren();

      if (children.length === 1) {
        const lastDescendantNode = root.getLastDescendant();

        if ($isParagraphNode(lastDescendantNode) && !root.getTextContent()) {
          isEmpty = EDITOR_CONTENT_CASE.EMPTY;
        }
      }
    });

    return isEmpty;
  }, [editor]);

  const getEditorContent = useCallback(
    (format: ContentType = 'JSON') => {
      if (!editor || contentIsEmpty()) return EDITOR_CONTENT_CASE.EMPTY_VALUE;

      let content = '';

      editor.getEditorState().read(() => {
        switch (format) {
          case 'JSON':
            content = JSON.stringify(editor.toJSON().editorState);
            break;
          case 'HTML':
            content = $generateHtmlFromNodes(editor);
            break;
        }
      });

      return content;
    },
    [editor, contentIsEmpty],
  );

  useEffect(() => {
    updateState();
  }, [namespace]); /* eslint-disable-line */

  return {
    rootElement,
    editor,
    getEditorContent,
    contentIsEmpty,
  };
}
