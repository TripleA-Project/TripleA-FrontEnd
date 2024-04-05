'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { insertList, ListItemNode } from '@lexical/list';
import {
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  createCommand,
} from 'lexical';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { getListItemNodeFromSelection } from '../Lexical/util/toolbar';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

export type ListToolbarNames = 'UnOrderedList' | 'OrderedList';

export type IsUnorderedListCommandPayload = boolean;
export type IsOrderedListCommandPayload = boolean;

export const IS_UNOREDERED_LIST_COMMAND = createCommand<IsUnorderedListCommandPayload>('isUnorderedList');
export const IS_OREDERED_LIST_COMMAND = createCommand<IsUnorderedListCommandPayload>('isOrderedList');

function append(node: ElementNode, nodesToAppend: Array<LexicalNode>) {
  node.splice(node.getChildrenSize(), 0, nodesToAppend);
}

export function ListToolbar() {
  const [editor] = useLexicalComposerContext();

  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

  const removeList = (type: 'orderedList' | 'unorderedList', editor: LexicalEditor) => {
    editor.update(() => {
      const selection = $getSelection();

      const tag = type === 'orderedList' ? 'ol' : 'ul';
      const targetListItems = getListItemNodeFromSelection({ type: tag, selection });

      const replaceListItemNode = (targetListItemNode: ListItemNode) => {
        const paragraph = $createParagraphNode();

        append(paragraph, targetListItemNode.getChildren());
        targetListItemNode.insertAfter(paragraph);

        targetListItemNode.remove();
      };

      if (targetListItems) {
        targetListItems.forEach((node) => {
          replaceListItemNode(node);
        });
      }
    });
  };

  const unorderedList = (e: React.MouseEvent) => {
    editor.update(() => {
      isUnorderedList ? removeList('unorderedList', editor) : insertList(editor, 'bullet');
    });
  };

  const orderedList = (e: React.MouseEvent) => {
    editor.update(() => {
      isOrderedList ? removeList('orderedList', editor) : insertList(editor, 'number');
    });
  };

  useEffect(() => {
    let cleanupUnorderedListCommand: CleanupCommand = null;
    let cleanupOrderedListCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupUnorderedListCommand = editor.registerCommand(
        IS_UNOREDERED_LIST_COMMAND,
        (payload) => {
          setIsUnorderedList(payload);

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );

      cleanupOrderedListCommand = editor.registerCommand(
        IS_OREDERED_LIST_COMMAND,
        (payload) => {
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
    <Toolbar.GroupWrapper>
      <Toolbar.Button
        active={isUnorderedList}
        icon={'UnOrderedList'}
        iconClassName={'translate-y-[1px]'}
        title={'순서없는 리스트(ul)'}
        onClick={unorderedList}
      />
      <Toolbar.Button
        active={isOrderedList}
        icon={'OrderedList'}
        iconClassName={'translate-y-[1px]'}
        title={'순서있는 리스트(ol)'}
        onClick={orderedList}
      />
    </Toolbar.GroupWrapper>
  );
}
