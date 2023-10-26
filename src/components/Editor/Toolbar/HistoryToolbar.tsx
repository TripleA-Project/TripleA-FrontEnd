'use client';

import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';

export type HistoryToolbarNames = 'Undo' | 'Redo';

export function HistoryToolbar() {
  const [editor] = useLexicalComposerContext();

  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const undo = () => {
    // @ts-ignore
    editor.dispatchCommand(UNDO_COMMAND);
  };

  const redo = () => {
    // @ts-ignore
    editor.dispatchCommand(REDO_COMMAND);
  };

  useEffect(() => {
    let cleanupCanUndoListener: (() => void) | null = null;
    let cleanupCanRedoListener: (() => void) | null = null;

    if (editor.isEditable()) {
      cleanupCanUndoListener = editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );

      cleanupCanRedoListener = editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );
    }

    return () => {
      if (cleanupCanUndoListener) {
        cleanupCanUndoListener();
      }

      if (cleanupCanRedoListener) {
        cleanupCanRedoListener();
      }
    };
  }, [editor]);

  return (
    <Toolbar.GroupWrapper>
      <Toolbar.Button
        active={canUndo}
        activeColor="#000"
        nonActiveColor="#C6C6C6"
        icon={'Undo'}
        title={'실행 취소(ctrl + z)'}
        onClick={undo}
      />
      <Toolbar.Button
        active={canRedo}
        activeColor="#000"
        nonActiveColor="#C6C6C6"
        icon={'Redo'}
        title={'실행 복원(ctrl + x)'}
        onClick={redo}
      />
    </Toolbar.GroupWrapper>
  );
}
