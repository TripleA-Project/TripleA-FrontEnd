'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

function PlaceHolder() {
  const [editor] = useLexicalComposerContext();

  const placeHolderRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!placeHolderRef.current) return;

    const editorRootElement = editor.getRootElement();

    if (!editorRootElement) {
      if (!placeHolderRef.current.classList.contains('hidden')) {
        placeHolderRef.current.classList.add('hidden');
      }
      return;
    }

    const paddingTop = getComputedStyle(editorRootElement.parentElement!).paddingTop;
    const paddingLeft = getComputedStyle(editorRootElement).paddingLeft;

    placeHolderRef.current.style.cssText = `
      top: ${paddingTop};
      left: ${paddingLeft};
    `;

    placeHolderRef.current.classList.remove('hidden');
  }, [editor]);

  return (
    <div ref={placeHolderRef} className="pointer-events-none absolute hidden font-bold text-[#c9c8c7]">
      글을 작성해주세요
    </div>
  );
}

export default PlaceHolder;
