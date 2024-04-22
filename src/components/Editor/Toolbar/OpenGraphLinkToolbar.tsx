import { useCallback, useEffect, useState } from 'react';
import {
  CHANGE_OPENGRAPHLINK_NODE_ALIGN,
  ChangeOpenGraphLinkNodeAlignCommandPayload,
  OpenGraphLinkNode,
  OpenGraphLinkNodeAlign,
} from '../Lexical/Nodes/OpenGraphLinkNode';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { ComponentProps } from 'react';
import type { PickToolbarIconsKey } from './ToolbarIcons';
import { CleanupCommand } from '../Lexical/LexicalEditor';
import { COMMAND_PRIORITY_EDITOR } from 'lexical';

export function OpenGraphLinkAlignToolbar({ node }: { node: OpenGraphLinkNode }) {
  const [editor] = useLexicalComposerContext();

  const [align, setAlign] = useState<OpenGraphLinkNodeAlign>(node.getAlign());

  const ALIGN_OPTIONS: OpenGraphLinkNodeAlign[] = ['start', 'center', 'end'];

  function handleAlign(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const alignType = e.currentTarget.name as OpenGraphLinkNodeAlign;

    openGraphLinkNodeAlign(alignType);
  }

  function openGraphLinkNodeAlign(alignType: OpenGraphLinkNodeAlign) {
    editor.update(() => {
      node.setAlign(alignType);
    });

    setAlign(alignType);
  }

  const $updateAlign = useCallback(
    ({ nodeKey, align: targetAlign }: ChangeOpenGraphLinkNodeAlignCommandPayload) => {
      if (node.getKey() === nodeKey && align !== targetAlign) {
        setAlign(targetAlign);
      }
    },
    [node, align],
  );

  useEffect(() => {
    if (!editor.isEditable()) return;

    let cleanupChangeAlignCommand: CleanupCommand = null;

    cleanupChangeAlignCommand = editor.registerCommand(
      CHANGE_OPENGRAPHLINK_NODE_ALIGN,
      (payload) => {
        $updateAlign(payload);

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupChangeAlignCommand) {
        cleanupChangeAlignCommand();
      }
    };
  }, [editor, $updateAlign]);

  return (
    <div className="flex">
      {ALIGN_OPTIONS.map((alignOption) => {
        return (
          <Toolbar.Button
            key={`openGraphLinkNodeAlign-${alignOption}`}
            onClick={handleAlign}
            {...alignPropsFactory(alignOption, { align })}
          />
        );
      })}
    </div>
  );
}

function alignPropsFactory(
  alignType: OpenGraphLinkNodeAlign,
  { align }: { align: OpenGraphLinkNodeAlign },
): ComponentProps<typeof Toolbar.Button> {
  const {
    iconName,
    title,
  }: { iconName: PickToolbarIconsKey<'AlignLeft' | 'AlignCenter' | 'AlignRight'>; title: string } = ((
    alignType: OpenGraphLinkNodeAlign,
  ) => {
    switch (alignType) {
      case 'start':
        return {
          iconName: 'AlignLeft',
          title: '왼쪽 정렬',
        };
      case 'center':
        return {
          iconName: 'AlignCenter',
          title: '가운데 정렬',
        };
      case 'end':
        return {
          iconName: 'AlignRight',
          title: '오른쪽 정렬',
        };
    }
  })(alignType);

  return {
    name: alignType,
    active: align === alignType,
    title,
    icon: iconName,
    iconClassName: 'text-xs',
  };
}
