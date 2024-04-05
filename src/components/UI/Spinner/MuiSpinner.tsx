'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { CircularProgress, CircularProgressProps, circularProgressClasses } from '@mui/material';

function MuiSpinner(props: CircularProgressProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const target = wrapperRef.current.children[0];

    if (target) {
      wrapperRef.current.style.width = `${target.clientWidth}px`;
      wrapperRef.current.style.height = `${target.clientHeight}px`;
    }
  }, []);

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <CircularProgress
        variant="determinate"
        sx={{
          color: () => '#dcdcde',
          position: 'absolute',
          left: 0,
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          color: () => '#FF9243',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </div>
  );
}

export default MuiSpinner;
