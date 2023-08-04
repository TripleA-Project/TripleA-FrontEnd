import React from 'react';

interface FormTitleProps {
  className?: string;
  title: string;
}

function FormTitle({ className, title }: FormTitleProps) {
  const texts = title
    .trim()
    .split('\n')
    .map((text) => text.trim());

  return (
    <h3 className={`mb-6 pt-[26px] text-lg ${className ?? ''}`}>
      {texts.map((text, index) => {
        return (
          <p key={text}>
            {text}
            {index !== texts.length - 1 ? <br /> : null}
          </p>
        );
      })}
    </h3>
  );
}

export default FormTitle;
