'use client';

import Image from 'next/image';
import { ImageHandler } from './imageHandler';
import { CSSProperties } from 'react';

interface NewsThumbnailProps {
  src?: string;
  className?: string;
  fit?: 'cover' | 'scale-down';
}

interface NewsThumbnailLoadingProps {
  className?: string;
}

export function NewsThumbnailLoading({ className }: NewsThumbnailLoadingProps) {
  return (
    <div className="skeleton_loading">
      <div className={`${className ?? ''} h-[72px] w-[66px] overflow-hidden rounded-[10px]`} />
    </div>
  );
}

function NewsThumbnail({ src, className, fit = 'cover' }: NewsThumbnailProps) {
  function getObjectFit(fitType: typeof fit): CSSProperties['objectFit'] {
    if (!src || src === 'null') return undefined;
    if (fitType === 'cover') return 'cover';
    if (fitType === 'scale-down') return 'scale-down';

    return 'cover';
  }

  const objectFitStyle = getObjectFit(fit);

  return (
    <div className="skeleton_loading">
      <div
        className={`${className ?? ''} relative h-[72px] w-[66px] shrink-0 overflow-hidden rounded-[10px] bg-white`}
        style={{
          ...(objectFitStyle && { objectFit: objectFitStyle }),
        }}
      >
        <Image
          src={src ? (src === 'null' ? '/LogoOrange.svg' : src) : '/LogoOrange.svg'}
          alt="news thumbnail"
          fill={true}
          style={{
            ...(objectFitStyle && { objectFit: 'inherit' }),
          }}
          className={`opcity-0 w-full shrink-0 overflow-hidden rounded-[inherit]`}
          onError={ImageHandler.NewsThumbnail.Error}
          onLoad={ImageHandler.NewsThumbnail.Load}
        />
      </div>
    </div>
  );
}

export default NewsThumbnail;
