'use client';

import React, { useState } from 'react';
import { ClickAwayListener, Tooltip } from '@mui/material';
import { BsQuestionCircle } from 'react-icons/bs';

interface RecommandSymbolListWrapperProps {
  children: React.ReactNode;
}

function RecommandSymbolListWrapper({ children }: RecommandSymbolListWrapperProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div>
      <h2 className="mb-6 flex items-center gap-1 text-sm font-bold">
        요즘 뜨는 종목
        <ClickAwayListener onClickAway={() => setTooltipOpen(false)}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={() => setTooltipOpen(false)}
              open={tooltipOpen}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <p>
                  유저들이 많이 선택한 종목을 제공합니다.
                  <br />
                  관련 데이터가 없을 경우
                  <br />
                  제공할 수 있는 종목이 없을 수 있습니다.
                </p>
              }
            >
              <button type="button" className="flex items-center" onClick={() => setTooltipOpen((prev) => !prev)}>
                <BsQuestionCircle />
              </button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      </h2>
      {children}
    </div>
  );
}

export default RecommandSymbolListWrapper;
