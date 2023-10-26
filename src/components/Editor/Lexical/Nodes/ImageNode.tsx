import type { ReactNode } from 'react';
import {
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

export type ArrangeImageType = 'inherit' | 'full-width' | 'full-page';

export type SerializedImageNode = SerializedLexicalNode & ImageNodeCommandPayload;

export interface ImageNodeCommandPayload {
  src: string;
  alt: string;
  width: number;
  height: number;
  arrange?: ArrangeImageType;
}

export class ImageNode extends DecoratorNode<ReactNode> {
  __src: string;
  __alt: string;
  __width: number;
  __height: number;
  __active: boolean;
  __arrange: ArrangeImageType;

  constructor({ src, alt, width, height, arrange = 'inherit' }: ImageNodeCommandPayload, key?: NodeKey) {
    super(key);

    this.__src = src;
    this.__alt = alt;
    this.__width = width;
    this.__height = height;

    this.__active = false;
    this.__arrange = arrange;
  }

  static getType(): string {
    return 'ImageNode';
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
      arrange: _serializedNode.arrange,
    });
  }

  exportJSON(): SerializedImageNode {
    return {
      type: this.getType(),
      version: 1,
      ...this.getPayload(),
    };
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    element.className = 'editor-image w-full box-border m-1';

    if (_editor.isEditable() && this.__active === true) {
      element.classList.add('active');
    }

    if (!_editor.isEditable()) {
      element.classList.add('view');
    }

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
    const targetArrange = this.getArrange();

    _dom.classList.remove('active');
    if (targetIsActive === true) _dom.classList.add('active');

    _dom.classList.remove('arrange__inherit', 'arrange__full-width', 'arrange__full-page');
    _dom.classList.add(`arrange__${targetArrange}`);

    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    return (
      <ImageComponent
        {...this.getPayload()}
        editor={editor}
        config={config}
        nodeKey={this.getKey()}
        active={this.getIsActive()}
      />
    );
  }

  getPayload() {
    return {
      src: this.__src,
      alt: this.__alt,
      width: this.__width,
      height: this.__height,
      arrange: this.__arrange,
    };
  }

  setPayload({ src, alt, width, height, arrange = 'inherit' }: ImageNodeCommandPayload) {
    const writable = this.getWritable();

    writable.__src = src;
    writable.__alt = alt;
    writable.__widht = width;
    writable.__height = height;
    writable.__arrange = arrange;
  }

  getIsActive() {
    return this.__active;
  }

  setIsActive(payload: boolean, editor: LexicalEditor) {
    const element = editor.getElementByKey(this.getKey());

    if (!element) return;

    const writable = this.getWritable();

    writable.__active = payload;
  }

  getArrange() {
    return this.__arrange;
  }

  setArrange(payload: ArrangeImageType, editor: LexicalEditor) {
    const element = editor.getElementByKey(this.getKey());

    if (!element) return;

    const writable = this.getWritable();

    writable.__arrange = payload;
  }
}

export const IMAGE_NODE_COMMAND_TYPE = 'insertImage';

export const INSERT_IMAGE_COMMAND = createCommand<ImageNodeCommandPayload>(IMAGE_NODE_COMMAND_TYPE);

export function $createImageNode(payload: ImageNodeCommandPayload) {
  const imageNode = new ImageNode({ ...payload });

  return imageNode;
}

export function $isImageNode(node: LexicalNode | null | undefined): node is ImageNode {
  return node instanceof ImageNode;
}
