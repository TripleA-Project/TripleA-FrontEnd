import React from 'react';

interface MembershipGradeSummaryWrapperProps {
  children: React.ReactNode;
}

function MembershipGradeSummaryWrapper({ children }: MembershipGradeSummaryWrapperProps) {
  return <div className="box-border rounded-[10px] bg-white px-6 py-7">{children}</div>;
}

export default MembershipGradeSummaryWrapper;
