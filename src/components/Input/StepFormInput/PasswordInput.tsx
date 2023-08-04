import { ForwardedRef, forwardRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface PasswordInputProps extends React.HTMLProps<HTMLInputElement> {}

function PasswordInput({ name, ...props }: PasswordInputProps, ref: ForwardedRef<HTMLInputElement>) {
  const {
    watch,
    formState: { errors },
  } = useFormContext();

  const [passwordshown, setPasswordShown] = useState(false);

  return (
    <div
      className={`${
        errors[name!] ? 'border-error' : watch()[name!] ? 'border-black' : 'border-[#DBDEE1]'
      } relative flex h-[46px] w-full items-center rounded-lg border bg-white px-4 py-3 transition duration-300`}
    >
      <input
        type={passwordshown ? 'text' : 'password'}
        ref={ref}
        name={name}
        className="flex-1 border-none text-sm font-semibold text-black placeholder-[#DBDEE1] outline-none placeholder:font-normal"
        {...props}
      />
      {passwordshown ? (
        <BsFillEyeSlashFill
          role="button"
          className="shrink-0 cursor-pointer text-[18px] text-[#E5E7EC]"
          onClick={() => {
            setPasswordShown(false);
          }}
        />
      ) : (
        <BsFillEyeFill
          role="button"
          className="shrink-0 cursor-pointer text-[18px] text-[#E5E7EC]"
          onClick={() => {
            setPasswordShown(true);
          }}
        />
      )}
    </div>
  );
}

export default forwardRef<HTMLInputElement, PasswordInputProps>(PasswordInput);
