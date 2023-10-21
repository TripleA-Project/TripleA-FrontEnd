'use client';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import React, { useLayoutEffect, useState } from 'react';

interface PlaceHolderPosition {
  left: number;
  top: number;
}

function PlaceHolder() {
  const [editor] = useLexicalComposerContext();

  const [isRender, setIsRender] = useState(false);
  const [pos, setPos] = useState<PlaceHolderPosition>({
    left: 0,
    top: 0,
  });

  useLayoutEffect(() => {
    const editorRootElement = editor.getRootElement();

    if (editorRootElement) {
      const editorRootElementRect = editorRootElement.getBoundingClientRect();

      const rootPaddingLeft = Number(getComputedStyle(editorRootElement).paddingLeft.replace('px', ''));
      const rootPaddingTop = Number(getComputedStyle(editorRootElement).paddingTop.replace('px', ''));

      setPos({
        left: editorRootElementRect.left + rootPaddingLeft,
        top: editorRootElementRect.top + rootPaddingTop,
      });

      setIsRender(true);
    }

    return () => {
      setIsRender(false);
    };
  }, [editor]);

  return (
    <StyledPlaceHolder className="fixed font-bold text-[#c9c8c7]" left={pos.left} top={pos.top}>
      {isRender ? '글을 작성해주세요' : null}
    </StyledPlaceHolder>
  );
}

export default PlaceHolder;

const StyledPlaceHolder = styled.div<PlaceHolderPosition>`
  ${({ left, top }) => css`
    left: ${left}px;
    top: ${top}px;
  `}
`;
