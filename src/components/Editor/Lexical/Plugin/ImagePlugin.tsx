'use client';

import { useCallback, useEffect } from 'react';
import { $getNodeByKey, $getSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  $createImageNode,
  CHANGE_IMAGE_NODE_ALIGN,
  CHANGE_IMAGE_RESIZE_FORMAT,
  INSERT_IMAGE_COMMAND,
  ImageNode,
  ImageNodeCommandPayload,
  RESIZED_IMAGE_COMMAND,
} from '../Nodes/ImageNode';
import $insertDecoratorNode from '../util/insertDecoratorNode';
import type { CleanupCommand } from '../LexicalEditor';

export function ImagePlugin() {
  const [editor] = useLexicalComposerContext();

  const $addImage = useCallback(({ src, alt, width, height }: ImageNodeCommandPayload) => {
    const imageNode = $createImageNode({ src, alt, width, height });

    const selection = $getSelection();

    $insertDecoratorNode({ node: imageNode, selection });

    return false;
  }, []);

  useEffect(() => {
    let cleanupImageCommand: CleanupCommand = null;
    let removeImageNodeMutationListener: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupImageCommand = editor.registerCommand(
        INSERT_IMAGE_COMMAND,
        (payload) => {
          $addImage(payload);

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );

      removeImageNodeMutationListener = editor.registerMutationListener(ImageNode, (mutatedNodes) => {
        for (let [key, mutate] of Array.from(mutatedNodes.entries())) {
          editor.getEditorState().read(() => {
            console.log('image', { mutate });
            if (mutate === 'updated') {
              const imageNode = $getNodeByKey(key) as ImageNode;

              editor.dispatchCommand(RESIZED_IMAGE_COMMAND, {
                nodeKey: key,
                ...imageNode.getSize(),
              });
              editor.dispatchCommand(CHANGE_IMAGE_NODE_ALIGN, {
                nodeKey: key,
                align: imageNode.getAlign(),
              });
              editor.dispatchCommand(CHANGE_IMAGE_RESIZE_FORMAT, {
                nodeKey: key,
                resizeFormat: imageNode.getResizeFormat(),
              });
            }
          });
        }
      });
    }

    return () => {
      if (cleanupImageCommand) {
        cleanupImageCommand();
      }
      if (removeImageNodeMutationListener) {
        removeImageNodeMutationListener();
      }
    };
  }, [editor, $addImage]);

  return null;
}
