'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { throttle } from 'lodash';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  children?: React.ReactNode;
  fixed?: boolean;
  scrollDownCallback?: (element: HTMLElement) => void;
  scrollUpCallback?: (element: HTMLElement) => void;
  className?: string;
  headerClassName?: string;
}

function Header({ fixed, scrollDownCallback, scrollUpCallback, className, headerClassName, children }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);

  const headerClassNames = twMerge([
    `fixed left-0 right-0 top-0 z-10 mx-auto w-full max-w-screen-pc bg-white mobile:min-w-[390px]`,
    headerClassName,
  ]);

  const classNames = twMerge([`box-border flex items-center justify-between px-4 py-3.5`, className]);

  useLayoutEffect(() => {
    let scroll = 0;

    function defaultHeaderScrollUp(element: HTMLElement) {
      element.style.visibility = 'visible';
    }

    function defaultHeaderScrollDown(element: HTMLElement) {
      element.style.visibility = 'hidden';
    }

    function handleHeaderScroll(e: Event) {
      if (!headerRef.current) return;

      const delta = window.scrollY - scroll;

      if (delta >= 0) {
        scrollDownCallback ? scrollDownCallback(headerRef.current) : defaultHeaderScrollDown(headerRef.current);
      }
      if (delta < 0) {
        scrollUpCallback ? scrollUpCallback(headerRef.current) : defaultHeaderScrollUp(headerRef.current);
      }

      scroll = window.scrollY;
    }

    const headerScrollEventHandler = throttle(handleHeaderScroll, 400);
    const headerScrollEventListenerOptions: AddEventListenerOptions = { passive: true };

    !fixed && window.addEventListener('scroll', headerScrollEventHandler, headerScrollEventListenerOptions);

    return () => {
      !fixed && window.removeEventListener('scroll', headerScrollEventHandler, headerScrollEventListenerOptions);
    };
  }, []); /* eslint-disable-line */

  return (
    <header ref={headerRef} className={headerClassNames}>
      <div className={classNames}>{children}</div>
    </header>
  );
}

export default Header;
