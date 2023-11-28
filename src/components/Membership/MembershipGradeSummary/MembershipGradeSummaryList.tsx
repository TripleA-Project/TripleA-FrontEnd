import React from 'react';
import { GradeSummaryMembership, MembershipGradeSummaryOrders } from '@/constants/membership';
import MembershipGradeSummary from '.';
import MembershipGradeSummaryWrapper from './MembershipGradeSummaryWrapper';
import MembershipGradeSummaryTitle from './MembershipGradeSummaryTitle';
import SubscribeButton from '../SubscribeButton';
import { ToastContainer } from 'react-toastify';

function MembershipGradeSummaryList() {
  return (
    <>
      {MembershipGradeSummaryOrders.map((membership) => {
        return (
          <MembershipGradeSummaryWrapper key={membership}>
            <MembershipGradeSummaryTitle title={GradeSummaryMembership[membership]} />
            <MembershipGradeSummary membership={membership} />
            {membership === 'PREMIUM' ? (
              <>
                <p className="my-6 text-center text-lg font-bold">월 {Intl.NumberFormat('ko').format(10000)}원</p>
                <SubscribeButton />
                <div className="mx-auto mt-1 box-border flex items-center justify-center text-xs font-bold text-orange-500">
                  구독하기 결제시 1개월 이미 결제된 사용료는 환불(부분환불 포함)되지 않으며, 사용은 한달간 유지됩니다.
                </div>
              </>
            ) : null}
          </MembershipGradeSummaryWrapper>
        );
      })}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={true}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default MembershipGradeSummaryList;
