'use client';

import { FindByLexicalEditor } from '@/components/Editor/Lexical/util/editorStateRead';
import { LexicalEditor } from 'lexical';
import { useState } from 'react';

interface UseFindLexicalEditor {
  editor: LexicalEditor;
}

export function useFindByLexicalEditor({ editor }: UseFindLexicalEditor) {
  const [finder] = useState(() => FindByLexicalEditor.getInstance({ editor }));

  return {
    findNodeByKey: finder.findNodeByKey,
  };
}
