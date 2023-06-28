import React from 'react';

interface ImageContainerProps {
  cardDirection?: 'column';
  width: number;
  height: number;
  thumbnail?: string;
}

export default function ImageContainer({ cardDirection, width, height, thumbnail }: ImageContainerProps) {
  return (
    <>
      {cardDirection === 'column' ? (
        <div className="bg-red rounded-[8px]" style={{ width: `${width}px`, height: `${height}px` }}>
          {thumbnail}
        </div>
      ) : (
        <div className="bg-red rounded-[10px]" style={{ width: `${width}px`, height: `${height}px` }}>
          {thumbnail}
        </div>
      )}
    </>
  );
}
