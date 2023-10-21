'use client';

import React, { useCallback, useEffect, useRef } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { twMerge } from 'tailwind-merge';
import {
  FONT_SIZE_OPTIONS,
  TOOLBAR_DEFAULT_FONT_SIZE,
  type TOOLBAR_FONT_SIZE,
} from '../../Lexical/Plugin/ToolbarPlugin';
import { FONT_SIZE_COMMAND } from '../../Lexical/Command/toolbarCommands';
import { type CleanupCommand } from '../../Lexical/LexicalEditor';

interface FontSizeDropDownProps {
  onSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

function FontSizeDropDown({ className, onSelect }: FontSizeDropDownProps) {
  const [editor] = useLexicalComposerContext();

  const selectRef = useRef<HTMLSelectElement>(null);

  const classNames = twMerge([`bg-white`, className]);

  const fontSizeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void = useCallback(
    (e) => {
      editor.update(() => {
        const targetFontSize = e.target.value as TOOLBAR_FONT_SIZE;

        const selectedSelection = $getSelection();

        if ($isRangeSelection(selectedSelection)) {
          $patchStyleText(selectedSelection, {
            'font-size': targetFontSize,
          });
        }
      });
    },
    [editor],
  );

  useEffect(() => {
    let cleanupFontSizeCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    editor.registerCommand(
      FONT_SIZE_COMMAND,
      ({ fontSize }, editor) => {
        if (selectRef?.current) {
          selectRef.current.value = fontSize;
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupFontSizeCommand) {
        cleanupFontSizeCommand();
      }
    };
  }, [editor]);

  return (
    <select
      ref={selectRef}
      defaultValue={TOOLBAR_DEFAULT_FONT_SIZE}
      className={classNames}
      onChange={onSelect || fontSizeHandler}
    >
      {FONT_SIZE_OPTIONS.map((fontSize) => (
        <option key={fontSize} value={fontSize} style={{ fontSize }}>
          {fontSize}
        </option>
      ))}
    </select>
  );
}

export default FontSizeDropDown;
