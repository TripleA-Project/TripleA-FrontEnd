'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { COMMAND_PRIORITY_CRITICAL, createCommand } from 'lexical';
import { useEditorDialog } from '@/context/EditorDialogContext';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { sanitizeUrl } from '../Lexical/util/url';
import type { CleanupCommand } from '../Lexical/LexicalEditor';

export type LinkToolbarNames = 'Link' | 'OpenGraphLink';

export type IsLinkCommandPayload = boolean;

export const LINK_INITIAL_URL = 'https://';
export const IS_LINK_COMMAND = createCommand<IsLinkCommandPayload>('isLink');

export function LinkToolbar() {
  const [editor] = useLexicalComposerContext();

  const { open } = useEditorDialog();

  const [isLink, setIsLink] = useState(false);

  const link = () => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: sanitizeUrl(LINK_INITIAL_URL), target: '_blank' });
    }
  };

  const openGraphLink = () => {
    open('openGraphLink', {});
  };

  useEffect(() => {
    let cleanupMergedLinkToolbarCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      cleanupMergedLinkToolbarCommand = mergeRegister(
        editor.registerCommand<IsLinkCommandPayload>(
          IS_LINK_COMMAND,
          (payload) => {
            setIsLink(payload);

            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
      );
    }

    return () => {
      if (cleanupMergedLinkToolbarCommand) {
        cleanupMergedLinkToolbarCommand();
      }
    };
  }, [editor]);

  return (
    <Toolbar.GroupWrapper>
      <Toolbar.Button active={isLink} icon={'Link'} title={'링크'} onClick={link} />
      <Toolbar.Button active={false} icon={'OpenGraphLink'} title={'openGraph 링크'} onClick={openGraphLink} />
    </Toolbar.GroupWrapper>
  );
}
