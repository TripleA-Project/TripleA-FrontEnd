import React from 'react';
import MembershipHighLightText from '../MembershipHighLightText';

interface MemebershipGradeSummaryTitleProps {
  title: string;
}

function MembershipGradeSummaryTitle({ title }: MemebershipGradeSummaryTitleProps) {
  return (
    <h3 className="relative mb-5 w-fit text-xl font-bold">
      <MembershipHighLightText content={title} />
    </h3>
  );
}

export default MembershipGradeSummaryTitle;
