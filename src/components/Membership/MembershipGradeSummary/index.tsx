import React from 'react';
import { GradeSummaryMembership, MembershipGradeSummaryTemplate } from '@/constants/membership';
import MembershipGradeSummaryContent from './MembershipGradeSummaryContent';

interface MemebershipGradeSummaryProps {
  membership: keyof typeof GradeSummaryMembership;
}

function MembershipGradeSummary({ membership }: MemebershipGradeSummaryProps) {
  return (
    <ul className="mb-2 flex flex-col gap-[10px]">
      {MembershipGradeSummaryTemplate[membership].map((content) => (
        <MembershipGradeSummaryContent key={`${membership}${content}`} content={content} />
      ))}
    </ul>
  );
}

export default MembershipGradeSummary;
