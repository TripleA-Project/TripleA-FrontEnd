'use client';

import React, { ForwardedRef, RefObject, forwardRef, useEffect, useState } from 'react';
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import type { AllCategoriesControl } from '../SearchCategoryResult';

interface ExpandButtonProps {}

function ExpandButton(props: ExpandButtonProps, ref: ForwardedRef<AllCategoriesControl>) {
  const controlRef = ref as RefObject<AllCategoriesControl>;
  const [isRender, setIsRender] = useState(false);
  const [expand, setExpand] = useState(false);

  useEffect(() => {
    if (controlRef.current?.wrapperElement) {
      setIsRender(true);

      return;
    }

    setIsRender(false);
  }, [controlRef]);

  return isRender ? (
    <div className={`mt-2.5 flex w-full items-center justify-center`}>
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => {
          if (!controlRef.current?.isExpand) {
            controlRef.current?.expand();
            setExpand(true);

            return;
          }

          controlRef.current.shrink();
          setExpand(false);
        }}
      >
        <MdOutlineArrowBackIosNew
          className={`origin-center ${expand ? 'rotate-90' : '-rotate-90'} text-sm text-[#454C52]`}
        />
        <span className="text-xs text-[#454C52]">{expand ? '접기' : '더 보기'}</span>
      </button>
    </div>
  ) : null;
}

export default forwardRef(ExpandButton);
