'use client';

import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isParagraphNode,
  $isRangeSelection,
  $isTextNode,
  COMMAND_PRIORITY_EDITOR,
  SELECTION_CHANGE_COMMAND,
} from 'lexical';
import Toolbar from '../Component/ToolbarUI/Toolbar';
import {
  HistoryToolbar,
  FontToolbar,
  ListToolbar,
  LinkToolbar,
  ImageToolbar,
  IS_UNOREDERED_LIST_COMMAND,
  IS_OREDERED_LIST_COMMAND,
  IS_BOLD_COMMAND,
  IS_ITALIC_COMMAND,
  IS_LINK_COMMAND,
} from '../../Toolbar';
import { EditorDialogContextProvider } from '@/context/EditorDialogContext';
import { $isLinkNode } from '@lexical/link';
import { $isListItemNode, ListNode, ListItemNode } from '@lexical/list';
import type { AlignNames } from '../../Toolbar/ToolbarIcons';
import type { CleanupCommand } from '../LexicalEditor';
import { SubToolbar } from '../Component/ToolbarUI/SubToolbar';

export const ALIGN_OPTIONS: AlignNames[] = ['AlignLeft', 'AlignCenter', 'AlignRight'];

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let cleanupSelectionChangeCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupSelectionChangeCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, editor) => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(IS_BOLD_COMMAND, selection.hasFormat('bold'));
          editor.dispatchCommand(IS_ITALIC_COMMAND, selection.hasFormat('italic'));

          const satisfiedLinkNode = selection.getNodes().find((node) => $isLinkNode(node.getParent()));
          editor.dispatchCommand(IS_LINK_COMMAND, {
            active: !!satisfiedLinkNode,
            nodeKey: satisfiedLinkNode?.getParent()?.getKey(),
          });

          const satisfiedListNode = selection
            .getNodes()
            .filter((node) => $isListItemNode(node.getParent()) || $isListItemNode(node))
            ?.map((node) => {
              const targetItemNode = $isListItemNode(node.getParent())
                ? (node.getParent() as ListItemNode)
                : (node as ListItemNode);

              return targetItemNode;
            });

          editor.dispatchCommand(
            IS_UNOREDERED_LIST_COMMAND,
            !!satisfiedListNode?.find((node) => (node.getParent() as ListNode).getTag() === 'ul'),
          );
          editor.dispatchCommand(
            IS_OREDERED_LIST_COMMAND,
            !!satisfiedListNode?.find((node) => (node.getParent() as ListNode).getTag() === 'ol'),
          );
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupSelectionChangeCommand) {
        cleanupSelectionChangeCommand();
      }
    };
  }, [editor]);

  return editor.isEditable() ? (
    <div className="z-[1]">
      <Toolbar>
        <HistoryToolbar />
        <FontToolbar />
        <ListToolbar />
        <EditorDialogContextProvider>
          <LinkToolbar />
        </EditorDialogContextProvider>
        <ImageToolbar />
      </Toolbar>
      <SubToolbar />
    </div>
  ) : null;
}
