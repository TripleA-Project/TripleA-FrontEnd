'use client';

import { AppIcons } from '@/components/Icons';
import { useRef, useState } from 'react';
import ServiceTermContent from './ServiceTermContent';
import PrivacyTermContent from './PrivacyTermContent';

interface AllTermsModalProps {
  open: boolean;
  onClose: () => void;
}

function AllTermsModal({ open, onClose }: AllTermsModalProps) {
  const [terms, setTerms] = useState<'serviceTerm' | 'privacyTerm'>('serviceTerm');

  const termsRef = useRef<HTMLDivElement>(null);

  const handleDimClick = () => {
    onClose();
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCloseClick = () => {
    onClose();
  };

  return open ? (
    <div
      onClick={handleDimClick}
      className="fixed_inner fixed top-0 z-[12] flex h-full items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div onClick={handleContentClick} className="relative box-border w-full space-y-4 bg-white px-4 py-8">
        <div>
          <div className="flex w-full">
            <div
              className={`box-border flex-1 cursor-pointer border-b p-2 font-bold transition-colors ${
                terms === 'serviceTerm' ? 'border-b-orange-400 text-orange-400' : 'text-gray-300'
              }`}
              onClick={() => {
                termsRef.current?.scroll({ top: 0 });
                setTerms('serviceTerm');
              }}
            >
              서비스 이용약관
            </div>
            <div
              className={`box-border flex-1 cursor-pointer border-b p-2 font-bold transition-colors ${
                terms === 'privacyTerm' ? 'border-b-orange-400 text-orange-400' : 'text-gray-300'
              }`}
              onClick={() => {
                termsRef.current?.scroll({ top: 0 });
                setTerms('privacyTerm');
              }}
            >
              개인정보 처리방침
            </div>
          </div>
          <button className="absolute right-2 top-2" onClick={handleCloseClick}>
            <AppIcons.CloseFill.Orange />
          </button>
        </div>
        <div>
          <div className="h-80 overflow-hidden">
            <div ref={termsRef} className="h-full overflow-y-auto scrollbar-none">
              {terms === 'serviceTerm' ? <ServiceTermContent /> : <PrivacyTermContent />}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default AllTermsModal;
