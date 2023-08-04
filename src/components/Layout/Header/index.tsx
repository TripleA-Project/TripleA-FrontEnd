'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { throttle } from 'lodash';

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

    !fixed && window.addEventListener('scroll', headerScrollEventHandler, { passive: true });

    return () => {
      !fixed && window.removeEventListener('scroll', headerScrollEventHandler);
    };
  }, []); /* eslint-disable-line */

  return createPortal(
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-10 mx-auto w-full max-w-screen-pc bg-white mobile:min-w-[390px] ${
        headerClassName ?? ''
      }`}
    >
      <div className={`${className ?? ''} box-border flex  items-center justify-between px-4 py-3.5`}>{children}</div>
    </header>,
    document.body,
  );
}

export default Header;
