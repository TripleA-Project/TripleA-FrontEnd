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
  $createNodeSelection,
} from 'lexical';
import EditorOpenGraphLink from '../Component/OpenGraphLink/EditorOpenGraphLink';
import { NODE_DATASET_NAME } from '../util/toolbar';

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
  active?: boolean;
}

export interface ChangeOpenGraphLinkNodeAlignCommandPayload {
  nodeKey: string;
  align: OpenGraphLinkNodeAlign;
}

export class OpenGraphLinkNode extends DecoratorNode<ReactNode> {
  __url: string;
  __title?: string;
  __ogImage?: string;
  __description?: string;
  __active: boolean;
  __align: OpenGraphLinkNodeAlign;

  constructor(
    { url, title, ogImage, description, align = 'start', active }: OpenGraphLinkNodeCommandPayload,
    key?: NodeKey,
  ) {
    super(key);

    this.__url = url;
    this.__title = title;
    this.__ogImage = ogImage;
    this.__description = description;

    this.__active = active ?? false;
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
      ...this.getJSONPayload(),
    };
  }

  createDOM(_config: EditorConfig, _editor: LexicalEditor): HTMLElement {
    const element = document.createElement('div');
    element.className = `og-link box-border flex w-[calc(100%-16px)] select-none mx-2 mt-2 mb-6 ${this.getAlign()}`;

    if (_editor.isEditable()) {
      element.dataset[NODE_DATASET_NAME.CAMEL_CASE_NODE_TYPE] = this.getType();
      element.dataset[NODE_DATASET_NAME.CAMEL_CASE_KEY] = this.__key;

      if (this.__active === true) {
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
      active: this.__active,
    };
  }

  getJSONPayload() {
    return {
      url: this.__url,
      title: this.__title,
      ogImage: this.__ogImage,
      description: this.__description,
      align: this.__align,
    };
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

  setAlign(payload: OpenGraphLinkNodeAlign) {
    const writable = this.getWritable();

    writable.__align = payload;
  }

  createSelfNodeSelection() {
    const nodeSelection = $createNodeSelection();
    nodeSelection.add(this.getKey());

    return nodeSelection;
  }
}

export const CHANGE_OPENGRAPHLINK_NODE_ALIGN =
  createCommand<ChangeOpenGraphLinkNodeAlignCommandPayload>('changeOpenGraphLinkNodeAlign');
export const INSERT_OPENGRAPH_LINKNODE_COMMAND =
  createCommand<OpenGraphLinkNodeCommandPayload>('insertOpenGraphLinkNode');

export function $createOpenGraphLinkNode({ url, title, ogImage, description }: OpenGraphLinkNodeCommandPayload) {
  const openGraphLinkNode = new OpenGraphLinkNode({ url, title, ogImage, description });

  return openGraphLinkNode;
}

export function $isOpenGraphLinkNode(node: LexicalNode | null | undefined): node is OpenGraphLinkNode {
  return node instanceof OpenGraphLinkNode;
}
