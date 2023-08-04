'use client';

import React, { useLayoutEffect, useRef } from 'react';

interface InfiniteTriggerProps {
  onTrigger: (...args: any[]) => Promise<any>;
  isFetching: boolean;
  hasNextPage?: boolean;
}

function InfiniteTrigger({ onTrigger, isFetching, hasNextPage }: InfiniteTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries
        .filter((element) => element.isIntersecting)
        ?.forEach(() => {
          if (!isFetching && hasNextPage) {
            onTrigger();
          }
        });
    });

    observer.observe(triggerRef.current);

    return () => {
      const ref = triggerRef;

      if (ref.current) {
        observer.unobserve(ref.current);
      }

      observer.disconnect();
    };
  }, []); /* eslint-disable-line */

  return <div ref={triggerRef} className="h-5 bg-black text-white [visibility:hidden]" />;
}

export default InfiniteTrigger;
