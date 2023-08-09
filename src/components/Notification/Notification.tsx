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
        className={`${'fixed_inner fixed bottom-0 z-[12] box-border w-full !p-0'} ${'rounded-tl-2xl rounded-tr-2xl border-transparent drop-shadow-[0_-4px_4px_rgba(0,0,0,0.06)]'}`}
        style={{
          ...(bottom && { bottom }),
          ...(location.pathname === '/history' && dimHeight && { height: `calc(100% - 502px)` }),
          ...(location.pathname === '/history' && { display: 'flex', justifyContent: 'center', alignItems: 'center' }),
        }}
      >
        {children}
      </div>
    </>
  );
}

export default Notification;
