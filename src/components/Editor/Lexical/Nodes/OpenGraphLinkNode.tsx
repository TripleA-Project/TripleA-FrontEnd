import { type ReactNode } from 'react';
import {
  DecoratorNode,
  LexicalNode,
  LexicalEditor,
  createCommand,
  type NodeKey,
  type SerializedLexicalNode,
  type EditorConfig,
  type DOMExportOutput,
} from 'lexical';
import EditorOpenGraphLink from '../Component/OpenGraphLink/EditorOpenGraphLink';

export type OpenGraphLinkNodeAlign = 'start' | 'center' | 'end';

interface SerializedOpenGraphLinkNode extends SerializedLexicalNode {
  url: string;
  title?: string;
  ogImage?: string;
  description?: string;
  align: OpenGraphLinkNodeAlign;
}

export interface OpenGraphLinkNodeCommandPayload {
  url: string;
  title?: string;
  ogImage?: string;
  description?: string;
  align?: OpenGraphLinkNodeAlign;
}

export class OpenGraphLinkNode extends DecoratorNode<ReactNode> {
  __url: string;
  __title?: string;
  __ogImage?: string;
  __description?: string;
  __active: boolean;
  __align: OpenGraphLinkNodeAlign;

  constructor({ url, title, ogImage, description, align = 'start' }: OpenGraphLinkNodeCommandPayload, key?: NodeKey) {
    super(key);

    this.__url = url;
    this.__title = title;
    this.__ogImage = ogImage;
    this.__description = description;

    this.__active = false;
    this.__align = align;
  }

  static getType(): string {
    return 'openGraphLinkNode';
  }

  static clone(node: OpenGraphLinkNode): OpenGraphLinkNode {
    return new OpenGraphLinkNode({ ...node.getPayload() }, node.getKey());
  }

  static importJSON(_serializedNode: SerializedOpenGraphLinkNode): OpenGraphLinkNode {
    return new OpenGraphLinkNode({
      url: _serializedNode.url,
      title: _serializedNode.title,
      ogImage: _serializedNode.ogImage,
      description: _serializedNode.description,
      align: _serializedNode.align,
    });
  }

  exportJSON(): SerializedOpenGraphLinkNode {
    return {
      type: this.getType(),
      version: 1,
      ...this.getPayload(),
    };
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    element.className = `og-link box-border flex w-[calc(100%-16px)] select-none mx-2 mt-2 mb-[66px] ${this.getAlign()}`;

    if (_editor.isEditable() && this.__active === true) {
      element.classList.add('active');
    }

    if (!_editor.isEditable()) {
      element.classList.add('view');
    }

    return element;
  }

  exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = editor.getElementByKey(this.__key);

    return {
      element,
    };
  }

  updateDOM(_prevNode: OpenGraphLinkNode, _dom: HTMLElement, _config: EditorConfig): boolean {
    const targetIsActive = this.getIsActive();
    const targetAlign = this.getAlign();

    _dom.classList.remove('active');
    if (targetIsActive === true) _dom.classList.add('active');

    _dom.classList.remove('start', 'center', 'end');
    _dom.classList.add(targetAlign);

    return false;
  }

  decorate(editor: LexicalEditor, config: EditorConfig): ReactNode {
    return (
      <EditorOpenGraphLink
        editor={editor}
        config={config}
        nodeKey={this.getKey()}
        openGraph={{
          ...this.getPayload(),
        }}
        active={this.getIsActive()}
      />
    );
  }

  getPayload() {
    return {
      url: this.__url,
      title: this.__title,
      ogImage: this.__ogImage,
      description: this.__description,
      align: this.__align,
    };
  }

  setPayload({ url, title, ogImage, description, align = 'start' }: OpenGraphLinkNodeCommandPayload) {
    const writable = this.getWritable();

    writable.__url = url;
    writable.__title = title;
    writable.__ogImage = ogImage;
    writable.__description = description;
    writable.__align = align;
  }

  getIsActive() {
    return this.__active;
  }

  setIsActive(payload: boolean, editor: LexicalEditor) {
    const element = editor.getElementByKey(this.getKey());

    if (!element) return;

    const writable = this.getWritable();

    if (payload === true) {
      writable.__active = true;

      return;
    }

    writable.__active = false;
  }

  getAlign() {
    return this.__align;
  }

  setAlign(payload: OpenGraphLinkNodeAlign, editor: LexicalEditor) {
    const element = editor.getElementByKey(this.getKey());

    if (!element) return;

    const writable = this.getWritable();

    writable.__align = payload;
  }
}

export const OPENGRAPH_LINKNODE_COMMAND_TYPE = 'insertOpenGraphLinkNode';

export const INSERT_OPENGRAPH_LINKNODE_COMMAND = createCommand<OpenGraphLinkNodeCommandPayload>(
  OPENGRAPH_LINKNODE_COMMAND_TYPE,
);

export function $createOpenGraphLinkNode({ url, title, ogImage, description }: OpenGraphLinkNodeCommandPayload) {
  const openGraphLinkNode = new OpenGraphLinkNode({ url, title, ogImage, description });

  return openGraphLinkNode;
}

export function $isOpenGraphLinkNode(node: LexicalNode | null | undefined): node is OpenGraphLinkNode {
  return node instanceof OpenGraphLinkNode;
}
