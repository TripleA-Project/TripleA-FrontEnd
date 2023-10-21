'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/lexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { HexColorPicker } from 'react-colorful';
import { FiChevronDown } from 'react-icons/fi';
import { ToolbarIcons } from '../ToolbarIcons';
import { TOOLBAR_DEFAULT_FONT_COLOR } from '../../Lexical/Plugin/ToolbarPlugin';
import { CleanupCommand } from '../../Lexical/LexicalEditor';
import { FONT_COLOR_COMMAND } from '../../Lexical/Command/toolbarCommands';

interface FontColorDropDownProps {
  onSelect?: (newColor: string) => void;
}

function FontColorDropDown({ onSelect }: FontColorDropDownProps) {
  const [editor] = useLexicalComposerContext();

  const dropDownRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [hexColor, setHexColor] = useState(TOOLBAR_DEFAULT_FONT_COLOR);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const labelButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerOpen((prev) => !prev);
  };

  const fontColorChangeHandler = (newColor: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          color: newColor,
        });
      }
    });
  };

  function setPickerPosition() {
    if (!pickerRef.current || !dropDownRef.current) return;

    const pickerElement = pickerRef.current;
    const dropDownRect = dropDownRef.current.getBoundingClientRect();

    pickerElement.style.top = `${dropDownRect.bottom + 16}px`;

    if (dropDownRect.left + pickerElement.clientWidth >= document.body.clientWidth) {
      pickerElement.style.removeProperty('left');
      pickerElement.style.right = '16px';
      return;
    }

    pickerElement.style.left = `${dropDownRect}px`;
  }

  useLayoutEffect(() => {
    if (!colorPickerOpen) return;

    setPickerPosition();
  }, [colorPickerOpen]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!dropDownRef.current?.contains(target)) {
        setColorPickerOpen(false);
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    let cleanupFontColorCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupFontColorCommand = editor.registerCommand(
      FONT_COLOR_COMMAND,
      ({ color }, editor) => {
        setHexColor(color);

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupFontColorCommand) {
        cleanupFontColorCommand();
      }
    };
  }, [editor]);

  return (
    <div ref={dropDownRef} className="font-color-dropdown relative">
      <button
        className="flex w-12 items-center justify-between p-1 hover:bg-gray-100"
        title="글씨 색"
        onClick={labelButtonClickHandler}
      >
        <ToolbarIcons.FontColor
          className="stroke-black stroke-[0.5px]"
          style={{
            color: hexColor,
          }}
        />
        <FiChevronDown
          className={`transition-transform`}
          style={{
            transform: `${colorPickerOpen ? `rotateX(180deg)` : `rotateX(0deg)`}`,
          }}
        />
      </button>
      {colorPickerOpen ? (
        <div ref={pickerRef} className="fixed box-border w-max border border-gray-100 bg-white p-[24px_16px_16px_24px]">
          <HexColorPicker color={hexColor} onChange={onSelect || fontColorChangeHandler} />
        </div>
      ) : null}
    </div>
  );
}

export default FontColorDropDown;
