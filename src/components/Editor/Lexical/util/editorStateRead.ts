import { $getNodeByKey, LexicalEditor, LexicalNode } from 'lexical';

interface ConfigOption {
  editor: LexicalEditor;
}

interface FindNodeResult<T extends LexicalNode = LexicalNode> {
  node: T | null;
  transform<V = any>(callback: (node: T) => V): V | null;
}

export class FindByLexicalEditor {
  private static instanceWeakMap: WeakMap<LexicalEditor, FindByLexicalEditor> = new WeakMap();
  private editor: LexicalEditor;

  private constructor({ editor }: ConfigOption) {
    this.editor = editor;
    this.findNodeByKey = this.findNodeByKey.bind(this);

    FindByLexicalEditor.instanceWeakMap.set(editor, this);
  }

  static getInstance({ editor }: { editor: LexicalEditor }) {
    const targetInstance = FindByLexicalEditor.instanceWeakMap.get(editor);

    if (targetInstance) {
      return targetInstance;
    }

    const instance = new FindByLexicalEditor({ editor });
    FindByLexicalEditor.instanceWeakMap.set(editor, instance);

    return instance;
  }

  findNodeByKey<T extends LexicalNode = LexicalNode>(nodeKey: string): FindNodeResult<T> {
    const targetNode = this.editor.getEditorState().read<T | null>(() => {
      return $getNodeByKey<T>(nodeKey);
    });

    return {
      node: targetNode,
      transform(callback) {
        if (!this.node) return null;

        return callback(this.node);
      },
    };
  }
}
