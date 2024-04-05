'use client';

import { useCallback, useEffect } from 'react';
import { $getNodeByKey, $getSelection, COMMAND_PRIORITY_EDITOR, LexicalEditor, createCommand } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createImageNode, INSERT_IMAGE_COMMAND, ImageNode, ImageNodeCommandPayload } from '../Nodes/ImageNode';
import $insertDecoratorNode from '../util/insertDecoratorNode';
import { subToolbarActiveUtil } from '../util/subtoolbar';
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
        let activeImageNode: ImageNode | null = null;

        for (let [key, mutate] of Array.from(mutatedNodes.entries())) {
          editor.getEditorState().read(() => {
            const imageNode = $getNodeByKey(key) as ImageNode;
            const isActive = imageNode?.getIsActive();

            switch (mutate) {
              case 'created':
              case 'updated':
                if (isActive) {
                  activeImageNode = imageNode;
                }

                break;
              case 'destroyed':
                break;
            }
          });
        }

        (activeImageNode as ImageNode | null)
          ? subToolbarActiveUtil.use('image').active({ node: activeImageNode!, editor })
          : subToolbarActiveUtil.use('image').unActive({ editor });
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
