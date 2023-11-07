'use client';

import React, { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_EDITOR,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  KEY_DELETE_COMMAND,
  LexicalEditor,
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
import { SUB_TOOLBAR_COMMAND, SubToolbar } from '../Component/ToolbarUI/SubToolbar';
import { FocusNodeKeyboardUtil } from '../util/focusNodeByKeyboard';
import { mergeRegister } from '@lexical/utils';
import {
  DATASET_NAME_FOR_HANDLE,
  dispatchSubToolbarCommand,
  hasActivedImage,
  selectionHasLink,
  selectionHasList,
} from '../util/toolbar';
import type { CleanupCommand } from '../LexicalEditor';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    const { has: hasLink, node: linkNode } = selectionHasLink({ selection });
    const { has: hasImage, node: imageNode } = hasActivedImage({ editor });
    editor.dispatchCommand(IS_LINK_COMMAND, hasLink);
    dispatchSubToolbarCommand(editor, {
      linkPayload: { hasLink, linkNode },
      imagePayload: { hasImage, imageNode },
    });

    const { hasUnorderedList, hasOrderedList } = selectionHasList({ selection });
    editor.dispatchCommand(IS_UNOREDERED_LIST_COMMAND, hasUnorderedList);
    editor.dispatchCommand(IS_OREDERED_LIST_COMMAND, hasOrderedList);

    editor.dispatchCommand(IS_BOLD_COMMAND, $isRangeSelection(selection) ? selection.hasFormat('bold') : false);
    editor.dispatchCommand(IS_ITALIC_COMMAND, $isRangeSelection(selection) ? selection.hasFormat('italic') : false);
  }, [editor]);

  useEffect(() => {
    let cleanupSelectionChangeCommand: CleanupCommand = null;
    let cleanupMergedKeyboardCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    // mouse event
    const handleFocusOutNode = (e: MouseEvent) => {
      const toolbar = editor.getRootElement()!.parentElement!.previousElementSibling!;
      const target = e.target as HTMLElement;
      const activeNode = document.querySelector(`[data-${DATASET_NAME_FOR_HANDLE.NODE_TYPE}].active`);

      if (activeNode && !activeNode?.contains(target) && !toolbar.contains(target)) {
        editor.update(() => {
          const key = (activeNode as HTMLElement).dataset[DATASET_NAME_FOR_HANDLE.CAMEL_CASE_KEY];
          const node = $getNodeByKey(key!);

          if (node?.setIsActive) {
            node.setIsActive(false, editor);
          }

          editor.dispatchCommand(SUB_TOOLBAR_COMMAND, { open: false });
        });
      }
    };

    document.addEventListener('click', handleFocusOutNode);

    // command
    cleanupSelectionChangeCommand = editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload) => {
        $updateToolbar();

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    if (FocusNodeKeyboardUtil.canRegisterEvent(editor)) {
      const keyboardHandler = (e: KeyboardEvent, editor: LexicalEditor) => {
        const selection = $getSelection();

        const isHandled = FocusNodeKeyboardUtil.handleKeyboard({ e, editor, selection });
        if (isHandled === true) {
          e.preventDefault();
        }

        return isHandled;
      };
      cleanupMergedKeyboardCommand = mergeRegister(
        editor.registerCommand(KEY_BACKSPACE_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_DELETE_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_LEFT_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_UP_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_DOWN_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
      );
    }

    return () => {
      document.removeEventListener('click', handleFocusOutNode);

      if (cleanupSelectionChangeCommand) {
        cleanupSelectionChangeCommand();
      }

      if (cleanupMergedKeyboardCommand) {
        cleanupMergedKeyboardCommand();
      }
    };
  }, [editor, $updateToolbar]);

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
