'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import Toolbar from './Toolbar';
import { LinkSubToolbar, type LinkSubToolbarPayload } from './SubToolbar/LinkSubToolbar';
import { ImageSubToolbar, type ImageSubToolbarPayload } from './SubToolbar/ImageSubToolbar';
import { OpenGraphLinkSubToolbar, type OpenGraphSubToolbarPayload } from './SubToolbar/OpenGraphLinkSubToolbar';
import type { CleanupCommand } from '../../LexicalEditor';

export type SubToolbarType = 'link' | 'image' | 'openGraphLink';

export interface SubToolbarPayload {
  link?: LinkSubToolbarPayload;
  image?: ImageSubToolbarPayload;
  openGraphLink?: OpenGraphSubToolbarPayload;
}

interface SubToolbarCommandPayload {
  open: boolean;
  payload: SubToolbarPayload & { type: SubToolbarType };
}

const defaultPayload = {};

export function SubToolbar() {
  const [editor] = useLexicalComposerContext();

  const [subToolbarOpen, setSubToobarOpen] = useState<Record<SubToolbarType, boolean>>({
    link: false,
    image: false,
    openGraphLink: false,
  });
  const [payload, setPayload] = useState<SubToolbarPayload>(defaultPayload);

  const shouldCloseSubToolbar = !subToolbarOpen.link && !subToolbarOpen.image && !subToolbarOpen.openGraphLink;

  const EditorSubToolbar = () => {
    if (shouldCloseSubToolbar) {
      return null;
    }

    if (subToolbarOpen.link) {
      return <LinkSubToolbar url={payload.link!.url} node={payload.link!.node} />;
    }

    if (subToolbarOpen.image) {
      return <ImageSubToolbar node={payload.image!.node} />;
    }

    if (subToolbarOpen.openGraphLink) {
      return <OpenGraphLinkSubToolbar node={payload.openGraphLink!.node} />;
    }

    return null;
  };

  useEffect(() => {
    let cleanupSubToolbarCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupSubToolbarCommand = editor.registerCommand(
        SUB_TOOLBAR_COMMAND,
        ({ open, payload }) => {
          setSubToobarOpen((prev) => ({
            ...prev,
            [payload.type]: open,
          }));

          setPayload((prev) => ({
            ...prev,
            ...(payload?.link && { link: { ...payload.link } }),
            ...(payload?.image && { image: { ...payload.image } }),
            ...(payload?.openGraphLink && { openGraphLink: { ...payload.openGraphLink } }),
          }));

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
  }, [editor]);

  useEffect(() => {
    if (shouldCloseSubToolbar) {
      setPayload({ ...defaultPayload });
    }
  }, [subToolbarOpen, shouldCloseSubToolbar]);

  return (
    <Toolbar
      className={`box-border h-[40px] px-1 py-0.5 shadow-sm ${shouldCloseSubToolbar ? 'opacity-0' : 'opacity-100'}`}
    >
      <EditorSubToolbar />
    </Toolbar>
  );
}

export const SUB_TOOLBAR_COMMAND = createCommand<SubToolbarCommandPayload>('subToolbarCommand');
