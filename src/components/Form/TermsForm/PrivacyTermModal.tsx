'use client';

import React from 'react';
import TermModal from './TermModal';
import PrivacyTermContent from '@/components/Mypage/AllTermsModal/PrivacyTermContent';

interface Props {
  onClose?: () => void;
}

function PrivacyTermModal({ onClose }: Props) {
  return (
    <TermModal title="개인정보 처리방침" onClose={onClose}>
      <PrivacyTermContent />
    </TermModal>
  );
}

export default PrivacyTermModal;
