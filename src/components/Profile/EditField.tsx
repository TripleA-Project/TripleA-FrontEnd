'use client';

import { ForwardedRef, forwardRef } from 'react';
import { AppIcons } from '../Icons';

interface EditFieldProps extends React.HTMLProps<HTMLInputElement> {
  isEditMode: boolean;
  error?: string;
  containerClassName?: string;
  onLabelClick?: () => void;
}

function EditField(
  { isEditMode, error, id, containerClassName, onLabelClick, ...props }: EditFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className={`relative flex items-center gap-2 ${containerClassName ?? ''}`}>
      <input
        ref={ref}
        id={id}
        spellCheck="false"
        autoComplete="off"
        className="flex-1 bg-transparent font-bold"
        {...props}
      />
      <label htmlFor={id}>
        <AppIcons.Edit
          onClick={() => onLabelClick && onLabelClick()}
          className={`${
            isEditMode ? 'invisible' : 'visible'
          } h-3.5 w-3.5 shrink-0 cursor-pointer [&>path]:fill-[#ADB0B3]`}
        />
      </label>
      {error && <span className="absolute top-full w-full text-sm text-red-600 pc:w-max">{error}</span>}
    </div>
  );
}

export default forwardRef<HTMLInputElement, EditFieldProps>(EditField);
