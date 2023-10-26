'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { INSERT_IMAGE_COMMAND } from '../Lexical/Nodes/ImageNode';
import { toastNotify } from '@/util/toastNotify';

export type ImageToolbarNames = 'Image';

export function ImageToolbar() {
  const [editor] = useLexicalComposerContext();
  const [disabled, setDisabled] = useState(true);

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files?.length) {
      return;
    }

    const file = files[0];

    if (!file.type.includes('image')) {
      toastNotify('error', '이미지 파일만 업로드 가능합니다.');

      return;
    }

    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      const result = e.target?.result as string;

      const img = document.createElement('img');
      img.onload = (e) => {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
          src: result,
          alt: 'img',
          width: img.width,
          height: img.height,
        });
      };

      img.src = result;
    };

    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    setDisabled(Boolean(!editor?.getRootElement()));
  }, [editor]);

  return (
    <Toolbar.GroupWrapper>
      <input
        disabled={disabled}
        type="file"
        accept="image/*"
        id="image-upload"
        className="sr-only pointer-events-none"
        onChange={handleImageInputChange}
      />
      <label htmlFor="image-upload" className="cursor-pointer" title="이미지 파일 업로드">
        <Toolbar.Button active={false} icon={'Image'} className="pointer-events-none" />
      </label>
    </Toolbar.GroupWrapper>
  );
}
