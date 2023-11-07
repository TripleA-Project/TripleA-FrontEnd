import { $isLinkNode, LinkNode } from '@lexical/link';
import { ListNode, $isListNode, $isListItemNode } from '@lexical/list';
import { $filter } from '@lexical/utils';
import { $getNodeByKey, GridSelection, LexicalEditor, LexicalNode, NodeSelection, RangeSelection } from 'lexical';
import { ImageNode, ImageNodeAlign } from '../Nodes/ImageNode';
import { SUB_TOOLBAR_COMMAND } from '../Component/ToolbarUI/SubToolbar';

type EditorSelection = RangeSelection | NodeSelection | GridSelection | null;

interface FindAtSelectionPayload {
  selection: EditorSelection;
}

interface FindAtDomPayload {
  editor: LexicalEditor;
}

interface FindResult<T = LexicalNode> {
  has: boolean;
  node?: T;
}

interface DispatchCommandPayload {
  linkPayload: {
    hasLink: FindResult<LinkNode>['has'];
    linkNode: FindResult<LinkNode>['node'];
  };
  imagePayload: {
    hasImage: FindResult<ImageNode>['has'];
    imageNode: FindResult<ImageNode>['node'];
  };
}

export enum DATASET_NAME_FOR_HANDLE {
  NODE_TYPE = 'lexical-node-type',
  CAMEL_CASE_NODE_TYPE = 'lexicalNodeType',
  KEY = 'lexical-key',
  CAMEL_CASE_KEY = 'lexicalKey',
}

export type ResizeWidth = 'FullWidth';

export function selectionHasList({ selection }: FindAtSelectionPayload): {
  hasUnorderedList: boolean;
  hasOrderedList: boolean;
} {
  if (selection) {
    const listNodes = $filter<ListNode>(selection.getNodes(), (node) => {
      if ($isListNode(node)) {
        return node;
      }
      if ($isListItemNode(node)) {
        return node.getParent();
      }
      if ($isListItemNode(node.getParent())) {
        return node.getParent()!.getParent();
      }

      return null;
    });

    if (listNodes.length) {
      return {
        hasUnorderedList: listNodes.some((node) => node.getTag() === 'ul'),
        hasOrderedList: listNodes.some((node) => node.getTag() === 'ol'),
      };
    }

    return {
      hasUnorderedList: false,
      hasOrderedList: false,
    };
  }

  return {
    hasUnorderedList: false,
    hasOrderedList: false,
  };
}

export function selectionHasLink({ selection }: FindAtSelectionPayload): FindResult<LinkNode> {
  if (selection) {
    const linkNodes = $filter(selection.getNodes(), (node) => {
      if ($isLinkNode(node)) {
        return node as LinkNode;
      }
      if ($isLinkNode(node.getParent())) {
        return node.getParent() as LinkNode;
      }

      return null;
    });

    if (linkNodes.length === 1) {
      return { has: true, node: linkNodes[0] };
    }

    return { has: false };
  }

  return { has: false };
}

export function hasActivedImage({ editor }: FindAtDomPayload): FindResult<ImageNode> {
  const activedImageNode = document.querySelector(
    `[data-${DATASET_NAME_FOR_HANDLE.NODE_TYPE}="${ImageNode.getType()}"].active`,
  );
  if (activedImageNode) {
    const key = (activedImageNode as HTMLElement).dataset[DATASET_NAME_FOR_HANDLE.CAMEL_CASE_KEY];

    if (key) {
      const hasActivedImageNodeResult: FindResult<ImageNode> = {
        has: true,
      };

      editor.getEditorState().read(() => {
        const activedImageNode = $getNodeByKey(key);

        hasActivedImageNodeResult.node = activedImageNode as ImageNode;
      });

      return hasActivedImageNodeResult;
    }

    return { has: false };
  }

  return { has: false };
}

export function dispatchSubToolbarCommand(
  editor: LexicalEditor,
  { linkPayload, imagePayload }: DispatchCommandPayload,
) {
  if (linkPayload.hasLink && linkPayload.linkNode) {
    editor.dispatchCommand(SUB_TOOLBAR_COMMAND, {
      open: true,
      payload: {
        link: {
          url: linkPayload.linkNode.getURL(),
          node: linkPayload.linkNode,
        },
      },
    });

    return;
  }

  if (imagePayload.hasImage && imagePayload.imageNode) {
    editor.dispatchCommand(SUB_TOOLBAR_COMMAND, {
      open: true,
      payload: {
        image: {
          node: imagePayload.imageNode,
        },
      },
    });

    return;
  }

  editor.dispatchCommand(SUB_TOOLBAR_COMMAND, {
    open: false,
  });
}
