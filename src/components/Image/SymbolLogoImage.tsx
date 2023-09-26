import Image from 'next/image';
import { ImageHandler } from './imageHandler';
import { CSSProperties } from 'react';
import { twMerge } from 'tailwind-merge';

interface SymbolLogoImageProps {
  symbol: string;
  src?: string;
  style?: {
    wrapper?: CSSProperties;
  };
  fit?: CSSProperties['objectFit'];
  type?: 'Chip' | 'Card';
  bgColor?: string;
}

function SymbolLogoImage({ symbol, src, style, fit, type = 'Chip', bgColor }: SymbolLogoImageProps) {
  function getWrapperClassName(type: 'Chip' | 'Card') {
    const chipClassNames = twMerge([`relative h-5 w-5 overflow-hidden rounded-full bg-white`]);
    const cardClassNames = twMerge([`relative h-[42px] w-[42px] overflow-hidden rounded-full bg-[#E5E7EC]`]);

    switch (type) {
      case 'Chip':
        return chipClassNames;
      case 'Card':
        return cardClassNames;
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
          onLoadingComplete={(e) => {
            /*
              - 디폴트 이미지만 기본 배경
              - 정상 로고 이미지의 배경이 없는 경우
                커스텀 배경색상이 없다면
                흰색으로 적용(흰색이 아닐 경우 조화가 안될 수 있음)
            */
            if (
              e.currentSrc !== location.origin + '/LogoGray.svg' &&
              e.currentSrc !== location.origin + '/LogoOrange.svg'
            ) {
              e.style.backgroundColor = bgColor ?? '#fff';
            }
          }}
          src={src ?? ''}
          fill={true}
          alt={`${symbol} logo`}
        />
      </div>
    </div>
  );
}

export default SymbolLogoImage;
