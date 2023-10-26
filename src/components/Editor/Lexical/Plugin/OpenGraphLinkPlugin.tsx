'use client';

import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $getSelection,
  $isRangeSelection,
  COMMAND_PRIORITY_CRITICAL,
  KEY_ARROW_DOWN_COMMAND,
  KEY_ARROW_LEFT_COMMAND,
  KEY_ARROW_RIGHT_COMMAND,
  KEY_ARROW_UP_COMMAND,
  KEY_BACKSPACE_COMMAND,
  LexicalEditor,
} from 'lexical';
import { mergeRegister } from '@lexical/utils';
import {
  type OpenGraphLinkNodeCommandPayload,
  INSERT_OPENGRAPH_LINKNODE_COMMAND,
  $createOpenGraphLinkNode,
} from '../Nodes/OpenGraphLinkNode';
import { type CleanupCommand } from '../LexicalEditor';
import { DecoratorOpenGraphLinkNodeKeyboardUtil } from '../util/keyboard';

export function OpenGraphLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  const $addOpenGraphLink = useCallback(({ url, title, ogImage, description }: OpenGraphLinkNodeCommandPayload) => {
    const selection = $getSelection();

    const openGraphLinkNode = $createOpenGraphLinkNode({
      url,
      title,
      ogImage,
      description,
    });

    if ($isRangeSelection(selection)) {
      selection.anchor.getNode().insertBefore(openGraphLinkNode);
    }
  }, []);

  useEffect(() => {
    let cleanupOpenGraphLinkNodeCommand: CleanupCommand = null;
    let mergedKeyboardCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      if (editor._commands.get(INSERT_OPENGRAPH_LINKNODE_COMMAND)) return;
      // command 등록
      cleanupOpenGraphLinkNodeCommand = editor.registerCommand(
        INSERT_OPENGRAPH_LINKNODE_COMMAND,
        (payload, newEditor) => {
          $addOpenGraphLink(payload);

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );

      const keyboardHandler = (e: KeyboardEvent, editor: LexicalEditor) => {
        const selection = $getSelection();

        const isHandled = DecoratorOpenGraphLinkNodeKeyboardUtil.handleKeyboard({ e, editor, selection });

        if (isHandled === true) {
          /*
            - 기본 등록된 키 커맨드의 기본 동작 취소
            - 하지 않을 경우 핸들러에서 이전 이후 선택 이후 
              기본 등록된 키 커맨드가 중복되어
              이전의 이전, 이후의 이후로 선택된다.
          */
          e.preventDefault();
        }

        return isHandled;
      };

      mergedKeyboardCommand = mergeRegister(
        editor.registerCommand(KEY_BACKSPACE_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_LEFT_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_RIGHT_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_UP_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
        editor.registerCommand(KEY_ARROW_DOWN_COMMAND, keyboardHandler, COMMAND_PRIORITY_CRITICAL),
      );
    }

    return () => {
      if (cleanupOpenGraphLinkNodeCommand) {
        cleanupOpenGraphLinkNodeCommand();
      }

      if (mergedKeyboardCommand) {
        mergedKeyboardCommand();
      }
    };
  }, [editor, $addOpenGraphLink]);

  return null;
}
