import React from 'react';

interface FormTitleProps {
  className?: string;
  title: string;
}

function FormTitle({ className, title }: FormTitleProps) {
  return (
    <h3 className={`mb-6 pt-[26px] text-lg ${className ?? ''}`}>
      <p dangerouslySetInnerHTML={{ __html: title.trim().replaceAll('\n', '<br />') }} />
    </h3>
  );
}

export default FormTitle;
