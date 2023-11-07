'use client';

import { useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Toolbar from '../Lexical/Component/ToolbarUI/Toolbar';
import { INSERT_IMAGE_COMMAND, ImageNode } from '../Lexical/Nodes/ImageNode';
import { toastNotify } from '@/util/toastNotify';

export type ImageToolbarNames = 'Image';

export function ImageToolbar() {
  const [editor] = useLexicalComposerContext();
  const [disabled, setDisabled] = useState(true);

  const handleUpload = (e: React.MouseEvent) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const target = e.target as HTMLInputElement;

      const files = target.files;

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
          const maxWidth = ImageNode.MAX_WIDTH;

          const width = img.width > maxWidth ? maxWidth : img.width;
          const height = img.width > maxWidth ? Number((maxWidth * (img.height / img.width)).toFixed(0)) : img.height;

          editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
            src: result,
            alt: 'img',
            width,
            height,
          });
        };

        img.src = result;
      };

      fileReader.readAsDataURL(file);
    };

    fileInput.click();
  };

  useEffect(() => {
    setDisabled(Boolean(!editor?.getRootElement()));
  }, [editor]);

  return (
    <Toolbar.GroupWrapper>
      <Toolbar.Button
        disabled={disabled}
        active={false}
        icon={'Image'}
        title="이미지 파일 업로드"
        onClick={handleUpload}
      />
    </Toolbar.GroupWrapper>
  );
}
