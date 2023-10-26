import { $getRoot, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { $isOpenGraphLinkNode, OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';
import { $isLinkNode } from '@lexical/link';
import { IS_LINK_COMMAND } from '../../Toolbar';

interface RequiredTargetElementPayload {
  target: HTMLElement;
  editor: LexicalEditor;
}

export class EditorInActiveUtil {
  static typeChecker = {
    linkNode: $isLinkNode,
    openGraphLinkNode: $isOpenGraphLinkNode,
  };

  // linkNode
  static inActiveLinkNode({ target, editor }: RequiredTargetElementPayload) {
    const shouldActiveLink = this.getShouldLinkActive({ target, editor });

    if (!shouldActiveLink) {
      editor.dispatchCommand(IS_LINK_COMMAND, { active: false, nodeKey: '' });

      return true;
    }

    return false;
  }

  private static getShouldLinkActive({ target, editor }: RequiredTargetElementPayload) {
    let result: boolean | undefined;

    editor.getEditorState().read(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        const node = selection.getNodes().find((node) => this.typeChecker.linkNode(node.getParent()));

        if (node) {
          if (!editor.getRootElement()?.contains(target)) {
            result = false;

            return;
          }

          result = true;

          return;
        }
      }

      result = false;
    });

    return !!result;
  }

  // openGraphLinkNode
  static inActiveOpenGraphLinkNode({ target, editor }: RequiredTargetElementPayload) {
    const activedOpenGraphLinkNode = this.getActiveOpenGraphLinkNode(editor);

    if (activedOpenGraphLinkNode) {
      const openGraphLinkElement = editor.getElementByKey(activedOpenGraphLinkNode.getKey());

      if (!openGraphLinkElement?.contains(target) && !target.closest('button')) {
        editor.update(() => {
          activedOpenGraphLinkNode.setIsActive(false, editor);
        });

        return true;
      }
    }

    return false;
  }

  private static getActiveOpenGraphLinkNode(editor: LexicalEditor) {
    let activedOpenGraphLinkNode: OpenGraphLinkNode | undefined;

    editor.getEditorState().read(() => {
      const root = $getRoot();
      const children = root.getChildren();

      activedOpenGraphLinkNode = children.find(
        (node) => this.typeChecker.openGraphLinkNode(node) && node.getIsActive() === true,
      ) as OpenGraphLinkNode | undefined;
    });

    return activedOpenGraphLinkNode;
  }
}
