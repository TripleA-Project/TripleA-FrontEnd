'use client';

import { useLayoutEffect } from 'react';
import NotificationDim from './NotifiactionDim';

export interface NotificationProps {
  active?: boolean;
  dimHeight?: number;
  bottom?: number;
  closeOnClick?: boolean;
  onClose?: (from: 'button' | 'dim') => void;
  children: React.ReactNode;
}

function Notification({ dimHeight, bottom, closeOnClick, onClose, children }: NotificationProps) {
  useLayoutEffect(() => {
    document.body.classList.add('!overflow-hidden');

    return () => {
      document.body.classList.remove('!overflow-hidden');
      // onClose && onClose();
    };
  }, []); /* eslint-disable-line */

  return (
    <>
      <NotificationDim
        dimHeight={dimHeight}
        bottom={bottom}
        onClick={() => closeOnClick && onClose && onClose('dim')}
      />
      <div
        id="notification"
        className={`${'fixed bottom-0 left-0 right-0 z-[12] mx-auto box-border w-full max-w-screen-pc overflow-hidden mobile:min-w-[390px]'} ${'rounded-tl-2xl rounded-tr-2xl border-transparent drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]'}`}
        style={{
          ...(bottom && { bottom }),
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Notification;
