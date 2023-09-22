export class ImageHandler {
  // 공통
  static DefaultImagePath = '/LogoOrange.svg';

  static setErrorDefalt(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = ImageHandler.DefaultImagePath;
    e.currentTarget.srcset = '';
    e.currentTarget.sizes = '100vw';
  }

  static setErrorDefaultSrc(e: React.SyntheticEvent<HTMLImageElement, Event>, src: string) {
    e.currentTarget.src = src;
    e.currentTarget.srcset = '';
    e.currentTarget.sizes = '100vw';
  }

  static removeLoadingClassName(e: React.SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.closest('.skeleton_loading')?.classList.remove('skeleton_loading');
    e.currentTarget.classList.remove('opacity-0');
  }

  // 뉴스 thumbnail 이미지 핸들러
  static NewsThumbnail = {
    Load(e: React.SyntheticEvent<HTMLImageElement, Event>) {
      ImageHandler.removeLoadingClassName(e);
    },
    Error(e: React.SyntheticEvent<HTMLImageElement, Event>) {
      ImageHandler.setErrorDefalt(e);

      e.currentTarget.classList.add('scale-50');
      e.currentTarget.style.removeProperty('object-fit');
      e.currentTarget.classList.remove('rounded-[10px]', 'overflow-hidden');
    },
  };

  // 심볼 logo 이미지 핸들러
  static SymbolLogo = {
    Chip: {
      Load(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        ImageHandler.removeLoadingClassName(e);
      },
      Error(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        ImageHandler.setErrorDefalt(e);

        e.currentTarget.classList.add('scale-50');
        e.currentTarget.classList.remove('rounded-full', 'overflow-hidden');
      },
    },
    Card: {
      Load(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        ImageHandler.removeLoadingClassName(e);
      },
      Error(e: React.SyntheticEvent<HTMLImageElement, Event>) {
        ImageHandler.setErrorDefaultSrc(e, '/LogoGray.svg');

        e.currentTarget.classList.remove('rounded-full', 'overflow-hidden');
      },
    },
  };
}
