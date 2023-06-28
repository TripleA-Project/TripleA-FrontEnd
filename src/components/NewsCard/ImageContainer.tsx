import React from 'react';
import Image from 'next/image';

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
        <div
          className=" inline-flex rounded-[8px]"
          style={{ minWidth: `${width}px`, height: `${height}px`, border: '1px solid #000' }}
        >
          <Image src='/#' alt='thumbnail' width={100} height={100}/>
        </div>
      ) : (
        <div className="rounded-[10px]" style={{ width: `${width}px`, height: `${height}px` }}>
          {' '}
        </div>
      )}
    </>
  );
}
