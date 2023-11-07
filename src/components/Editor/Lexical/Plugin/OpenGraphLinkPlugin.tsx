'use client';

import { useCallback, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, COMMAND_PRIORITY_CRITICAL } from 'lexical';
import {
  type OpenGraphLinkNodeCommandPayload,
  INSERT_OPENGRAPH_LINKNODE_COMMAND,
  $createOpenGraphLinkNode,
} from '../Nodes/OpenGraphLinkNode';
import $insertDecoratorNode from '../util/insertDecoratorNode';
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
    }

    return () => {
      if (cleanupOpenGraphLinkNodeCommand) {
        cleanupOpenGraphLinkNodeCommand();
      }
    };
  }, [editor, $addOpenGraphLink]);

  return null;
}
