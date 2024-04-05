'use client';

import { OpenGraphLinkNode } from '../../../Nodes/OpenGraphLinkNode';
import { OpenGraphLinkAlignToolbar } from '@/components/Editor/Toolbar';
import { TOOLBAR_ELEMENT_ID } from '../../../util/toolbar';

import Toolbar from '../Toolbar';

export interface OpenGraphSubToolbarPayload {
  node: OpenGraphLinkNode;
}

interface OpenGraphLinkSubToolbarProps {
  node: OpenGraphLinkNode;
}

export function OpenGraphLinkSubToolbar({ node }: OpenGraphLinkSubToolbarProps) {
  return (
    <Toolbar.GroupWrapper id={TOOLBAR_ELEMENT_ID.SUB_TOOLBAR}>
      <div className="flex items-center gap-1">
        <OpenGraphLinkAlignToolbar node={node} />
      </div>
    </Toolbar.GroupWrapper>
  );
}
