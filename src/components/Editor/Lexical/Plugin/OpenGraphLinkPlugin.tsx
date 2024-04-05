'use client';

import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNodeByKey, $getSelection, COMMAND_PRIORITY_CRITICAL, LexicalEditor } from 'lexical';
import {
  type OpenGraphLinkNodeCommandPayload,
  INSERT_OPENGRAPH_LINKNODE_COMMAND,
  $createOpenGraphLinkNode,
  OpenGraphLinkNode,
} from '../Nodes/OpenGraphLinkNode';
import $insertDecoratorNode from '../util/insertDecoratorNode';
import { subToolbarActiveUtil } from '../util/subtoolbar';
import type { CleanupCommand } from '../LexicalEditor';

export function OpenGraphLinkPlugin() {
  const [editor] = useLexicalComposerContext();

  const $addOpenGraphLink = useCallback(({ url, title, ogImage, description }: OpenGraphLinkNodeCommandPayload) => {
    const openGraphLinkNode = $createOpenGraphLinkNode({
      url,
      title,
      ogImage,
      description,
    });

    const selection = $getSelection();

    $insertDecoratorNode({ node: openGraphLinkNode, selection });

    return false;
  }, []);

  useEffect(() => {
    let cleanupOpenGraphLinkNodeCommand: CleanupCommand = null;
    let removeOpenGraphLinkNodeMutationListener: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupOpenGraphLinkNodeCommand = editor.registerCommand(
        INSERT_OPENGRAPH_LINKNODE_COMMAND,
        (payload) => {
          $addOpenGraphLink(payload);

          return false;
        },
        COMMAND_PRIORITY_CRITICAL,
      );

      removeOpenGraphLinkNodeMutationListener = editor.registerMutationListener(OpenGraphLinkNode, (mutatedNodes) => {
        let activeOpenGraphLinkNode: OpenGraphLinkNode | null = null;

        for (let [key, mutate] of Array.from(mutatedNodes.entries())) {
          editor.getEditorState().read(() => {
            const openGraphLinkNode = $getNodeByKey(key) as OpenGraphLinkNode;
            const isActive = openGraphLinkNode?.getIsActive();

            switch (mutate) {
              case 'created':
              case 'updated':
                if (isActive) {
                  activeOpenGraphLinkNode = openGraphLinkNode;
                }

                break;
              case 'destroyed':
                break;
            }
          });
        }

        (activeOpenGraphLinkNode as OpenGraphLinkNode | null)
          ? subToolbarActiveUtil.use('openGraphLink').active({ node: activeOpenGraphLinkNode!, editor })
          : subToolbarActiveUtil.use('openGraphLink').unActive({ editor });
      });
    }

    return () => {
      if (cleanupOpenGraphLinkNodeCommand) {
        cleanupOpenGraphLinkNodeCommand();
      }
      if (removeOpenGraphLinkNodeMutationListener) {
        removeOpenGraphLinkNodeMutationListener();
      }
    };
  }, [editor, $addOpenGraphLink]);

  return null;
}
