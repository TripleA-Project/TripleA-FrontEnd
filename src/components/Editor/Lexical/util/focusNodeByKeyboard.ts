import {
  $isRangeSelection,
  GridSelection,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  $isNodeSelection,
  $setSelection,
  LexicalNode,
} from 'lexical';
import { $isAtNodeEnd } from '@lexical/selection';
import { OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';
import { ImageNode } from '../Nodes/ImageNode';

type EditorSelection = RangeSelection | NodeSelection | GridSelection | null;

type AllowedNodeType = ImageNode | OpenGraphLinkNode;

interface HandleKeyboardPayload {
  e: KeyboardEvent;
  editor: LexicalEditor;
  selection: EditorSelection;
}

enum KEY {
  'BACKSPACE' = 'Backspace',
  'DELETE' = 'Delete',
  'ARROW_LEFT' = 'ArrowLeft',
  'ARROW_RIGHT' = 'ArrowRight',
  'ARROW_UP' = 'ArrowUp',
  'ARROW_DOWN' = 'ArrowDown',
}

export class FocusNodeKeyboardUtil {
  static allowedNode = [OpenGraphLinkNode, ImageNode];
  static allowedType = [OpenGraphLinkNode.getType(), ImageNode.getType()];

  static canRegisterEvent(editor: LexicalEditor) {
    return this.allowedNode.some((node) => editor.hasNode(node));
  }

  static handleKeyboard({ e, editor, selection }: HandleKeyboardPayload) {
    /* rangeSelection */
    if ($isRangeSelection(selection)) {
      if (e.shiftKey) return false;

      let allowedNode: AllowedNodeType | null = null;

      switch (e.key) {
        case KEY.DELETE:
          break;
        case KEY.BACKSPACE:
        case KEY.ARROW_LEFT:
          allowedNode = this.getNearestPrevAllowedNode(selection);
          break;
        case KEY.ARROW_RIGHT:
          allowedNode = this.getNearestNextAllowedNode(selection);
          break;
        case KEY.ARROW_DOWN:
          allowedNode = this.getNextLineAllowedNode(selection);
          break;
        case KEY.ARROW_UP:
          allowedNode = this.getPrevLineAllowedNode(selection);
          break;
      }

      if (!allowedNode) return false;

      editor.update(() => {
        allowedNode!.setIsActive(true);

        $setSelection(allowedNode!.createSelfNodeSelection());
      });

      return true;
    }

    /* nodeSelection */
    if ($isNodeSelection(selection)) {
      console.log('nodeSelection');
      const allowedNode = selection.getNodes().find((node) => this.isAllowedNode(node)) as AllowedNodeType | undefined;

      if (allowedNode) {
        switch (e.key) {
          case KEY.BACKSPACE:
          case KEY.DELETE:
            allowedNode.selectPrevious();
            allowedNode.remove();

            return true;
          case KEY.ARROW_LEFT:
          case KEY.ARROW_UP:
            allowedNode.setIsActive(false);
            allowedNode.selectPrevious();

            const prevNode = allowedNode.getPreviousSibling();
            if (this.isAllowedNode(prevNode)) {
              prevNode.setIsActive(true);
              $setSelection(prevNode.createSelfNodeSelection());
            }

            return true;
          case KEY.ARROW_RIGHT:
          case KEY.ARROW_DOWN:
            allowedNode.setIsActive(false);
            allowedNode.selectNext();

            const nextNode = allowedNode.getNextSibling();
            if (this.isAllowedNode(nextNode)) {
              nextNode.setIsActive(true);
              $setSelection(nextNode.createSelfNodeSelection());
            }

            return true;
        }
      }

      return false;
    }

    return false;
  }

  private static isAllowedNode(node: LexicalNode | null | undefined): node is AllowedNodeType {
    return this.allowedType.includes(node?.getType() ?? '');
  }

  private static getSelectionPointNode(selection: RangeSelection) {
    const isBackward = selection.isBackward();

    return {
      anchor: isBackward ? selection.focus : selection.anchor,
      focus: isBackward ? selection.anchor : selection.focus,
    };
  }

  private static getNearestPrevAllowedNode(selection: EditorSelection) {
    if ($isRangeSelection(selection)) {
      const { anchor } = this.getSelectionPointNode(selection);

      // 현재 라인 시작에서만 트리거
      if (anchor.offset !== 0) return null;

      return this.getPrevLineAllowedNode(selection);
    }

    return null;
  }

  private static getPrevLineAllowedNode(selection: EditorSelection) {
    if ($isRangeSelection(selection)) {
      const { anchor } = this.getSelectionPointNode(selection);

      const anchorNode = anchor.getNode();

      const compareTargetNode = anchorNode.getTopLevelElement();

      const prevSlibingNode = compareTargetNode?.getPreviousSibling();

      return prevSlibingNode && this.isAllowedNode(prevSlibingNode) ? prevSlibingNode : null;
    }

    return null;
  }

  private static getNearestNextAllowedNode(selection: EditorSelection) {
    if ($isRangeSelection(selection)) {
      const { focus } = this.getSelectionPointNode(selection);

      if (!$isAtNodeEnd(focus)) return null;

      const focusNode = focus.getNode();

      // 현재 라인 마지막 노드에서만 트리거
      const topElementLastDescendant = focusNode.getTopLevelElement()?.getLastDescendant();

      // 콘텐츠가 없는 라인 ( <br> )
      if (topElementLastDescendant === null) {
        const nextSiblingNode = focusNode.getNextSibling();

        return nextSiblingNode && this.isAllowedNode(nextSiblingNode) ? nextSiblingNode : null;
      }

      // 노드의 끝은 맞지만
      // 라인 마지막 노드의 끝이 아님
      if (focusNode !== topElementLastDescendant) return null;

      return this.getNextLineAllowedNode(selection);
    }

    return null;
  }

  private static getNextLineAllowedNode(selection: EditorSelection) {
    if ($isRangeSelection(selection)) {
      const { focus } = this.getSelectionPointNode(selection);

      const focusNode = focus.getNode();

      const compareTargetNode = focusNode.getTopLevelElement();

      const nextSlibingNode = compareTargetNode?.getNextSibling();

      return nextSlibingNode && this.isAllowedNode(nextSlibingNode) ? nextSlibingNode : null;
    }

    return null;
  }
}
