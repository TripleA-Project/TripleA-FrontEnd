'use client';

import { createPortal } from 'react-dom';
import Notification from './Notification';

interface NotificationProps {
  active?: boolean;
  dimHeight?: number;
  bottom?: number;
  closeOnClick?: boolean;
  onClose?: (from: 'button' | 'dim') => void;
  children: React.ReactNode;
}

function NotificationPortal({ active, dimHeight, bottom, closeOnClick, onClose, children }: NotificationProps) {
  return active
    ? createPortal(
        <Notification dimHeight={dimHeight} bottom={bottom} closeOnClick={closeOnClick} onClose={onClose}>
          {children}
        </Notification>,
        document.body,
      )
    : null;
}

export default NotificationPortal;
