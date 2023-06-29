import React from 'react';

interface WrapperProps {
  blur?: boolean;
  children: React.ReactNode;
}

function ChartWrapper({ blur, children }: WrapperProps) {
  function getClassName() {
    return blur ? 'relative blur-sm pointer-events-none overflow-hidden' : 'relative';
  }

  return <div className={getClassName()}>{children}</div>;
}

export default ChartWrapper;
