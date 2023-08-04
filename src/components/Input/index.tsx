'use client';

import { ForwardedRef, forwardRef } from 'react';

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

function Input({ className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <input ref={ref} className={`bg-transparent pl-4 focus:border-none focus:outline-none ${className}`} {...props} />
  );
}

export default forwardRef<HTMLInputElement, InputProps>(Input);
