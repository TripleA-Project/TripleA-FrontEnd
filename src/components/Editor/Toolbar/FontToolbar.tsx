'use client';

import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_EDITOR, FORMAT_TEXT_COMMAND } from 'lexical';
import { TOGGLE_LINK_COMMAND } from '@lexical/link';
import { ToolbarIcons } from './ToolbarIcons';
import FontSizeDropDown from './Dropdown/FontSizeDropDown';
import FontColorDropDown from './Dropdown/FontColorDropDown';
import BackgroundColorDropDown from './Dropdown/BackgroundColorDropDown';
import { sanitizeUrl } from '../Lexical/util/url';
import { LINK_INITIAL_URL } from './Dialog/LinkDialog';
import { type CleanupCommand } from '../Lexical/LexicalEditor';
import { useEditorDialog } from '@/context/EditorDialogContext';
import { mergeRegister } from '@lexical/utils';
import {
  IS_BOLD_COMMAND,
  IS_ITALIC_COMMAND,
  IS_LINK_COMMAND,
  IsBoldCommandPayload,
  IsItalicCommandPayload,
  IsLinkCommandPayload,
} from '../Lexical/Command/toolbarCommands';

export type FontToolbarNames =
  | 'Bold'
  | 'Italic'
  | 'FontSize'
  | 'FontColor'
  | 'BackgroundColor'
  | 'Link'
  | 'OpenGraphLink';

function FontToolbar() {
  const [editor] = useLexicalComposerContext();

  const { open, close } = useEditorDialog();

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isLink, setIsLink] = useState(false);

  const [linkNodeKey, setLinkNodeKey] = useState('');

  const buttonWrapperClassNames = {
    base: 'shrink-0 p-1 hover:bg-gray-100',
    active: 'bg-blue-50',
    get Bold() {
      return twMerge([this.base, isBold && this.active]);
    },
    get Italic() {
      return twMerge([this.base, isItalic && this.active]);
    },
    get Link() {
      return twMerge([this.base, isLink && this.active]);
    },
    get OpenGraphLink() {
      return twMerge([this.base]);
    },
  };

  const bold = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
  };

  const italic = () => {
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
  };

  const link = () => {
    if (isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);

      return;
    }

    editor.dispatchCommand(TOGGLE_LINK_COMMAND, { url: sanitizeUrl(LINK_INITIAL_URL), target: '_blank' });
  };

  const openGraphLink = () => {
    open('openGraphLink', {});
  };

  useEffect(() => {
    let mergedFontTollbarCommand: CleanupCommand = null;

    if (editor.isEditable()) {
      mergedFontTollbarCommand = mergeRegister(
        editor.registerCommand<IsBoldCommandPayload>(
          IS_BOLD_COMMAND,
          (payload, editor) => {
            setIsBold(payload);

            return false;
          },
          COMMAND_PRIORITY_EDITOR,
        ),
        editor.registerCommand<IsItalicCommandPayload>(
          IS_ITALIC_COMMAND,
          (payload, editor) => {
            setIsItalic(payload);

            return false;
          },
          COMMAND_PRIORITY_EDITOR,
        ),
        editor.registerCommand<IsLinkCommandPayload>(
          IS_LINK_COMMAND,
          ({ active, nodeKey }, editor) => {
            setIsLink(active);
            if (active && nodeKey) {
              setLinkNodeKey(nodeKey);
            }

            return false;
          },
          COMMAND_PRIORITY_CRITICAL,
        ),
      );
    }

    return () => {
      if (mergedFontTollbarCommand) {
        mergedFontTollbarCommand();
      }
    };
  }, [editor]); /* eslint-disable-line */

  useEffect(() => {
    if (isLink) {
      open('link', { linkNodeKey });
    }
    if (!isLink) {
      close('link');
    }
  }, [isLink, linkNodeKey]); /* eslint-disable-line */

  return editor.isEditable() ? (
    <>
      {/* 글씨크기 */}
      <div className="inline-flex items-center gap-1">
        <button title="글씨 크기" className="group flex shrink-0 items-center gap-1 hover:bg-gray-100">
          <ToolbarIcons.FontSize className="text-base" />
          <FontSizeDropDown className="group-hover:cursor-pointer group-hover:bg-transparent" />
        </button>
      </div>
      {/* 볼드, 이텔릭체, 링크, openGraph링크 */}
      <div className="inline-flex items-center gap-1">
        <button className={buttonWrapperClassNames.Bold} title="볼드체(ctrl + b)" onClick={bold}>
          <ToolbarIcons.Bold active={isBold} className="text-base" />
        </button>
        <button className={buttonWrapperClassNames.Italic} title="이텔릭체(ctrl + i)" onClick={italic}>
          <ToolbarIcons.Italic active={isItalic} className="text-base" />
        </button>
        <button className={buttonWrapperClassNames.Link} title="링크" onClick={link}>
          <ToolbarIcons.Link active={isLink} className="text-base" />
        </button>
        <button className={buttonWrapperClassNames.OpenGraphLink} title="openGraph 링크" onClick={openGraphLink}>
          <ToolbarIcons.OpenGraphLink className="text-base" />
        </button>
      </div>
      {/* 글씨 색, 배경색 */}
      <div className="inline-flex items-center gap-1">
        <FontColorDropDown />
        <BackgroundColorDropDown />
      </div>
    </>
  ) : null;
}

export default FontToolbar;
