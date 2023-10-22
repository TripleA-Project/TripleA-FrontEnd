'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { insertList, removeList } from '@lexical/list';
import { twMerge } from 'tailwind-merge';
import { IS_UNOREDERED_LIST_COMMAND, IS_OREDERED_LIST_COMMAND } from '../Lexical/Command/toolbarCommands';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';
import { ToolbarIcons } from './ToolbarIcons';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

export type ListToolbarNames = 'UnOrderedList' | 'OrderedList';

function ListToolbar() {
  const [editor] = useLexicalComposerContext();

  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  const buttonWrapperClassNames = {
    base: `shrink-0 p-1 align-top hover:bg-gray-100`,
    active: `bg-blue-50`,
    get UnorderedList() {
      return twMerge([this.base, isUnorderedList && this.active]);
    },
    get OrderedList() {
      return twMerge([this.base], isOrderedList && this.active);
    },
  };

  const unorderedList = (e: React.MouseEvent) => {
    editor.update(() => {
      isUnorderedList ? removeList(editor) : insertList(editor, 'bullet');
    });
  };

  const orderedList = (e: React.MouseEvent) => {
    editor.update(() => {
      isOrderedList ? removeList(editor) : insertList(editor, 'number');
    });
  };

  useEffect(() => {
    let cleanupUnorderedListCommand: CleanupCommand = null;
    let cleanupOrderedListCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupUnorderedListCommand = editor.registerCommand(
        IS_UNOREDERED_LIST_COMMAND,
        (payload, editor) => {
          setIsUnorderedList(payload);

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );

      cleanupOrderedListCommand = editor.registerCommand(
        IS_OREDERED_LIST_COMMAND,
        (payload, editor) => {
          setIsOrderedList(payload);

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );
    }

    return () => {
      if (cleanupUnorderedListCommand) {
        cleanupUnorderedListCommand();
      }
      if (cleanupOrderedListCommand) {
        cleanupOrderedListCommand();
      }
    };
  }, [editor]);

  return (
    <div className="inline-flex items-center gap-1 align-top">
      <button className={buttonWrapperClassNames.UnorderedList} onClick={unorderedList}>
        <ToolbarIcons.UnOrderedList active={isUnorderedList} className="translate-y-[1px]" />
      </button>
      <button className={buttonWrapperClassNames.OrderedList} onClick={orderedList}>
        <ToolbarIcons.OrderedList active={isOrderedList} className="translate-y-[1px]" />
      </button>
    </div>
  );
}

export default ListToolbar;
