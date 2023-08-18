'use client';

import { useRouter } from 'next/navigation';
import ServiceModal from '../Form/TermsForm/ServiceTermModal';
import { useState } from 'react';
import PrivacyTermModal from '../Form/TermsForm/PrivacyTermModal';

function TermsPage() {
  const { back } = useRouter();

  const [termTab, setTermTab] = useState<'serviceTerm' | 'privacyTerm'>('serviceTerm');

  const handleClose = () => back();

  return (
    <>
      <div className="fixed_inner fixed top-2 z-[12] !w-[75%] !p-0">
        <div className="flex -translate-x-8 gap-2 text-sm">
          <div
            className={`box-border w-20 cursor-pointer border-b font-bold transition-colors ${
              termTab === 'serviceTerm' ? 'border-b-orange-400 text-black' : 'text-gray-300'
            }`}
            onClick={() => setTermTab('serviceTerm')}
          >
            이용약관
          </div>
          <div
            className={`box-border flex-1 cursor-pointer border-b font-bold transition-colors ${
              termTab === 'privacyTerm' ? 'border-b-orange-400 text-black' : 'text-gray-300'
            }`}
            onClick={() => setTermTab('privacyTerm')}
          >
            개인정보 처리방침 동의
          </div>
        </div>
      </div>
      {termTab === 'serviceTerm' ? <ServiceModal onClose={handleClose} /> : <PrivacyTermModal onClose={handleClose} />}
    </>
  );
}

export default TermsPage;
