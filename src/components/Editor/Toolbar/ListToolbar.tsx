'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { insertList, ListNode, ListItemNode, $isListNode, $isListItemNode } from '@lexical/list';
import {
  $getSelection,
  COMMAND_PRIORITY_EDITOR,
  LexicalEditor,
  $isRangeSelection,
  $createParagraphNode,
  ElementNode,
  LexicalNode,
  RangeSelection,
  createCommand,
} from 'lexical';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
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

      if ($isRangeSelection(selection)) {
        switch (type) {
          case 'unorderedList':
            const unorderedListItemNodeChildList = getUnOrderedListItemNodeChildFromRangeSelection(selection);

            if (unorderedListItemNodeChildList) {
              unorderedListItemNodeChildList.forEach((node) => {
                const listItemNode = node.getParent() as ListItemNode;
                // const listNode = listItemNode.getParent() as ListNode;

                const paragraph = $createParagraphNode();

                append(paragraph, listItemNode.getChildren());
                listItemNode.insertAfter(paragraph);

                listItemNode.remove();
              });
            }

            break;
          case 'orderedList':
            const orderedListItemNodeChildList = getOrderedListItemNodeChildFromRangeSelection(selection);

            if (orderedListItemNodeChildList) {
              orderedListItemNodeChildList.forEach((node) => {
                const listItemNode = node.getParent() as ListItemNode;
                // const listNode = listItemNode.getParent() as ListNode;

                const paragraph = $createParagraphNode();

                append(paragraph, listItemNode.getChildren());
                listItemNode.insertAfter(paragraph);

                listItemNode.remove();
              });

              return;
            }

            break;
        }
      }
    });

    function getOrderedListItemNodeChildFromRangeSelection(selection: RangeSelection) {
      const orderedListItemNodeChildList = selection
        .getNodes()
        .filter(
          (node) =>
            $isListItemNode(node.getParent()) &&
            ((node.getParent() as ListItemNode).getParent() as ListNode).getTag() === 'ol',
        );

      return orderedListItemNodeChildList.length ? orderedListItemNodeChildList : null;
    }

    function getUnOrderedListItemNodeChildFromRangeSelection(selection: RangeSelection) {
      const unorderedListItemNodeChildList = selection
        .getNodes()
        .filter(
          (node) =>
            $isListItemNode(node.getParent()) &&
            ((node.getParent() as ListItemNode).getParent() as ListNode).getTag() === 'ul',
        );

      return unorderedListItemNodeChildList.length ? unorderedListItemNodeChildList : null;
    }
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
