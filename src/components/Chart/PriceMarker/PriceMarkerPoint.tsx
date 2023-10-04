import React from 'react';

interface PriceMarkerPointProps extends React.HTMLAttributes<HTMLOrSVGElement> {}

function PriceMarkerPoint({ ...props }: PriceMarkerPointProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 6 6" fill="none" {...props}>
      <circle opacity="0.7" cx="3" cy="3" r="3" fill="#E91B1B" />
    </svg>
  );
}

export default PriceMarkerPoint;
