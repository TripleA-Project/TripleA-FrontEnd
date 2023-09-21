'use effect';

import { cloneElement, useEffect, useRef } from 'react';

interface Props {
  children: React.ReactElement;
}

function PreventOutsideScroll({ children }: Props) {
  const childRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const scroller = getScroller();

    const onScroll = (event: any) => {
      const { currentTarget, deltaY } = event;
      const { scrollTop, scrollHeight } = currentTarget;
      if (
        (deltaY < 0 && scrollTop <= 0) ||
        (deltaY > 0 && scrollTop >= scrollHeight - parseInt(getComputedStyle(currentTarget).height))
      ) {
        event.preventDefault();
      }
    };

    scroller?.addEventListener('wheel', onScroll);

    return () => {
      scroller?.removeEventListener('wheel', onScroll);
    };
  }, []);

  const getScroller = () => {
    return childRef.current;
  };

  return cloneElement(children, {
    ref: childRef,
  });
}

export default PreventOutsideScroll;
