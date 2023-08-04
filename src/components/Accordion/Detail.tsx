'use client';

import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

interface DetailProps {
  open: boolean;
  children: React.ReactNode;
}

interface StyledDetailProps {
  height: number;
}

const StyledDetail = styled.div<StyledDetailProps>`
  height: ${({ height }) => `${height}px`};
`;

function Detail({ open, children }: DetailProps) {
  const detailRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(open ? detailRef.current?.scrollHeight ?? 0 : 0);

  useEffect(() => {
    if (!detailRef.current) return;

    const detailElementHeight = open ? detailRef.current.scrollHeight : 0;

    setHeight(detailElementHeight);
  }, [open, children]); /* eslint-disable-line */

  return (
    <StyledDetail className="overflow-hidden transition-[height]" ref={detailRef} height={height}>
      {children}
    </StyledDetail>
  );
}

export default Detail;
