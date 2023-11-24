import { GridSelection, LexicalEditor, LexicalNode, NodeSelection, RangeSelection } from 'lexical';
import { $isLinkNode, LinkNode } from '@lexical/link';
import { ListNode, ListItemNode, $isListNode, $isListItemNode } from '@lexical/list';
import { ImageNode } from '../Nodes/ImageNode';
import { $filter } from '@lexical/utils';
import { FindByLexicalEditor } from './editorStateRead';
import { UPDATE_TOOLBAR_COMMAND } from '../Plugin';
import { COMMAND_EMPTY_PAYLOAD } from '@/constants/editor';

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

export const enum TOOLBAR_ELEMENT_ID {
  TOOLBAR = 'editor-toolbar',
  SUB_TOOLBAR = 'editor-sub-toolbar',
}

export const enum NODE_DATASET_NAME {
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

export function getListItemNodeFromSelection({
  type,
  selection,
}: { type: ListNode['__tag'] } & FindAtSelectionPayload) {
  if (!selection) return null;

  const targetListItemNodes = $filter<ListItemNode>(selection.getNodes(), (node) => {
    if ($isListItemNode(node)) {
      const parent = node.getParent();

      return $isListNode(parent) && parent.__tag === type ? node : null;
    }

    const parent = node.getParent();
    if ($isListItemNode(parent)) {
      const ancestor = parent.getParent();

      return $isListNode(ancestor) && ancestor.__tag === type ? parent : null;
    }

    return null;
  });

  return targetListItemNodes.length ? targetListItemNodes : null;
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
  const { findNodeByKey } = FindByLexicalEditor.getInstance({ editor });

  const activedImageNode = document.querySelector(
    `[data-${NODE_DATASET_NAME.NODE_TYPE}="${ImageNode.getType()}"].active`,
  );

  if (activedImageNode) {
    const key = (activedImageNode as HTMLElement).dataset[NODE_DATASET_NAME.CAMEL_CASE_KEY];

    if (key) {
      const result = findNodeByKey<ImageNode>(key).transform((node) => ({
        has: true,
        node,
      }));

      return result ?? { has: false };
    }

    return { has: false };
  }

  return { has: false };
}

export function updateToolbar({ editor }: { editor: LexicalEditor }) {
  editor.dispatchCommand(UPDATE_TOOLBAR_COMMAND, COMMAND_EMPTY_PAYLOAD);
}
