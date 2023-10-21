'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey } from 'lexical';
import { LinkNode } from '@lexical/link';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { BsPencilSquare } from 'react-icons/bs';
import { toastNotify } from '@/util/toastNotify';

export interface LinkDialogProps {
  linkNodeKey: string;
}

interface DialogPositionState {
  left: number;
  top: number;
  overflow: 'left' | 'right' | null;
}

export const LINK_INITIAL_URL = 'https://';

function LinkDialog({ linkNodeKey }: LinkDialogProps) {
  const [editor] = useLexicalComposerContext();

  const [linkUrl, setLinkUrl] = useState(LINK_INITIAL_URL);
  const [isEdit, setIsEdit] = useState(false);
  const [pos, setPos] = useState<DialogPositionState>({
    left: 0,
    top: 0,
    overflow: null,
  });

  const originLinkUrlRef = useRef('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function correctHorizonPos() {
    if (pos.overflow === 'right') return { right: '16px' };

    return { left: pos.left + 'px' };
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLinkUrl((prev) => e.target.value);
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isEdit) {
      setIsEdit(true);

      inputRef.current?.focus();

      return;
    }

    if (inputRef.current && originLinkUrlRef.current === inputRef.current.value) {
      toastNotify('error', '동일한 url입니다');

      return;
    }

    editor.update(() => {
      if (inputRef.current) {
        const node = $getNodeByKey(linkNodeKey) as LinkNode;

        node.setURL(inputRef.current.value);

        setIsEdit(false);
      }
    });
  }

  useLayoutEffect(() => {
    if (editor.isEditable()) {
      editor.getEditorState().read(() => {
        const node = $getNodeByKey(linkNodeKey) as LinkNode;
        const element = editor.getElementByKey(linkNodeKey);

        originLinkUrlRef.current = node.getURL();
        setLinkUrl(node.getURL());

        if (element) {
          const rect = element.getBoundingClientRect();

          setPos({
            left: rect.left,
            top: rect.top,
            overflow: null,
          });
        }
      });
    }

    return () => {
      setIsEdit(false);
    };
  }, [linkNodeKey, editor]);

  useLayoutEffect(() => {
    if (dialogRef.current) {
      if (pos.left + 16 + dialogRef.current.clientWidth >= document.body.clientWidth) {
        setPos((prev) => ({ ...prev, overflow: 'right' }));
      }
    }
  }, [pos.left]);

  return (
    <div
      ref={dialogRef}
      className="fixed box-border w-max translate-y-full border border-blue-200 bg-white"
      style={{
        ...correctHorizonPos(),
        top: `${pos.top}px`,
      }}
    >
      <div className="flex justify-between">
        <input
          ref={inputRef}
          className={`box-border w-40 px-1 py-0.5 text-xs font-bold ${
            !isEdit ? 'underline underline-offset-2' : 'no-underline'
          } outline-none`}
          value={linkUrl}
          readOnly={!isEdit}
          spellCheck="false"
          onChange={handleChange}
        />
        <button className="shrink-0 p-0.5" onClick={handleClick}>
          {isEdit ? <AiOutlineCheckSquare /> : <BsPencilSquare />}
        </button>
      </div>
    </div>
  );
}

export default LinkDialog;
