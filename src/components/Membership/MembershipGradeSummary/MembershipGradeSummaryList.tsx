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
