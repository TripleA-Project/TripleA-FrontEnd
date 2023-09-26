import React from 'react';
import FitPage from '@/components/Layout/FitPage';
import MuiSpinner from '@/components/UI/Spinner/MuiSpinner';

function PaymentLoading() {
  return (
    <FitPage>
      <div className="box-border flex h-full flex-col items-center justify-center gap-2 px-4">
        <p>결제 진행중입니다</p>
        <MuiSpinner />
      </div>
    </FitPage>
  );
}

export default PaymentLoading;
