'use client';

import React, { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { HistoryToolbar, FontToolbar } from '../../Toolbar';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, SELECTION_CHANGE_COMMAND } from 'lexical';
import { EditorDialogContextProvider } from '@/context/EditorDialogContext';
import { type CleanupCommand } from '../LexicalEditor';
import {
  FONT_BACKGROUND_COLOR_COMMAND,
  FONT_COLOR_COMMAND,
  FONT_SIZE_COMMAND,
  IS_BOLD_COMMAND,
  IS_ITALIC_COMMAND,
  IS_LINK_COMMAND,
  IS_UNOREDERED_LIST_COMMAND,
  IS_OREDERED_LIST_COMMAND,
} from '../Command/toolbarCommands';
import { $isLinkNode } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { $getSelectionStyleValueForProperty } from '@lexical/selection';
import { AlignNames } from '../../Toolbar/ToolbarIcons';
import ListToolbar from '../../Toolbar/ListToolbar';

export type TOOLBAR_FONT_SIZE = '12px' | '14px' | '16px';

export const TOOLBAR_DEFAULT_FONT_COLOR = '#000';
export const TOOLBAR_DEFAULT_BACKGROUND_COLOR = '#fff';
export const TOOLBAR_DEFAULT_FONT_SIZE: TOOLBAR_FONT_SIZE = '16px';
export const FONT_SIZE_OPTIONS: TOOLBAR_FONT_SIZE[] = ['12px', '14px', '16px'];
export const ALIGN_OPTIONS: AlignNames[] = ['AlignLeft', 'AlignCenter', 'AlignRight'];

function ToolbarPlugin() {
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

          editor.dispatchCommand(FONT_COLOR_COMMAND, {
            color: $getSelectionStyleValueForProperty(selection, 'color', TOOLBAR_DEFAULT_FONT_COLOR),
          });
          editor.dispatchCommand(FONT_BACKGROUND_COLOR_COMMAND, {
            color: $getSelectionStyleValueForProperty(selection, 'background-color', TOOLBAR_DEFAULT_BACKGROUND_COLOR),
          });
          editor.dispatchCommand(FONT_SIZE_COMMAND, {
            fontSize: $getSelectionStyleValueForProperty(
              selection,
              'font-size',
              TOOLBAR_DEFAULT_FONT_SIZE,
            ) as TOOLBAR_FONT_SIZE,
          });

          const satisfiedListNode = selection
            .getNodes()
            .filter((node) => $isListNode(node.getTopLevelElement()))
            ?.map((node) => node.getTopLevelElement());
          editor.dispatchCommand(
            IS_UNOREDERED_LIST_COMMAND,
            !!satisfiedListNode?.find((node) => (node as ListNode).getTag() === 'ul'),
          );
          editor.dispatchCommand(
            IS_OREDERED_LIST_COMMAND,
            !!satisfiedListNode?.find((node) => (node as ListNode).getTag() === 'ol'),
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
    <div className="z-[1] box-border flex w-full items-center gap-2 overflow-auto border-b-2 border-b-[#eee] bg-white px-2 pb-2 pt-1 scrollbar-thin">
      <HistoryToolbar />
      <ListToolbar />
      <EditorDialogContextProvider>
        <FontToolbar />
      </EditorDialogContextProvider>
    </div>
  ) : null;
}

export default ToolbarPlugin;
