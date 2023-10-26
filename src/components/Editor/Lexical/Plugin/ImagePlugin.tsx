'use client';

import { useEffect } from 'react';
import { $applyNodeReplacement, $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createImageNode, INSERT_IMAGE_COMMAND, ImageNode } from '../Nodes/ImageNode';
import type { CleanupCommand } from '../LexicalEditor';

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    let cleanupImageCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupImageCommand = editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload, editor) => {
          const selection = $getSelection();

          console.log({ selection, payload });

          if ($isRangeSelection(selection)) {
            const imageNode = $createImageNode(payload);

            selection.anchor.getNode().insertBefore(imageNode);
          }

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );
    }

    return () => {
      if (cleanupImageCommand) {
        cleanupImageCommand();
      }
    };
  }, [editor]);

  return null;
}
