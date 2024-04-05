import type { ReactNode } from 'react';
import {
  $createNodeSelection,
  DOMExportOutput,
  DecoratorNode,
  EditorConfig,
  LexicalEditor,
  LexicalNode,
  NodeKey,
  SerializedLexicalNode,
  createCommand,
} from 'lexical';
import ImageComponent from '../Component/Image/ImageComponent';
import { NODE_DATASET_NAME } from '../util/toolbar';

export type ImageResizeFormat = 'full-width' | null;

export type SerializedImageNode = SerializedLexicalNode & Omit<ImageNodeCommandPayload, 'active'>;

export type ImageNodeAlign = 'start' | 'center' | 'end';

export interface ImageNodeCommandPayload {
  src: string;
  alt: string;
  width: number;
  height: number;
  active?: boolean;
  align?: ImageNodeAlign;
}

interface ResizedImageCommandPayload {
  nodeKey: string;
  width: number;
  height: number;
}

export interface ChangeImageNodeAlignCommandPayload {
  nodeKey: string;
  align: ImageNodeAlign;
}

interface ChangeImageResizeFormatCommandPayload {
  nodeKey: string;
  resizeFormat: ImageResizeFormat;
}

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __alt: string;
  __width: number;
  __height: number;
  __active: boolean;
  __align: ImageNodeAlign;
  __resizeFormat: ImageResizeFormat;

  maxSize: { width: number; height: number };
  ratio: {
    width: number;
    height: number;
  };

  constructor({ src, alt, width, height, active, align = 'start' }: ImageNodeCommandPayload, key?: NodeKey) {
    super(key);

    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__height = height;

    this.__active = active ?? false;

    this.__align = align;

    this.maxSize = {
      width: ImageNode.MAX_WIDTH,
      height: Number((ImageNode.MAX_WIDTH * (height / width)).toFixed(0)),
    };

    this.ratio = {
      width: width / height,
      height: height / width,
    };

    this.__resizeFormat = null;
  }

  static MAX_WIDTH = 725;

  static getType(): string {
    return 'imageNode';
  }

  static clone(node: ImageNode): ImageNode {
    return new ImageNode({ ...node.getPayload() });
  }

  static importJSON(_serializedNode: SerializedImageNode): ImageNode {
    return new ImageNode({
      src: _serializedNode.src,
      alt: _serializedNode.alt,
      width: _serializedNode.width,
      height: _serializedNode.height,
      align: _serializedNode.align,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: this.getType(),
      version: 1,
      ...this.getJSONPayload(),
    };
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    element.className = 'editor-image w-full max-w-[725px] flex box-border';

    if (_editor.isEditable()) {
      element.dataset[NODE_DATASET_NAME.CAMEL_CASE_NODE_TYPE] = this.getType();
      element.dataset[NODE_DATASET_NAME.CAMEL_CASE_KEY] = this.__key;
      if (this.getIsActive() === true) {
        element.classList.add('active');
      }
    }

    if (!_editor.isEditable()) {
      element.classList.add('view');
    }

    element.classList.add(this.getAlign());

    return element;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = editor.getElementByKey(this.getKey());

    return {
      element,
    };
  }

  updateDOM(_prevNode: ImageNode, _dom: HTMLElement, _config: EditorConfig): boolean {
    const targetIsActive = this.getIsActive();
    const targetResizeFormat = this.getResizeFormat();
    const targetAlign = this.getAlign();

    _dom.classList.remove('active');
    if (targetIsActive === true) _dom.classList.add('active');

    _dom.classList.remove('resize__full-width');
    if (targetResizeFormat) {
      _dom.classList.add(`resize__${targetResizeFormat}`);
    }

    _dom.classList.remove('start', 'center', 'end');
    _dom.classList.add(targetAlign);

    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    return <ImageComponent {...this.getPayload()} editor={editor} config={config} nodeKey={this.getKey()} />;
  }

  getPayload() {
    return {
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      height: this.__height,
      active: this.__active,
      align: this.__align,
    };
  }

  getJSONPayload() {
    return {
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      height: this.__height,
      align: this.__align,
    };
  }

  getLockAspectRatioSize({ target, size }: { target: 'width' | 'height'; size: number }) {
    switch (target) {
      case 'width':
        return Number((size * this.ratio.width).toFixed(0));
      case 'height':
        return Number((size * this.ratio.height).toFixed(0));
    }
  }

  getSize() {
    return { width: this.__width, height: this.__height };
  }

  setSize({ width, height }: { width: number; height: number }) {
    const writable = this.getWritable();

    writable.__width = width;
    writable.__height = height;
  }

  getIsActive() {
    return this.__active;
  }

  setIsActive(payload: boolean) {
    const writable = this.getWritable();

    writable.__active = payload;
  }

  getAlign() {
    return this.__align;
  }

  setAlign(align: ImageNodeAlign) {
    const writable = this.getWritable();

    writable.__align = align;
  }

  getResizeFormat(): ImageResizeFormat {
    return this.__resizeFormat ?? null;
  }

  setResizeFormat(payload: ImageResizeFormat) {
    const writable = this.getWritable();

    const { width: maxWidth, height: maxHeight } = this.maxSize;

    if (payload === 'full-width') {
      writable.__resizeFormat = payload;
      writable.__width = maxWidth;
      writable.__height = maxHeight;
    }
  }

  createSelfNodeSelection() {
    const nodeSelection = $createNodeSelection();
    nodeSelection.add(this.getKey());

    return nodeSelection;
  }
}

export const INSERT_IMAGE_COMMAND = createCommand<ImageNodeCommandPayload>('insertImage');
export const RESIZED_IMAGE_COMMAND = createCommand<ResizedImageCommandPayload>('resizedImage');
export const CHANGE_IMAGE_NODE_ALIGN = createCommand<ChangeImageNodeAlignCommandPayload>('changeImageNodeAlign');
export const CHANGE_IMAGE_RESIZE_FORMAT =
  createCommand<ChangeImageResizeFormatCommandPayload>('changeImageResizeFormat');

export function $createImageNode(payload: ImageNodeCommandPayload) {
  const imageNode = new ImageNode({ ...payload });

  return imageNode;
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
