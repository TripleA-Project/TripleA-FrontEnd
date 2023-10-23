'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  insertList,
  removeList as removeAllListToTopLevel,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  ListItemNode,
  $isListNode,
  $isListItemNode,
} from '@lexical/list';
import { twMerge } from 'tailwind-merge';
import { IS_UNOREDERED_LIST_COMMAND, IS_OREDERED_LIST_COMMAND } from '../Lexical/Command/toolbarCommands';
import {
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  $isRangeSelection,
  $createParagraphNode,
  ElementNode,
  LexicalNode,
} from 'lexical';
import { ToolbarIcons } from './ToolbarIcons';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

export type ListToolbarNames = 'UnOrderedList' | 'OrderedList';

function append(node: ElementNode, nodesToAppend: Array<LexicalNode>) {
  node.splice(node.getChildrenSize(), 0, nodesToAppend);
}

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

  const removeList = (editor: LexicalEditor) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        /*
          const listItem = selection.anchor.getNode().getParent();

          const list = listItem?.getParent();

          if (list && $isListNode(list)) {
            const idx = list.getChildren().findIndex((childListItem) => listItem === childListItem);
            console.log({ idx });
            if (idx > -1) {
              const paragraph = $createParagraphNode();

              append(paragraph, listItem!.getChildren());

              listItem?.insertAfter(paragraph);

              listItem?.remove();
            }
          }
        */

        // orderedList 영역 찾고
        // 해당 부분 교체
        if (isOrderedList) {
          const orderedListItems = selection.getNodes().filter((node) => $isListItemNode(node.getParent()));

          orderedListItems?.forEach((node) => {
            const listItemNode = node.getParent() as ListItemNode;
            const listNode = listItemNode.getParent() as ListNode;

            const paragraph = $createParagraphNode();

            append(paragraph, listItemNode.getChildren());
            listItemNode.insertAfter(paragraph);

            listItemNode.remove();
          });
        }

        // unorderedList 영역 찾고
        // 해당 부분 교체

        // removeAllListToTopLevel(editor);
      }
    });
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
