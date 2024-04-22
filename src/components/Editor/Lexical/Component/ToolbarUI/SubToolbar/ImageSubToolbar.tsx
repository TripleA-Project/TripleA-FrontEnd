'use client';

import { ImageNode } from '../../../Nodes/ImageNode';
import Toolbar from '../Toolbar';
import { TOOLBAR_ELEMENT_ID } from '../../../util/toolbar';
import { VerticalLine } from '@/components/UI/DivideLine';
import { ImageAlignToolbar, ImageLockAspectResizeToolbar, ImageResizeFormatToolbar } from '@/components/Editor/Toolbar';

export interface ImageSubToolbarPayload {
  node: ImageNode;
}

interface ImageSubToolbarProps {
  node: ImageNode;
}

export function ImageSubToolbar({ node }: ImageSubToolbarProps) {
  return (
    <Toolbar.GroupWrapper id={TOOLBAR_ELEMENT_ID.SUB_TOOLBAR} className="shrink-0">
      <div className="flex items-center gap-1">
        <ImageAlignToolbar node={node} />
        <ImageResizeFormatToolbar node={node} />
        <VerticalLine style={{ width: '2px', height: '24px' }} />
        <ImageLockAspectResizeToolbar node={node} />
      </div>
    </Toolbar.GroupWrapper>
  );
}
