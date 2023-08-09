'use client';

import { SentimentGrade } from '@/constants/sentimentGrade';
import { ClickAwayListener, Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';

function ColorGuide() {
  return (
    <div className="space-y-4 p-2 font-bold">
      <h4 className="text-center">감성지수</h4>
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: SentimentGrade['Excellent'].color,
          }}
        />
        {SentimentGrade['Excellent'].label}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: SentimentGrade['Positive'].color,
          }}
        />
        {SentimentGrade['Positive'].label}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: SentimentGrade['Neutral'].color,
          }}
        />
        {SentimentGrade['Neutral'].label}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: SentimentGrade['Negative'].color,
          }}
        />
        {SentimentGrade['Negative'].label}
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-4 w-4 rounded-full"
          style={{
            backgroundColor: SentimentGrade['ExtremeNegative'].color,
          }}
        />
        {SentimentGrade['ExtremeNegative'].label}
      </div>
    </div>
  );
}

const StyledColorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#575757cc',
  },
}));

function ColorTooltip() {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
      <div>
        <StyledColorTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setTooltipOpen(false)}
          open={tooltipOpen}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<ColorGuide />}
          className="!z-[4]"
          placement="bottom-end"
        >
          <button
            type="button"
            className="flex items-center justify-center"
            onClick={() => setTooltipOpen((prev) => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="9.5" fill="url(#paint0_linear_3820_35453)" stroke="#E5E7EC" />
              <defs>
                <linearGradient
                  id="paint0_linear_3820_35453"
                  x1="4.5"
                  y1="1.5"
                  x2="15.5"
                  y2="18.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FD954A" />
                  <stop offset="1" stopColor="#786BE4" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </StyledColorTooltip>
      </div>
    </ClickAwayListener>
  );
}

export default ColorTooltip;
