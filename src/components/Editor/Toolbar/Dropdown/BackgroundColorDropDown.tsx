'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/lexicalComposerContext';
import { $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import { FiChevronDown } from 'react-icons/fi';
import { HexColorPicker } from 'react-colorful';
import { ToolbarIcons } from '../ToolbarIcons';
import { TOOLBAR_DEFAULT_BACKGROUND_COLOR } from '../../Lexical/Plugin/ToolbarPlugin';
import { FONT_BACKGROUND_COLOR_COMMAND } from '../../Lexical/Command/toolbarCommands';
import { type CleanupCommand } from '../../Lexical/LexicalEditor';

interface BackgroundColorDropDownProps {
  onSelect?: (newColor: string) => void;
}

function BackgroundColorDropDown({ onSelect }: BackgroundColorDropDownProps) {
  const [editor] = useLexicalComposerContext();

  const dropDownRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const [hexColor, setHexColor] = useState(TOOLBAR_DEFAULT_BACKGROUND_COLOR);
  const [colorPickerOpen, setColorPickerOpen] = useState(false);

  const labelButtonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerOpen((prev) => !prev);
  };

  const backgroundColorChangeHandler = (newColor: string) => {
    editor.update(() => {
      const selection = $getSelection();

      if ($isRangeSelection(selection)) {
        $patchStyleText(selection, {
          'background-color': newColor,
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

    pickerElement.style.left = `${dropDownRect.left}px`;
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
    let cleanupFontBackgroundColorCommand: CleanupCommand = null;

    if (!editor.isEditable()) return;

    cleanupFontBackgroundColorCommand = editor.registerCommand(
      FONT_BACKGROUND_COLOR_COMMAND,
      ({ color }, editor) => {
        setHexColor(color);

        return false;
      },
      COMMAND_PRIORITY_EDITOR,
    );

    return () => {
      if (cleanupFontBackgroundColorCommand) {
        cleanupFontBackgroundColorCommand();
      }
    };
  }, [editor]);

  return (
    <div ref={dropDownRef} className="relative">
      <button
        className="flex w-12 items-center justify-between p-1 hover:bg-gray-100"
        title="배경색"
        onClick={labelButtonClickHandler}
      >
        <ToolbarIcons.BackgroundColor
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
        <div
          ref={pickerRef}
          className="fixed box-border inline-block border border-gray-100 bg-white p-[24px_16Px_16px_24px]"
        >
          <HexColorPicker color={hexColor} onChange={onSelect || backgroundColorChangeHandler} />
        </div>
      ) : null}
    </div>
  );
}

export default BackgroundColorDropDown;
