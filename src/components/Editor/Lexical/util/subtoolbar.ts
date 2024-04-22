import { LexicalEditor, LexicalNode } from 'lexical';
import { SUB_TOOLBAR_COMMAND, SubToolbarPayload, SubToolbarType } from '../Component/ToolbarUI/SubToolbar';
import { LinkNode } from '@lexical/link';
import {
  CHANGE_IMAGE_NODE_ALIGN,
  CHANGE_IMAGE_RESIZE_FORMAT,
  ImageNode,
  RESIZED_IMAGE_COMMAND,
} from '../Nodes/ImageNode';
import { CHANGE_OPENGRAPHLINK_NODE_ALIGN, OpenGraphLinkNode } from '../Nodes/OpenGraphLinkNode';

interface SubToolbarActiveUtilFn<T extends LexicalNode> {
  active({ node, editor }: { node: T; editor: LexicalEditor }): void;
  unActive({ editor }: { editor: LexicalEditor }): void;
}

interface SubToolbarActiveUtilFunctions {
  link: SubToolbarActiveUtilFn<LinkNode>;
  openGraphLink: SubToolbarActiveUtilFn<OpenGraphLinkNode>;
  image: SubToolbarActiveUtilFn<ImageNode>;
}

class SubToolbarActiveUtil {
  private fn: SubToolbarActiveUtilFunctions;

  constructor() {
    this.fn = {
      link: {
        active: ({ node, editor }) => {
          this.activeSubToolbar({ type: 'link', payload: { link: { url: node.getURL(), node } }, editor });
        },
        unActive: ({ editor }) => {
          this.unActiveSubToolbar({ type: 'link', editor });
        },
      },
      openGraphLink: {
        active: ({ node, editor }) => {
          const nodeKey = node.getKey();

          this.activeSubToolbar({ type: 'openGraphLink', payload: { openGraphLink: { node } }, editor });

          editor.dispatchCommand(CHANGE_OPENGRAPHLINK_NODE_ALIGN, {
            nodeKey,
            align: node.getAlign(),
          });
        },
        unActive: ({ editor }) => {
          this.unActiveSubToolbar({ type: 'openGraphLink', editor });
        },
      },
      image: {
        active: ({ node, editor }) => {
          const nodeKey = node.getKey();

          this.activeSubToolbar({ type: 'image', payload: { image: { node } }, editor });

          editor.dispatchCommand(RESIZED_IMAGE_COMMAND, {
            nodeKey,
            ...node.getSize(),
          });
          editor.dispatchCommand(CHANGE_IMAGE_NODE_ALIGN, {
            nodeKey,
            align: node.getAlign(),
          });
          editor.dispatchCommand(CHANGE_IMAGE_RESIZE_FORMAT, {
            nodeKey,
            resizeFormat: node.getResizeFormat(),
          });
        },
        unActive: ({ editor }) => {
          this.unActiveSubToolbar({ type: 'image', editor });
        },
      },
    };
  }

  use<K extends SubToolbarType>(key: K): SubToolbarActiveUtilFunctions[K] {
    return this.fn[key];
  }

  private activeSubToolbar({
    type,
    payload,
    editor,
  }: {
    type: SubToolbarType;
    payload: SubToolbarPayload;
    editor: LexicalEditor;
  }): void {
    editor.dispatchCommand(SUB_TOOLBAR_COMMAND, {
      open: true,
      payload: {
        type,
        ...payload,
      },
    });
  }

  private unActiveSubToolbar({ type, editor }: { type: SubToolbarType; editor: LexicalEditor }): void {
    editor.dispatchCommand(SUB_TOOLBAR_COMMAND, {
      open: false,
      payload: {
        type,
      },
    });
  }
}

export const subToolbarActiveUtil = new SubToolbarActiveUtil();
