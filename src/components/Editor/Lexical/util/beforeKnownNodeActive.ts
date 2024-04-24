import { $getNodeByKey } from 'lexical';
import { NODE_DATASET_NAME } from './toolbar';
import { ImageNode } from '../Nodes/ImageNode';
import { OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';

export type KnownNode = ImageNode | OpenGraphLinkNode;

function beforeKnownNodeActive({ compareTargetElement }: { compareTargetElement: HTMLElement }) {
  const allKnownActivedElements = document.querySelectorAll(`[data-${NODE_DATASET_NAME.NODE_TYPE}].active`);

  if (allKnownActivedElements.length) {
    const nonTargetElement = Array.from(allKnownActivedElements).find((node) => !node.contains(compareTargetElement));
    if (nonTargetElement) {
      const key = (nonTargetElement as HTMLElement).dataset[NODE_DATASET_NAME.CAMEL_CASE_KEY];
      if (key) {
        const nonTargetKnownNode = $getNodeByKey(key) as KnownNode;

        nonTargetKnownNode.setIsActive(false);
      }
    }
  }
}

export default beforeKnownNodeActive;
