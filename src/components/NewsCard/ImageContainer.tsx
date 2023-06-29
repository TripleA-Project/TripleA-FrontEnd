import React from 'react';
import Image from 'next/image';
import DefaultImg from '../../../public/Logo.svg';

interface ImageContainerProps {
  cardDirection?: 'column';
  width: number;
  height: number;
  thumbnail?: string;
}

export default function ImageContainer({ cardDirection, width, height, thumbnail }: ImageContainerProps) {
  console.log({ thumbnail });
  return (
    <>
      {cardDirection === 'column' ? (
        <div
          className="inline-flex rounded-[8px] object-cover"
          style={{ minWidth: `${width}px`, height: `${height}px`, border: '1px solid #000' }}
        >
          <Image src={thumbnail || DefaultImg} alt="thumbnail" className="w-full" width={width} height={height} />
        </div>
      ) : (
        <div
          className="flex h-full items-center rounded-[10px] object-cover"
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          <Image src={thumbnail || DefaultImg} alt="thumbnail" className="h-full" width={width} height={height} />
        </div>
      )}
    </>
  );
}
