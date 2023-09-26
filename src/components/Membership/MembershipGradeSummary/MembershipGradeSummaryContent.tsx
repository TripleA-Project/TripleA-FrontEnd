import React from 'react';
import { AppIcons } from '@/components/Icons';

interface MembershipGradeSummaryContentProps {
  content: string;
}

function MembershipGradeSummaryContent({ content }: MembershipGradeSummaryContentProps) {
  return (
    <li className="flex items-center gap-2">
      <AppIcons.Check className="shrink-0 text-2xl" />
      <span className="text-sm">{content}</span>
    </li>
  );
}

export default MembershipGradeSummaryContent;
