'use client';

import React from 'react';
import TermModal from './TermModal';
import ServiceTermContent from '@/components/Mypage/AllTermsModal/ServiceTermContent';

interface Props {
  onClose?: () => void;
}

function ServiceModal({ onClose }: Props) {
  return (
    <TermModal title="서비스 이용약관" onClose={onClose}>
      <ServiceTermContent />
    </TermModal>
  );
}

export default ServiceModal;
