import { $isRangeSelection, GridSelection, NodeSelection, RangeSelection } from 'lexical';
import { ImageNode } from '../Nodes/ImageNode';
import { OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';
import { $isAtNodeEnd } from '@lexical/selection';

function $insertDecoratorNode({
  node,
  selection,
}: {
  node: ImageNode | OpenGraphLinkNode;
  selection: RangeSelection | NodeSelection | GridSelection | null;
}) {
  if ($isRangeSelection(selection)) {
    const isCollapsed = selection.isCollapsed();
    const isBackward = selection.isBackward();

    const anchor = !isCollapsed && isBackward ? selection.focus : selection.anchor;
    const focus = !isCollapsed && isBackward ? selection.anchor : selection.focus;

    const isNotEmpty = !!focus.getNode().getTextContent().replaceAll(' ', '');

    selection.insertParagraph();
    selection.insertParagraph();

    const targetNode =
      isNotEmpty && !$isAtNodeEnd(focus)
        ? anchor.getNode().getParent()?.getPreviousSibling()
        : anchor.getNode().getPreviousSibling();

    if (targetNode) {
      targetNode.replace(node);
    }
  }
}

export default $insertDecoratorNode;
