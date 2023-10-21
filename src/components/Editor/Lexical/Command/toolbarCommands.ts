import { createCommand } from 'lexical';
import { TOOLBAR_FONT_SIZE } from '../Plugin/ToolbarPlugin';

export type IsBoldCommandPayload = boolean;
export type IsItalicCommandPayload = boolean;
export type IsLinkCommandPayload = {
  active: boolean;
  nodeKey?: string;
};
export type FontColorCommandPayload = {
  color: string;
};
export type FontBackgroundColorCommandPayload = {
  color: string;
};
export type FontSizeCommandPayload = {
  fontSize: TOOLBAR_FONT_SIZE;
};

export const IS_BOLD_COMMAND = createCommand<IsBoldCommandPayload>('isActiveBold');
export const IS_ITALIC_COMMAND = createCommand<IsItalicCommandPayload>('isItalic');
export const IS_LINK_COMMAND = createCommand<IsLinkCommandPayload>('isLink');
export const FONT_COLOR_COMMAND = createCommand<FontColorCommandPayload>('selectionFontColor');
export const FONT_BACKGROUND_COLOR_COMMAND =
  createCommand<FontBackgroundColorCommandPayload>('selectionFontBackground');
export const FONT_SIZE_COMMAND = createCommand<FontSizeCommandPayload>('selectionFontSize');
