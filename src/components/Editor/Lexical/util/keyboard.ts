import {
  $isRangeSelection,
  GridSelection,
  LexicalEditor,
  NodeSelection,
  RangeSelection,
  $isNodeSelection,
  $setSelection,
  $createNodeSelection,
} from 'lexical';
import { $isOpenGraphLinkNode, OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';
import { $isAtNodeEnd } from '@lexical/selection';

type EditorSelectionType = RangeSelection | NodeSelection | GridSelection | null;

interface HandleKeyboardPayload {
  e: KeyboardEvent;
  editor: LexicalEditor;
  selection: EditorSelectionType;
}

enum KEY {
  'BACKSPACE' = 'Backspace',
  'ARROW_LEFT' = 'ArrowLeft',
  'ARROW_RIGHT' = 'ArrowRight',
  'ARROW_UP' = 'ArrowUp',
  'ARROW_DOWN' = 'ArrowDown',
}

export class DecoratorOpenGraphLinkNodeKeyboardUtil {
  static typeChecker = $isOpenGraphLinkNode;

  static handleKeyboard({ e, editor, selection }: HandleKeyboardPayload) {
    if ($isRangeSelection(selection)) {
      /*
        focus 해야되는 경우 직접 openGraphLinkNode에 대한 
        node selection을 설정 
        -> 기존 커맨드가 실행되어야 되는지에 대한 boolean 결과 반환
        (미리 설정된 기본 커맨드로 모든 경우에 대응하기 어려움)
      */

      let openGraphLinkNode: OpenGraphLinkNode | null = null;
      let nodeSelection: NodeSelection | null = null;

      const offset = selection.anchor.offset;

      switch (e.key) {
        case KEY.BACKSPACE:
          openGraphLinkNode = this.getPrevOpenGraphLinkNodeFromRangeSelection(selection);

          if (!openGraphLinkNode) return false;
          if (offset !== 0) return false;

          break;
        case KEY.ARROW_RIGHT:
          openGraphLinkNode = this.getNextOpenGraphLinkNodeFromRangeSelection(selection);

          if (!openGraphLinkNode) return false;
          if (!$isAtNodeEnd(selection.anchor)) return false;

          break;
        case KEY.ARROW_DOWN:
          openGraphLinkNode = this.getNextOpenGraphLinkNodeFromRangeSelection(selection);

          if (!openGraphLinkNode) {
            return false;
          }

          break;
        case KEY.ARROW_LEFT:
          openGraphLinkNode = this.getPrevOpenGraphLinkNodeFromRangeSelection(selection);

          if (!openGraphLinkNode) return false;
          if (offset !== 0) return false;

          break;
        case KEY.ARROW_UP:
          openGraphLinkNode = this.getPrevOpenGraphLinkNodeFromRangeSelection(selection);

          if (!openGraphLinkNode) return false;

          break;
      }

      if (!openGraphLinkNode) {
        return false;
      }

      openGraphLinkNode.setIsActive(true, editor);

      nodeSelection = $createNodeSelection();
      nodeSelection.add(openGraphLinkNode.getKey());

      $setSelection(nodeSelection);

      return true;
    }

    if ($isNodeSelection(selection)) {
      // focus 된 경우 처리
      const openGraphLinkNode = selection.getNodes().find((node) => this.typeChecker(node)) as
        | OpenGraphLinkNode
        | undefined;
      const isOpenGraphLinkNodeFocused = openGraphLinkNode
        ? this.isFocusEditorOpengraphLinkElement({ editor, node: openGraphLinkNode })
        : false;

      switch (e.key) {
        case KEY.BACKSPACE:
          if (openGraphLinkNode && isOpenGraphLinkNodeFocused) {
            openGraphLinkNode.remove();

            return true;
          }

          return false;
        case KEY.ARROW_RIGHT:
        case KEY.ARROW_DOWN:
          if (openGraphLinkNode && isOpenGraphLinkNodeFocused) {
            const nextSlibing = openGraphLinkNode.getNextSibling();

            if (nextSlibing && this.typeChecker(nextSlibing)) {
              openGraphLinkNode.setIsActive(false, editor);
              nextSlibing.setIsActive(true, editor);

              const nodeSelection = $createNodeSelection();
              nodeSelection.add(nextSlibing.getKey());

              $setSelection(nodeSelection);

              return true;
            }

            openGraphLinkNode.setIsActive(false, editor);
            openGraphLinkNode.selectNext();

            return true;
          }

          return false;
        case KEY.ARROW_LEFT:
        case KEY.ARROW_UP:
          if (openGraphLinkNode && isOpenGraphLinkNodeFocused) {
            const prevSlibing = openGraphLinkNode.getPreviousSibling();

            if (prevSlibing && this.typeChecker(prevSlibing)) {
              openGraphLinkNode.setIsActive(false, editor);
              prevSlibing.setIsActive(true, editor);

              const nodeSelection = $createNodeSelection();
              nodeSelection.add(prevSlibing.getKey());

              $setSelection(nodeSelection);

              return true;
            }

            openGraphLinkNode.setIsActive(false, editor);
            openGraphLinkNode.selectPrevious();

            return true;
          }

          return false;
      }

      return false;
    }

    return false;
  }

  private static getPrevOpenGraphLinkNodeFromRangeSelection(selection: RangeSelection) {
    const topLevelElement = selection.anchor.getNode().getTopLevelElement();

    if (!topLevelElement) return null;

    const topLevelElementPrevNode = topLevelElement.getPreviousSibling();

    if (this.typeChecker(topLevelElementPrevNode)) {
      return topLevelElementPrevNode;
    }

    return null;
  }

  private static getNextOpenGraphLinkNodeFromRangeSelection(selection: RangeSelection) {
    const topLevelElement = selection.anchor.getNode().getTopLevelElement();

    if (!topLevelElement) return null;

    const topLevelElementNextNode = topLevelElement.getNextSibling();

    if (this.typeChecker(topLevelElementNextNode)) {
      return topLevelElementNextNode;
    }

    return null;
  }

  private static getEditorOpengraphLinkElement({ editor, node }: { editor: LexicalEditor; node: OpenGraphLinkNode }) {
    return editor.getElementByKey(node.getKey())?.firstElementChild;
  }

  private static isFocusEditorOpengraphLinkElement({
    editor,
    node,
  }: {
    editor: LexicalEditor;
    node: OpenGraphLinkNode;
  }) {
    return node.getIsActive();
  }
}
