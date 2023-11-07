'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Toolbar from './Toolbar';
import { useCallback, useEffect, useState } from 'react';
import { CleanupCommand } from '../../LexicalEditor';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { LinkNode } from '@lexical/link';
import { ImageNode } from '../../Nodes/ImageNode';
import { ImageSubToolbar } from './SubToolbar/ImageSubToolbar';
import { LinkSubToolbar } from './SubToolbar/LinkSubToolbar';

type SubToolbarType = 'link' | 'image' | 'nonActive';

interface SubToolbarPayload {
  link?: {
    url: string;
    node: LinkNode;
  };
  image?: {
    node: ImageNode;
  };
}

interface SubToolbarCommandPayload {
  open: boolean;
  payload?: SubToolbarPayload;
}

const defaultPayload = {};

export function SubToolbar() {
  const [editor] = useLexicalComposerContext();

  const [type, setType] = useState<SubToolbarType>('nonActive');
  const [payload, setPayload] = useState<SubToolbarPayload>(defaultPayload);

  const unActive = useCallback(() => {
    setType('nonActive');
    setPayload(defaultPayload);
  }, []);

  // const EditorSubToolbar = useCallback(() => {
  //   switch (type) {
  //     case 'link':
  //       return <LinkSubToolbar url={payload.link!.url} node={payload.link!.node} />;
  //     case 'image':
  //       return <ImageSubToolbar node={payload.image!.node} />;
  //     case 'nonActive':
  //     default:
  //       return null;
  //   }
  // }, [type, payload]);
  const EditorSubToolbar = () => {
    switch (type) {
      case 'link':
        return <LinkSubToolbar url={payload.link!.url} node={payload.link!.node} />;
      case 'image':
        return <ImageSubToolbar node={payload.image!.node} />;
      case 'nonActive':
      default:
        return null;
    }
  };

  useEffect(() => {
    let cleanupSubToolbarCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupSubToolbarCommand = editor.registerCommand(
        SUB_TOOLBAR_COMMAND,
        ({ open, payload }) => {
          if (open) {
            if (payload?.link) {
              setType('link');
              setPayload({ link: { ...payload.link } });

              return false;
            }

            if (payload?.image) {
              setType('image');
              setPayload({ image: { ...payload.image } });

              return false;
            }
          }

          unActive();

          return false;
        },
        COMMAND_PRIORITY_EDITOR,
      );
    }

    return () => {
      if (cleanupSubToolbarCommand) {
        cleanupSubToolbarCommand();
      }
    };
  }, [editor, unActive]);

  return (
    <Toolbar className={`h-[30px] px-1 py-0.5 shadow-sm ${type === 'nonActive' ? 'opacity-0' : 'opacity-100'}`}>
      <EditorSubToolbar />
    </Toolbar>
  );
}

export const SUB_TOOLBAR_COMMAND = createCommand<SubToolbarCommandPayload>('subToolbarCommand');
