'use client';

import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { AppIcons } from '../Icons';

interface EditFieldProps extends React.HTMLProps<HTMLInputElement> {
  isEditMode: boolean;
  error?: string;
  containerClassName?: string;
  onLabelClick?: () => void;
}

function EditField(
  { isEditMode, error, id, containerClassName, onLabelClick, onFocus, onBlur, ...props }: EditFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const navRef = useRef<HTMLElement | null>(null);
  const submitRef = useRef<HTMLDivElement | null>(null);

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onFocus && onFocus(e);

    if (!isMobile) return;

    if (!navRef.current) return;
    navRef.current.style.position = 'relative';

    if (!submitRef.current) return;
    submitRef.current.style.bottom = '40px';
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    onBlur && onBlur(e);

    if (!isMobile) return;

    setTimeout(() => {
      if (!navRef.current) return;
      navRef.current.style.removeProperty('position');
    }, 100);

    setTimeout(() => {
      if (!submitRef.current) return;
      submitRef.current.style.removeProperty('bottom');
    }, 100);
  };

  useEffect(() => {
    if (!navRef.current) {
      navRef.current = document.querySelector('nav');
    }

    if (!submitRef.current) {
      submitRef.current = document.getElementById('submit_wrapper') as HTMLDivElement | null;
    }

    return () => {
      navRef.current?.style.removeProperty('position');
      submitRef.current?.style.removeProperty('bottom');
    };
  }, []);

  return (
    <div className={`relative flex items-center gap-2 ${containerClassName ?? ''}`}>
      <input
        ref={ref}
        id={id}
        spellCheck="false"
        autoComplete="off"
        className="flex-1 bg-transparent font-bold"
        onFocus={handleFocus}
        onBlur={handleBlur}
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
