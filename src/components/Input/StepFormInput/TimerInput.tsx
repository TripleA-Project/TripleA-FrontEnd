import Timer from '@/components/Timer';
import React, { ForwardedRef, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface TimerInputProps extends React.HTMLProps<HTMLInputElement> {
  minute: number;
}

function TimerInput({ minute, name, ...props }: TimerInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div
      className={`${
        errors[name!] ? 'border-error' : watch()[name!] ? 'border-black' : 'border-[#DBDEE1]'
      } relative flex h-[46px] w-full items-center rounded-lg border bg-white px-4 py-3 transition duration-300`}
    >
      <input
        ref={ref}
        name={name}
        className="flex-1 border-none text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal"
        {...props}
      />
      <Timer minute={minute} className="shrink-0 text-sm text-[#454C52]" />
    </div>
  );
}

export default forwardRef<HTMLInputElement, TimerInputProps>(TimerInput);
