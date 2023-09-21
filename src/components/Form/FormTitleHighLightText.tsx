import React from 'react';
import HighLightUnderLineText from '../UI/HighLightUnderLineText';

interface FormHightLightTextProps {
  content: string;
}

function FormTitleHighLightText({ content }: FormHightLightTextProps) {
  return (
    <HighLightUnderLineText
      bold
      content={content}
      underlineColor="#FFB682"
      classes={{ text: 'text-xl', underline: 'bottom-0' }}
      underlineHeight={8}
    />
  );
}

export default FormTitleHighLightText;
