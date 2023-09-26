import React from 'react';
import HighLightUnderLineText from '../UI/HighLightUnderLineText';

interface MembershipHighLightTextProps {
  content: string;
}

function MembershipHighLightText({ content }: MembershipHighLightTextProps) {
  return (
    <HighLightUnderLineText
      content={content}
      underlineColor="#FFC499"
      underlineHeight={7}
      classes={{ underline: 'bottom-0.5' }}
    />
  );
}

export default MembershipHighLightText;
