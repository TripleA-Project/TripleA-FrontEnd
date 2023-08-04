'use client';

import { createPortal } from 'react-dom';
import SetInterestModal from '.';

interface SetInterestsPortalProps {
  onClose?: () => void;
}

function SetInterestsPortal({ onClose }: SetInterestsPortalProps) {
  return createPortal(<SetInterestModal onClose={onClose} />, document.body);
}

export default SetInterestsPortal;
