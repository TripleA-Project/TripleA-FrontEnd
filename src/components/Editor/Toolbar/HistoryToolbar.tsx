'use client';

import React, { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/lexicalComposerContext';
import { CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL, REDO_COMMAND, UNDO_COMMAND } from 'lexical';
import { ToolbarIcons } from './ToolbarIcons';

export type HistoryToolbarNames = 'Undo' | 'Redo';

function HistoryToolbar() {
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
    <div className="inline-flex items-center gap-1">
      <button className="shrink-0 p-1 hover:bg-gray-100" title="실행 취소(ctrl + z)" onClick={undo}>
        <ToolbarIcons.Undo active={canUndo} />
      </button>
      <button className="shrink-0 p-1 hover:bg-gray-100" title="실행 복원(ctrl + x)" onClick={redo}>
        <ToolbarIcons.Redo active={canRedo} />
      </button>
    </div>
  );
}

export default HistoryToolbar;
