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
  createCommand,
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
import { SubToolbar } from '../Component/ToolbarUI/SubToolbar';
import { mergeRegister } from '@lexical/utils';
import { NODE_DATASET_NAME, TOOLBAR_ELEMENT_ID, selectionHasLink, selectionHasList } from '../util/toolbar';
import { subToolbarActiveUtil } from '../util/subtoolbar';
import { FocusNodeKeyboardUtil } from '../util/focusNodeByKeyboard';
import type { CleanupCommand } from '../LexicalEditor';
import type { KnownNode } from '../util/beforeKnownNodeActive';

export function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();

    const { has: hasLink, node: linkNode } = selectionHasLink({ selection });
    hasLink
      ? subToolbarActiveUtil.use('link').active({ node: linkNode!, editor })
      : subToolbarActiveUtil.use('link').unActive({ editor });

    editor.dispatchCommand(IS_LINK_COMMAND, hasLink);

    const { hasUnorderedList, hasOrderedList } = selectionHasList({ selection });
    editor.dispatchCommand(IS_UNOREDERED_LIST_COMMAND, hasUnorderedList);
    editor.dispatchCommand(IS_OREDERED_LIST_COMMAND, hasOrderedList);

    editor.dispatchCommand(IS_BOLD_COMMAND, $isRangeSelection(selection) ? selection.hasFormat('bold') : false);
    editor.dispatchCommand(IS_ITALIC_COMMAND, $isRangeSelection(selection) ? selection.hasFormat('italic') : false);
  }, [editor]);

  useEffect(() => {
    let cleanupSelectionChangeCommand: CleanupCommand = null;
    let cleanupMergedKeyboardCommand: CleanupCommand = null;
    let cleanupUpdateToolbarCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    /*
      click event
      - 버블링 단계 이벤트
      - 노드(ImageNode, OpenGraphLinkNode)가 아닌 
        관련없는 다른 곳을 클릭했을 때
        포커스(active 상태) 되지 않도록 하는 것을
        전역적으로 적용하기 위함
      - 노드 자체에서 클릭이벤트 발생시
        beforeKnownNodeActive 유틸함수를 통해 
        1개의 노드만 active되도록 이벤트 수행
        (stopPropagation으로 인해 여기로 이벤트 전파되지 않음)
    */
    const handleFocusOutNode = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const activeNode = document.querySelector(`[data-${NODE_DATASET_NAME.NODE_TYPE}].active`);

      if (activeNode && !activeNode?.contains(target)) {
        const toolbarContainsTarget =
          target.closest(`#${TOOLBAR_ELEMENT_ID.TOOLBAR}`) || target.closest(`#${TOOLBAR_ELEMENT_ID.SUB_TOOLBAR}`);

        if (!toolbarContainsTarget) {
          editor.update(() => {
            const key = (activeNode as HTMLElement).dataset[NODE_DATASET_NAME.CAMEL_CASE_KEY];

            if (key) {
              const node = $getNodeByKey<KnownNode>(key)!;
              node.setIsActive(false);
            }
          });
        }
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

    cleanupUpdateToolbarCommand = editor.registerCommand(
      UPDATE_TOOLBAR_COMMAND,
      (payload) => {
        $updateToolbar();

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    if (FocusNodeKeyboardUtil.canRegisterEvent(editor)) {
      const keyboardHandler = (e: KeyboardEvent, editor: LexicalEditor) => {
        const selection = $getSelection();

        const isHandled = FocusNodeKeyboardUtil.handleKeyboard({ e, editor, selection });
        if (isHandled) {
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

      if (cleanupUpdateToolbarCommand) {
        cleanupUpdateToolbarCommand();
      }
    };
  }, [editor, $updateToolbar]);

  return editor.isEditable() ? (
    <div className="sticky top-[143px] z-toolbar border-t-2 border-[#eee] bg-white" id={TOOLBAR_ELEMENT_ID.TOOLBAR}>
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

export const UPDATE_TOOLBAR_COMMAND = createCommand('updateToolbar');
