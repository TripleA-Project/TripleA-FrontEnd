'use client';

import React from 'react';
import { CircularProgress, CircularProgressProps, circularProgressClasses } from '@mui/material';

function MuiSpinner(props: CircularProgressProps) {
  return (
    <div className="relative inline-block">
      <CircularProgress
        variant="determinate"
        sx={{
          color: () => '#dcdcde',
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
