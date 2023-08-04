import React, { ForwardedRef, forwardRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { MdCancel } from 'react-icons/md';

interface ResetValueInputProps extends React.HTMLProps<HTMLInputElement> {}

function ResetValueInput({ name, ...props }: ResetValueInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    watch,
    setValue,
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
      <MdCancel
        role="button"
        className="shrink-0 cursor-pointer text-[18px] text-[#E5E7EC]"
        onClick={() => {
          setValue(name!, '');
        }}
      />
    </div>
  );
}

export default forwardRef<HTMLInputElement, ResetValueInputProps>(ResetValueInput);
