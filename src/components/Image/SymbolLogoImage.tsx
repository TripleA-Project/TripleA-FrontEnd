import Image from 'next/image';
import { ImageHandler } from './imageHandler';
import { CSSProperties } from 'react';

interface SymbolLogoImageProps {
  symbol: string;
  src?: string;
  style?: {
    wrapper?: CSSProperties;
  };
  fit?: CSSProperties['objectFit'];
  type?: 'Chip' | 'Card';
}

function SymbolLogoImage({ symbol, src, style, fit, type = 'Chip' }: SymbolLogoImageProps) {
  function getWrapperClassName(type: 'Chip' | 'Card') {
    switch (type) {
      case 'Chip':
        return `relative h-5 w-5 overflow-hidden rounded-full bg-white`;
      case 'Card':
        return `relative h-[42px] w-[42px] overflow-hidden rounded-full bg-[#E5E7EC]`;
    }
  }

  return (
    <div className="skeleton_loading">
      <div className={getWrapperClassName(type)} {...(style?.wrapper && { style: { ...style.wrapper } })}>
        <Image
          className={`w-full overflow-hidden rounded-full opacity-0`}
          style={{
            objectFit: fit ?? 'scale-down',
          }}
          onError={ImageHandler.SymbolLogo[type].Error}
          onLoad={ImageHandler.SymbolLogo[type].Load}
          src={src ?? ''}
          fill={true}
          alt={`${symbol} logo`}
        />
      </div>
    </div>
  );
}

export default SymbolLogoImage;
