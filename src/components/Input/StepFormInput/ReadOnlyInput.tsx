'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface ReadOnlyInputProps {
  fieldName: string;
  className?: string;
  style?: React.CSSProperties;
}

function ReadOnlyInput({ fieldName, className, style }: ReadOnlyInputProps) {
  const { getValues } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    // 개발자도구로 readOnly 속성을 삭제해도 복구되도록 하기 위함
    if (!inputRef?.current) return;

    const config = { attributes: true };

    const callback: MutationCallback = (mutationList, observer) => {
      const attributeType = mutationList.find((mutation) => mutation.type === 'attributes');

      if (!attributeType || !inputRef?.current) return;

      if (inputRef.current.readOnly === false && attributeType.attributeName === 'readonly') {
        inputRef.current.readOnly = true;
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(inputRef.current, config);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <input
      ref={inputRef}
      className={`box-border w-full cursor-default items-center justify-center rounded-lg border border-[#DBDEE1] bg-white px-[18px] py-3 text-sm font-semibold text-[#DBDEE1] outline-none ${
        className ?? ''
      }`}
      readOnly
      defaultValue={getValues()[fieldName]}
      style={style}
    />
  );
}

export default ReadOnlyInput;
